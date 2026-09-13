# Workshop guide

Facilitator notes and maintenance reference. Students can start with the [workshop README](README.md).

## Run the workshop

Suggested duration: **60 minutes**. Work individually or in pairs.

| Time | Activity | Result |
| --- | --- | --- |
| 0–5 min | Open both supplied meditation pages; predict which prompt produced each | Initial observations |
| 5–15 min | Create two fresh projects with the same model/settings; paste one prompt into each | Two independent first attempts |
| 15–30 min | Run both results and use the review checklist below | Evidence of what works and what is missing |
| 30–40 min | Choose one gap and write a focused follow-up prompt; rerun the relevant checks | One verified improvement |
| 40–50 min | Explore Founder’s Table: inspect the 3D menu, mobile layout, and form | Understand the difference between UI and stored data |
| 50–60 min | Share the original prompt, change, and verification evidence | A short explanation of what improved and why |

Keep the initial outputs before refining them, and record the model/settings and follow-up prompts. If time or installation is limited, use the supplied examples and spend the generation time on inspection instead.

Facilitator questions:

- Which decisions did your prompt specify, and which did the model invent?
- Which parts looked complete until you clicked them?
- What evidence would convince another person that the feature works?
- Which follow-up instruction removed the most ambiguity?

## How to interpret the comparison

“Bad” describes the prompt’s lack of detail, not the visual quality of the result. A vague prompt can still produce an attractive page. Missing requirements in that version are decisions left to the AI, not failures to follow the prompt.

Both meditation examples were generated in separate tasks using **GPT-5.6 Terra with high reasoning effort**. The vague version remains as generated. The specific version received a follow-up visual refinement at the instructor’s request, so the current pages are **not a controlled one-shot comparison**. The original specific version is preserved in commit `38d2bbc`.

Results vary between runs. Judge the output against the requirements you actually supplied. Marketing figures in the vague example are invented demo content, not verified claims. Neither example is a production meditation product.

## Review the results

Use this checklist on the specific-prompt result. Record pass/fail and a short observation; a screenshot alone cannot prove an interaction works.

| Check | How to verify |
| --- | --- |
| Audience | Confirm the copy addresses busy students taking short breaks. |
| Visual direction | Look for cream, sage-green accents, readable text, and generous spacing. |
| Entry points | Click each session button separately; both should open and start the exercise. |
| Pause and resume | Pause, wait a few seconds, and confirm the count stays fixed; resume and confirm it continues. |
| Reset | Reset mid-session; expect 60 seconds and a stopped timer. |
| Breathing cues | Watch a running session change from “Breathe in” to “Breathe out” after five seconds. |
| Completion | Let the full minute finish; confirm zero, a completion message, and no negative countdown. |
| Mobile | Check at 375px: text above the circle, readable controls, no horizontal overflow. |
| Keyboard | Reach and activate controls with Tab and Enter/Space; inspect focus when opening and closing the dialog. |
| Reduced motion | Enable reduced motion in your OS or browser developer tools and inspect animation behavior. |

The supplied good example’s automated test checks the breathing-phase helper. It does **not** establish full timer UI or accessibility correctness. The dialog does not currently trap focus or restore focus to its opener, and the countdown uses browser intervals, which can be delayed in background tabs. These are useful review findings, not production guarantees.

### Write a useful follow-up

Use an observed problem, an expected result, and a check:

```text
On the breathing dialog, Tab moves focus into the page behind it.
Keep keyboard focus inside the open dialog, support Escape to close it,
and return focus to the button that opened it. Preserve the timer behavior.
Verify the complete interaction using only the keyboard and rerun the
existing timer test and production build.
```

For a new idea, start with this reusable structure:

```text
Build [product] for [audience] so they can [primary outcome].
Use [stack and constraints].
Include [sections and content] with [visual direction].
When the user [action], the app should [observable result].
Handle [empty, loading, error, and completion states that apply].
Support [mobile layout, keyboard use, and reduced motion].
Do not add [out-of-scope features].
Provide setup instructions and verify [specific acceptance checks].
```

## Verification

Run these from the repository root after installing each example’s dependencies:

```sh
npm --prefix example-1-bad-prompt run build
npm --prefix example-2-good-prompt test
npm --prefix example-2-good-prompt run build
npm --prefix example-3-iterative-demo test
```

| Check | Coverage |
| --- | --- |
| Meditation production builds | Bundling and asset compilation; not browser behavior |
| Good example `npm test` | Five-second phase boundaries and completion at zero |
| Founder’s Table `npm test` | Real API validation, persistence, origin rejection, oversized requests, private-data route rejection, and local Three.js routes |
| Founder’s Table browser check | WebGL rendering, parallax, reduced motion, five viewport widths, sample labels, FAQ, invalid form submission, and input preservation after a request failure |

The API test uses a temporary directory and removes it afterward; it does not write to the classroom interest list. The browser check requires a running server and a browser; see [its commands](example-3-iterative-demo/README.md#verification-and-sample-content). The vague example has no automated test script. Use the manual checklist for browser behavior.

## Deployment

The meditation apps are separate Vercel projects. Their existing deployment workflow is manual: run `vercel deploy --prod` from the appropriate example folder with the correct Vercel project linked. A Git push alone does not publish an update in this workflow. Each app builds with `npm run build` and outputs static files to `dist/`; `npm run preview` serves that build locally for inspection.

Founder’s Table needs its Node.js API and persistent writable storage. Uploading only its HTML/CSS/JS will not save registrations. Its server binds to `127.0.0.1`; public hosting needs suitable reverse-proxy routing, HTTPS, and the operational preparation described in [the demo README](example-3-iterative-demo/README.md#interest-list).

## Troubleshooting

| Problem | What to do |
| --- | --- |
| npm cannot find `package.json` | Change into an example folder, or use the `npm --prefix` commands above. |
| Vite reports an unsupported Node version | Check `node --version`; use Node.js 22.12 or newer, then rerun `npm ci`. |
| A port is already in use | Stop the other server, or choose a different Vite `--port`. For Founder’s Table, run `PORT=5184 npm run dev`. Its supplied browser check expects port 5183. |
| Dependencies are missing | Run `npm ci` in that example folder. Each example installs separately. |
| The page looks different offline | Google Fonts may be unavailable; fallback fonts are expected. Install dependencies while online first. |
| Founder’s Table shows a flat menu | The CSS fallback is intentional when WebGL is unavailable. Check browser GPU support to inspect the 3D version. |
| The interest form cannot save | Use the Node server, inspect its terminal, and ensure its data directory is writable. A static preview cannot handle the API. |
| A session card only shows a message | This is the vague example’s placeholder behavior; use the specific example for the timer. |

## Contributing

Keep changes focused on the lesson they demonstrate. Include the prompt or reason for a change, update the relevant setup notes, run the applicable checks, and refresh screenshots when the documented appearance changes. Preserve the vague example’s teaching baseline unless the comparison itself is intentionally being revised. Never commit the local interest list or present sample figures as real results.

1. Fork the repository and create a branch for your change.
2. Make the change and run the relevant [verification checks](#verification).
3. Open a pull request describing the teaching purpose, changes, and validation.

For documentation changes, check links, anchors, and commands. For app changes, run the relevant tests and builds and inspect the affected browser behavior.

## License

No project license file is currently included in this repository.

## Contact

**Maintainer:** [Ducksss](https://github.com/Ducksss)

For workshop questions and feedback, use [project issues](https://github.com/Ducksss/vibe-coding-workshop/issues).

## Acknowledgments

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) by othneildrew — README structure.
- [GitHub Education](https://education.github.com/pack), [Lovable](https://lovable.dev/students), [Google Gemini](https://gemini.google/sg/students/?hl=en), [Figma](https://help.figma.com/hc/en-us/articles/360041061214-Figma-for-Education), and [Notion](https://www.notion.com/help/notion-for-education) — official student-offer information.
