# Example 2 — Good prompt

A responsive React, Tailwind CSS, and Vite landing page for students taking a one-minute break. The two session buttons open and immediately start a 60-second breathing exercise. It has pause/resume, reset, five-second breathing cues, and a completion message. No backend, account, API key, or persistent data is required.

## Prompt

```text
Build a responsive landing page for “Still,” a meditation app for busy
students who want a short break between classes. Use React and Tailwind.

Make it feel calm and uncluttered: warm cream background, soft sage-green
accents, dark readable text, generous spacing, and gentle animations.

Include:
- A simple navigation bar with the app name and a “Try a session” button.
- A hero section with the headline “A calmer mind, one minute at a time,”
  a short supporting sentence, and a “Start a 1-minute break” button.
- An animated breathing circle beside the headline.
- Three benefits: refocus between classes, unwind after studying, and
  build a daily habit.
- A simple footer.

Make both buttons open a breathing exercise with a 60-second countdown,
alternating “Breathe in” and “Breathe out” every five seconds. Include
start, pause, and reset controls, plus a completion message.

On mobile, stack the text above the breathing circle. Support keyboard
navigation and reduced-motion preferences. No login, backend, or paid services.

Build the complete runnable page and include setup instructions. Verify
that the buttons work, the timer pauses and resets correctly, and the
mobile layout has no horizontal overflow.
```

## Run

Use Node.js 22.12 or newer. From the repository root:

```sh
cd example-2-good-prompt
npm ci
npm run dev -- --port 5182
```

Open the URL printed by Vite, normally http://localhost:5182. Stop with `Ctrl+C`.

## Check and build

```sh
npm test
npm run build
npm run preview
```

The build writes to `dist/`. Open the URL printed by the preview command to inspect it.

`npm test` uses Node’s built-in runner to check `getBreathPhase` at 60, 55, 50, and 0 seconds. It does not exercise the React dialog or the countdown’s elapsed time.

In a browser, check both entry buttons, pause/resume, reset to a stopped 60 seconds, cue changes, completion at zero, and closing the exercise. Test a 375px layout, keyboard controls, and reduced-motion settings. Closing pauses the session; reopening resumes the remaining count unless the previous session completed.

Known limitations: browser intervals may be delayed in background tabs. The dialog focuses its close button on opening and handles Escape from within it, but does not trap focus or restore focus to the opener. Do not treat the demo as a complete accessibility implementation.

## Find your way around

- `src/main.jsx`: page content, dialog, and countdown state.
- `src/styles.css`: responsive styling and animation.
- `src/timer.js`: breathing-phase calculation.
- `test/timer.test.mjs`: phase helper check.

The current appearance includes a follow-up visual refinement; the original generated version is in commit `38d2bbc`.

[Live demo](https://vibe-coding-workshop-good.vercel.app) · [Original prompt and workshop checklist](../README.md)
