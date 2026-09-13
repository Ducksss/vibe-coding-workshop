# Vibe Coding Workshop — Brand guide

## Concept
Human curiosity. Machine possibility. A premium creative-studio identity for first-time AI builders, centred on an original knot sculpture translated into ASCII characters.

Tagline: **The future is yours to build.**

This independent workshop identity does not replace official organiser branding.

## Palette
| Token | Colour | Use |
| --- | --- | --- |
| Studio ink | #101110 | Main canvas |
| Warm ivory | #EEEEE7 | Primary text |
| Acid signal | #D9EF83 | Actions and emphasis |
| Muted sage | #A1A49A | Secondary text |
| Graphite line | #31342E | Dividers |

Use dark ink text on acid. Keep the accent scarce enough to mean something.

## Type
- Manrope 500: display headlines, 68–96 px; section titles 32–43 px.
- Manrope 400: body, 12–15 px, line height 1.65–1.9.
- Georgia italic: short editorial emphasis.
- DM Mono: supporting labels and coordinates. Never the sole source of essential information at tiny sizes.
- Fonts load from Google Fonts with local fallbacks; no font is required for functionality.

## Composition
1280 px maximum width. Spacious asymmetric hero. Hairline rules. Square controls. One dominant artwork. One ivory section interrupts the dark canvas. Mobile stacks content in reading order.

## Artwork and reproducibility
`assets/knot-source.svg` is an original procedural vector sculpture made for this page.
`assets/knot-ascii.png` is an actual ASCII Magic export, not an imitation of the tool.

Import the SVG at https://www.ascii-magic.com/app and use:
- Style: Characters
- Font size: 9 px
- Backdrop: Solid Black
- Coverage: 100%
- Density: 12%
- Standard character set; brightness 0; contrast 100
- Export PNG at 1× (1200 × 1200)

The landing page offers original/ASCII comparison, optional green phosphor tint, and reset. The tint is applied locally with CSS; it is not baked into the export. The six-second muted video loop autoplays unless reduced motion is requested. Play/pause is always available, and playback pauses when the tab is hidden. No tracking or rendering dependency is needed.

## Voice
Warm, direct, specific. “An idea. A prompt. Something real.” “Looks good? Check it works.” Use build, try, change, check. Avoid exclusivity, jargon, fake urgency, invented testimonials and promises of instant mastery.

## Accessibility
Visible keyboard focus, native FAQ disclosure controls, labelled artwork controls, meaningful alt text, reduced-motion support. Core page content and resource navigation work without JavaScript.

## Source policy
Event facts: https://luma.com/wevny7a8 (checked 13 September 2026).
Workshop resources: https://github.com/Ducksss/vibe-coding-workshop.
Luma's structured event data gives 13 September 2026, 09:00–16:00 Asia/Singapore. Registration was closed when checked; do not imply tickets are available. Eligibility follows the explicit 15–25 section, which is narrower than its general under-30 introduction. The learning path is workshop editorial content, not a published timed event schedule.


## Video-to-ASCII experiment
The exact requested tool, https://www.ascii-magic.com/tools/video-to-ascii, was used with `assets/knot-source.mp4`: 140 columns, Standard ramp, contrast 120, light-on-dark. Its exported frame is `assets/video-poster.png`.

That page exports still frames only. Following its documented workflow, the same clip was processed in the full ASCII Magic studio (Characters, 9 px, coverage 100%, density 12%, black backdrop) and exported as `assets/knot-ascii.mp4`: H.264, 720 × 720, 30 fps, six seconds, approximately 1.2 MB. Source and ASCII are both real moving clips. The still and video use different renderer settings, so their texture differs slightly.

Regenerate the original looping source with `python3 assets/make-knot.py` (Pillow and ffmpeg required only for asset regeneration). Then import that video in the linked tool and studio. Pause, original/ASCII comparison, tint and reset are native browser controls implemented in `studio.js`.

## Host portrait and credits
The host photo is Chai Pin Zheng's public GitHub avatar, saved locally as `assets/chai-pin-zheng.jpg` from https://avatars.githubusercontent.com/u/58126222?v=4 . Name and public bio are sourced from https://github.com/Ducksss. Keep the photo in its original colour and use a small circular crop in the hero and a square portrait in the host section.

Chai is credited as workshop host at his request. Reactor School is the Edu2030 event organiser, MAJU the weekend programme partner, and Ministry of Education the venue, based on the linked Luma listings. Do not imply venue sponsorship or invent job titles.
