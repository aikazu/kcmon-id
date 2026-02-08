<div align="center">

# KCMON.ID

**Personal Landing Page**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

A premium, elegant landing page serving as a centralized hub for CV, project demos, and social links.

[Live Demo](https://kcmon.id) · [Documentation](./docs/)

</div>

---

## Features

- **Dark/Light Mode** — Toggle with localStorage persistence
- **Elegant Animations** — Staggered fade-ups, hover effects, mouse-following glow
- **Fully Configurable** — All content editable via single JSON file
- **SEO Optimized** — Complete meta tags for social sharing
- **Responsive** — Mobile-first design
- **Fast** — Static site, ~65KB gzipped

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Configuration

All content is managed in `src/data/data.json`:

```json
{
  "profile": {
    "name": "Your Name",
    "tagline": "Your tagline here",
    "location": "City, Country",
    "status": "Available for opportunities"
  },
  "sections": [
    {
      "title": "Section Title",
      "items": [
        {
          "tag": "CATEGORY",
          "label": "Link Label",
          "url": "https://example.com",
          "external": true
        }
      ]
    }
  ]
}
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |

## Project Structure

```
src/
├── data/
│   └── data.json      # ← Edit this file to update content
├── App.jsx            # Main component
├── index.css          # Styles & animations
└── main.jsx           # Entry point
```

## Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary: oklch(0.5054 0.1905 27.5181);  /* Wine red */
  --background: oklch(0.2161 0.0061 56.0434); /* Dark brown */
  /* ... */
}
```

### Fonts

Currently using:
- **Libre Baskerville** — Display/headings
- **Poppins** — Body text
- **IBM Plex Mono** — Monospace/tags

Change via the Google Fonts import in `src/index.css`.

## Deployment

Build outputs static files to `dist/`. Deploy anywhere:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

## Documentation

See [`docs/`](./docs/) for detailed specifications:

- [Blueprint](./docs/blueprint.md) — Project overview & features
- [Technical Spec](./docs/blueprint-tech.md) — Stack & architecture
- [UI/UX Spec](./docs/blueprint-ui.md) — Design system & components

## License

MIT © Iqbal Attila
