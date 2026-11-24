# Bluereel · Bonus Page (mobile prototype)

**Live:** https://mark-velmiskin.github.io/bluereel-bonus-page/ — open on a phone, or on desktop where it shows at iPhone size.

A working mobile prototype of a casino bonus page for a guest who has not signed up yet. Built from the Figma design (tokens, components and screens).

## What's inside

- **Hero** — total value of the welcome offer and the main sign-up button.
- **Welcome offer ladder** — a separate bonus for each of the first 4 deposits; the 1st is active, the rest are locked with a status line.
- **More bonuses** — Daily Bonus (7-day strip) and Lucky Wheel.
- **Terms & FAQ** — accordion with bonus rules in plain words.
- **Promo code** — bottom sheet with all states: empty, focused, typed, loading, error, success. Try `WELCOME50`.
- **Sticky header and sticky sign-up button** — the next step is always one tap away.

Design tokens from Figma live in `src/styles.css` as CSS variables (`--color-action-primary`, `--radius-lg`, …).

## Run locally

```bash
npm install
npm run dev
```

Open the local URL on your phone (same Wi-Fi, `npm run dev -- --host`) or in a desktop browser — on desktop the page is shown inside a phone frame.

## Deploy

```bash
npm run deploy
```

Builds with the `/bluereel-bonus-page/` base path and pushes `dist` to the `gh-pages` branch, which GitHub Pages serves.

## Notes

- Fonts: SF Pro Display (system font on Apple devices) and Aeonik Fono VF if installed locally; Space Grotesk is the web fallback for headings.
- Sign-up is out of scope: buttons show a toast instead.
- Images were generated with AI; layout and UI are hand-built.
