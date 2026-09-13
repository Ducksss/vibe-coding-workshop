import { createServer } from 'node:http';
import { readFile, mkdir, appendFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
const root = dirname(fileURLToPath(import.meta.url));
export function validate(input) {
  if (!input || typeof input !== 'object' || input.consent !== true) return null;
  const record = {};
  for (const [key, max] of Object.entries({ name: 100, email: 254, company: 200, city: 100, topic: 1000 })) {
    const value = input[key] ?? '';
    if (typeof value !== 'string' || value.length > max || (key !== 'topic' && !value.trim())) return null;
    record[key] = value.trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email)) return null;
  return { ...record, consent: true };
}
export function makeServer(dataDir = join(root, 'data')) {
  return createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    const path = new URL(req.url, 'http://localhost').pathname;
    if (path === '/api/interest' && req.method === 'POST') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      if (req.headers.origin && req.headers.origin !== `http://${req.headers.host}` && req.headers.origin !== `https://${req.headers.host}`) { res.writeHead(403).end('{"error":"Origin rejected"}'); return; }
      if (!req.headers['content-type']?.startsWith('application/json')) { res.writeHead(415).end('{"error":"JSON required"}'); return; }
      try {
        let body = '';
        for await (const chunk of req) {
          body += chunk;
          if (Buffer.byteLength(body) > 8192) { res.writeHead(413).end('{"error":"Request too large"}'); return; }
        }
        let input;
        try { input = JSON.parse(body); } catch { res.writeHead(400).end('{"error":"Invalid JSON"}'); return; }
        const entry = validate(input);
        if (!entry) { res.writeHead(400).end('{"error":"Please check your details and consent"}'); return; }
        await mkdir(dataDir, { recursive: true, mode: 0o700 });
        await appendFile(join(dataDir, 'interest.jsonl'), JSON.stringify({ id: randomUUID(), createdAt: new Date().toISOString(), ...entry }) + '\n', { mode: 0o600 });
        res.writeHead(201).end('{"saved":true}');
      } catch { if (!res.headersSent) res.writeHead(500).end('{"error":"Unable to save interest"}'); }
      return;
    }
    const files = { '/': ['index.html', 'text/html'], '/style.css': ['style.css', 'text/css'], '/app.js': ['app.js', 'text/javascript'], '/scene.js': ['scene.js', 'text/javascript'], '/vendor/three.module.js': ['node_modules/three/build/three.module.js', 'text/javascript'], '/vendor/three.core.js': ['node_modules/three/build/three.core.js', 'text/javascript'] };
    if (!files[path] || !['GET', 'HEAD'].includes(req.method)) { res.writeHead(404).end('Not found'); return; }
    try {
      const [file, type] = files[path];
      const content = await readFile(join(root, file));
      res.writeHead(200, { 'Content-Type': `${type}; charset=utf-8` });
      res.end(req.method === 'HEAD' ? undefined : content);
    } catch { res.writeHead(500).end('Unable to load page'); }
  });
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.env.PORT || 5183);
  makeServer(process.env.DATA_DIR).listen(port, '127.0.0.1', () => console.log(`Founder’s Table: http://localhost:${port}`));
}
