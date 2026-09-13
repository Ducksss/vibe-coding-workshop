import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { makeServer } from './server.mjs';
test('interest is validated, durably recorded, and never publicly served', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'founder-dinner-'));
  const server = makeServer(dir);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const send = (data, headers = {}) => fetch(`${url}/api/interest`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });
  const valid = { name: ' Alex ', email: 'alex@example.com', company: 'New idea', city: 'Singapore', consent: true };
  try {
    assert.equal((await fetch(url)).status, 200);
    for (const path of ['/scene.js', '/vendor/three.module.js', '/vendor/three.core.js']) {
      const response = await fetch(url + path);
      assert.equal(response.status, 200);
      assert.match(response.headers.get('content-type'), /javascript/);
    }
    for (const patch of [{ email: 'bad' }, { consent: false }, { name: ' ' }, { company: 23 }, { city: 'x'.repeat(101) }]) assert.equal((await send({ ...valid, ...patch })).status, 400);
    assert.equal((await send(valid, { Origin: 'https://untrusted.example' })).status, 403);
    assert.equal((await send({ ...valid, topic: 'x'.repeat(9000) })).status, 413);
    assert.equal((await send(valid)).status, 201);
    const stored = (await readFile(join(dir, 'interest.jsonl'), 'utf8')).trim().split('\n').map(JSON.parse);
    assert.equal(stored.length, 1); assert.equal(stored[0].name, 'Alex'); assert.equal(stored[0].email, valid.email); assert.equal(stored[0].consent, true);
    assert.equal((await fetch(`${url}/data/interest.jsonl`)).status, 404);
  } finally { await new Promise(resolve => server.close(resolve)); await rm(dir, { recursive: true, force: true }); }
});
