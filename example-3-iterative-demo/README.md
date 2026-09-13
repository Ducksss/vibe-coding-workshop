# Example 3 — Iterative demo

A responsive founder dinner interest page with a real Three.js WebGL dinner menu, gentle animation, reduced-motion support, accessible form fields, and real server-side registration storage. Three.js is the only dependency. No build step.

## Run

Use Node.js 22.12 or newer for consistency with the other workshop examples.

```sh
cd example-3-iterative-demo
npm ci
npm run dev
```

Open http://localhost:5183. Stop with `Ctrl+C`. `npm start` runs the same server; there is no build or preview command. Run `npm test` for the API integration check, which creates and removes its own temporary data directory.

## Interest list

Successful submissions are appended to `data/interest.jsonl` on the server. This private directory is ignored by Git and is not served over HTTP. Set `DATA_DIR` to an absolute persistent directory to change storage, and `PORT` to change the port. The server binds to localhost.

There is no email delivery: the host must review the stored list and coordinate invitations. No seat is promised or payment collected. Remove a person's record from the JSONL file when they request deletion, and delete the list when coordination is finished. Before public launch, confirm the host/contact information, date, venue, and price in `index.html`; deploy the server behind HTTPS with persistent storage, backups, and request rate limits. A static-only host will not save registrations. No deployment has been made.

Fonts load from Google Fonts with local serif/sans-serif fallbacks. The Three.js scene uses layered menu geometry, an olive cover with a gold spine, a locally generated menu texture, and pointer-responsive motion with scroll parallax. Rendering is capped near 30 fps and 1.5× pixel density, pauses offscreen or in hidden tabs, and becomes static with reduced motion. A CSS fallback remains visible if WebGL cannot initialize or loses context. Three.js is served locally; no model or graphics CDN requests are needed.

## Improved prompt

Refine “The Founder’s Table” into a professional, welcoming founder dinner landing page. Keep the ivory-and-olive palette and editorial serif headlines. Replace the current Three.js place setting with a dimensional floating dinner menu: cream paper, an olive cover, gold details, and readable sample courses. Add subtle pointer movement and scroll parallax, while preserving reduced-motion support and pausing rendering offscreen. Increase body copy to 16–17px and make form fields easy to read on mobile.

Add three attendee testimonial cards and a track-record row for dinners held, founders hosted, and cities. Use verified quotes and totals when supplied; otherwise visibly mark every quote and total as sample content. Do not imply sample testimonials or counts are real. Clearly label menu dishes as provisional. Keep the existing interest form working, preserve its data and consent handling, and verify desktop/mobile layouts, rendering, parallax, reduced motion, and form submission. Make sensible design decisions without asking questions; keep the implementation small and fast.

## Verification and sample content

The menu dishes, three quotes, and 12 dinners / 180 founders / 4 cities are **illustrative sample content**, not verified event history. Replace them with confirmed information before publishing.

`npm test` exercises the real API and local Three.js routes. With the server running, use the Playwright CLI for the reusable browser check:

```sh
npx --package @playwright/cli playwright-cli -s=founder open http://localhost:5183
npx --package @playwright/cli playwright-cli -s=founder run-code --filename=browser-check.js
```

The browser check covers rendered WebGL, responsive fit, scroll parallax, reduced-motion behavior, sample labels, and form validation/error recovery without creating registrations.

## Design refinement

The ivory-and-olive palette now uses a consistent typography and spacing system, a sage arch behind the layered 3D menu, a gold-edged olive seal, matching testimonial cards, sticky navigation, and a single “Register interest” action. The RSVP panel and FAQ use clearer layouts with visible focus and form feedback. Sample quotes, totals, and menu details remain explicitly labeled. Browser checks cover 320, 375, 768, 1024, and 1440px layouts; the form continues to use the same private local storage.

## Preview

![Desktop preview](desktop.png)

[Mobile preview](mobile.png).

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `5183` | HTTP port; the server listens on `127.0.0.1` |
| `DATA_DIR` | `data/` beside `server.mjs` | Writable directory containing `interest.jsonl`; use an absolute path when overriding |

For example, from this demo folder on macOS/Linux:

```sh
PORT=5184 DATA_DIR="$PWD/data" npm start
```

Environment variables are read directly from the process; the server does not load a `.env` file. The supplied browser check uses port 5183, so use the default port for that check.

## Form API

`POST /api/interest` accepts `Content-Type: application/json` with these fields:

| Field | Requirement |
| --- | --- |
| `name` | Nonblank string, at most 100 characters |
| `email` | Nonblank string matching the server’s email format check, at most 254 characters |
| `company` | Nonblank string, at most 200 characters; the form labels it “What are you building?” |
| `city` | Nonblank string, at most 100 characters |
| `topic` | Optional string, at most 1,000 characters |
| `consent` | Boolean `true` |

String lengths are checked before trimming. Successful records include a generated `id` and ISO `createdAt` timestamp. Each accepted submission appends a new record; there is no deduplication or invitation workflow.

| Response | Meaning |
| --- | --- |
| `201` with `{"saved":true}` | Record appended successfully |
| `400` | Invalid JSON, invalid fields, or missing consent |
| `403` | Supplied Origin does not match the request host |
| `413` | Request body exceeds 8,192 bytes |
| `415` | Content type is not JSON |
| `500` | Server could not save the record |

The browser disables the submit button while saving, clears the form after success, and preserves entered details after a failure. Use fictional data for classroom submissions. Access the JSONL file locally to review records; the server has no list/export endpoint and does not serve the data directory.

## Source guide

- `index.html`: page copy, sample disclosures, form, and FAQ.
- `style.css`: layout, responsive styles, motion, and CSS menu fallback.
- `app.js`: form requests, reveal effects, scene loading, and parallax.
- `scene.js`: Three.js menu, pointer interaction, and rendering lifecycle.
- `server.mjs`: allowed static routes, API validation, and file storage.
- `test.mjs`: API integration check.
- `browser-check.js`: browser assertions; it simulates a failed form request without saving a registration.

The browser check requires WebGL to render successfully; a headless environment without GPU support may show the valid CSS fallback while failing that assertion. The fallback is not a substitute for verifying the 3D scene in a capable browser.

[Back to the workshop](../README.md)
