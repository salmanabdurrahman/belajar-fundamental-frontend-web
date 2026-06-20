# Notes App v2

Notes App submission built with Webpack, Fetch API, CSS Grid, and native Web Components.

## Live Demo

[https://belajar-fundamental-frontend-web.netlify.app](https://belajar-fundamental-frontend-web.netlify.app)

## Features

- Fetches active and archived notes from Dicoding Notes API.
- Adds, archives, restores, and deletes notes through REST endpoints.
- Loading indicator for API requests.
- Toast feedback for success and error states.
- AOS-powered scroll animation with reduced-motion support.
- CSS Grid notes layout.
- Web Components: `app-bar`, `note-form`, `note-list`, `note-item`, `empty-state`, `loading-indicator`, `toast-message`.
- Cursor-inspired warm cream design system.

## Run

```bash
pnpm install
pnpm run start-dev
```

## Build

```bash
pnpm run build
```

Build output is generated in `dist/`. Production CSS is extracted into `dist/assets/css/`.
