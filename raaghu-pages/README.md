# raaghu-pages — Design System Demo App

This is a standalone React application used to manually test and demonstrate how the Raaghu Design System integrates into a real app. It is **not published as an npm package** and is not included in the library build.

## Purpose

| What it is | What it isn't |
|------------|---------------|
| A sandbox for testing component integrations | A production app |
| A place to verify raaghu-react-themes setup | Part of the published library |
| A reference for how to import and use the design system | A comprehensive component showcase (Storybook is for that) |

For component documentation and interaction demos, use the **Storybook** at the repo root (`npm run storybook`).

## Getting Started

### Prerequisites

Make sure you have installed dependencies from the repo root first:

```bash
# From repo root
npm install
```

### Run the Dev Server

```bash
cd raaghu-pages
npm run dev
```

Opens at `http://localhost:5173` by default.

### Build

```bash
npm run build
```

### Preview the Build

```bash
npm run preview
```

## Project Structure

```
raaghu-pages/
├── src/
│   ├── App.tsx          # Root app component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML shell
├── package.json         # App-specific dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite config
```

## Using Raaghu Components

To import and use design system components in this app:

```tsx
// Import components
import { RdsButton, RdsInput } from '../../index'; // root library export

// Import the theme provider
import { RaaghuThemeProvider } from '../../raaghu-react-themes/src/provider/RaaghuThemeProvider';

// Wrap your app in the provider
function App() {
  return (
    <RaaghuThemeProvider>
      <RdsButton label="Hello" colorVariant="primary" />
    </RaaghuThemeProvider>
  );
}
```

## Notes

- This app uses Vite directly, not the Storybook build pipeline
- It intentionally has minimal dependencies to stay close to a real client integration scenario
- Treat it as a "does it actually work outside Storybook?" check

## Related

- `README.md` (repo root) — full library overview and setup
- `docs/THEME_INTEGRATION_GUIDE.md` — how to integrate raaghu-react-themes
- `docs/ARCHITECTURE_OVERVIEW.md` — package structure explanation
