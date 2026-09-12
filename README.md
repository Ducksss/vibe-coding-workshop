# Vibe Coding Workshop

Compare two prompts for the same meditation landing page and see how clear requirements change an AI-generated result.

## Try it in class

1. Start two fresh projects in your coding tool using the same model.
2. Run the vague prompt in one and the specific prompt in the other.
3. Run both apps and compare their appearance, interactions, and mobile layouts.
4. Discuss which decisions you specified and which the AI made for you.

Results vary between runs. A vague prompt can still produce an attractive page; the specific prompt makes the intended behavior easier to verify.

## Bad prompt — vague

```text
Build a landing page for a meditation app using React and Tailwind.
Make it look nice and modern. Add some animations.
```

## Good prompt — specific and testable

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

## Review the results

| Check | What to look for |
| --- | --- |
| Purpose | Is the app clearly aimed at busy students? |
| Visual direction | Does the page follow the requested colors and layout? |
| Interaction | Do both session buttons open the exercise? |
| Timer | Does it start at 60 seconds, pause, reset, and finish correctly? |
| Breathing cues | Do the cues alternate every five seconds while running? |
| Mobile | Does the layout stack without horizontal overflow? |
| Accessibility | Can you use the controls by keyboard and reduce animation? |

Use these checks to assess whether the specific prompt was followed. Missing
features in the vague version illustrate unspecified requirements, rather
than failures to follow that prompt.

**Teaching point:** A good prompt defines what success looks like. A vague
prompt leaves those decisions to the AI.
