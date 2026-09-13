# Still — vague-prompt example

A React, Tailwind CSS, and Vite meditation landing page generated from an intentionally open-ended prompt:

```text
Build a landing page for a meditation app using React and Tailwind.
Make it look nice and modern. Add some animations.
```

## Run

Use Node.js 22.12 or newer. From the repository root:

```sh
cd examples/bad-prompt
npm ci
npm run dev -- --port 5181
```

Open the URL printed by Vite, normally http://localhost:5181. Stop with `Ctrl+C`.

```sh
npm run build
npm run preview
```

The build writes to `dist/`; preview serves that build locally. There is no automated test script.

## What actually works

Navigation links scroll to page sections. The primary buttons scroll to the sessions and show feedback; session-card buttons display a placeholder message. The mobile menu expands and collapses. There is no audio playback, breathing timer, account system, or backend. The “700k+” figure is invented demo copy.

Google Fonts require a network connection; fallback fonts are available. Inspect `src/main.jsx` for content and interactions, and `src/style.css` for styling.

## Find your way around

- `index.html`: browser entry point; loads the React page.
- `src/main.jsx`: page content, navigation, mobile menu, and placeholder actions.
- `src/style.css`: styling and animation.
- `package.json`: dependencies and available commands.
- `vite.config.js`: development and build configuration.

Keep this example as the comparison baseline. Try your first edits in the [specific-prompt example](../good-prompt/README.md).

## Check it

Build the app, then check navigation, both primary buttons, all three session messages, and the mobile menu in a browser. At 375px, check readable content and horizontal overflow. Treat unspecified functionality as a discussion point about the prompt, not as a failure to satisfy it.

[Live demo](https://vibe-coding-workshop-bad.vercel.app) · [Workshop prompts and comparison](../../README.md)
