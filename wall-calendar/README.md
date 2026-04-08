# 🗓️ Wall Calendar – Interactive React Component

A polished, interactive wall calendar component built with Next.js 14,
inspired by the physical wall calendar aesthetic.

## Features

- 📅 **Day Range Selector** — click start & end dates with visual highlighting
- 📝 **Notes Panel** — attach notes to selected ranges, persisted in localStorage
- 🖼️ **Hero Image** — month-themed imagery with diagonal clip design
- 🎨 **Theme Switch** — light/dark mode
- 🎉 **Holiday Markers** — Indian public holidays with tooltip labels
- 📱 **Fully Responsive** — stacked on mobile, side-by-side on desktop
- ✨ **Framer Motion** — smooth page-flip animation on month change

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- date-fns
- localStorage (no backend)

## Design Decisions

- Diagonal `clip-path` replicates the physical calendar's chevron aesthetic
- Range selection uses two-click model (click start → click end)
- Notes are scoped per month-key in localStorage for zero-backend persistence
- Holiday dots use a static record — trivially swappable with an API
