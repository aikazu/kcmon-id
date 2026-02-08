# Technical Specification

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | React | 19.x |
| Build Tool | Vite | 7.x |
| Styling | Tailwind CSS | 4.x |
| Icons | Lucide React | 0.563.x |
| Language | JavaScript (ES Modules) | - |

## Project Structure

```
kcmon-id/
├── public/
│   └── favicon.svg          # Site favicon
├── src/
│   ├── data/
│   │   └── data.json         # All editable content
│   ├── App.jsx               # Main application component
│   ├── index.css             # Global styles + animations
│   └── main.jsx              # React entry point
├── index.html                # HTML template + SEO meta
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── postcss.config.js         # PostCSS + Tailwind
```

## Dependencies

### Production
- `react` - UI library
- `react-dom` - React DOM renderer
- `lucide-react` - Icon library

### Development
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `tailwindcss` - CSS framework
- `@tailwindcss/postcss` - Tailwind PostCSS plugin
- `postcss` - CSS processor
- `autoprefixer` - CSS vendor prefixes

## Configuration Files

### vite.config.js
- React plugin enabled
- Default Vite configuration

### postcss.config.js
- Tailwind CSS integration
- Autoprefixer for browser compatibility

### tailwind (via CSS)
- Using Tailwind v4 CSS-first configuration
- Custom CSS variables for theming

## Build Commands

```bash
npm run dev      # Start development server
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

## Environment

- Node.js 18+ recommended
- No environment variables required
- Static site (no backend needed)

## Deployment

Static files in `dist/` folder after build. Compatible with:
- Vercel
- Netlify  
- Cloudflare Pages
- GitHub Pages
- Any static hosting

## Performance

- Bundle size: ~200KB JS, ~20KB CSS (gzipped: ~65KB, ~5KB)
- No external API calls
- All assets self-contained
- CSS-only animations (GPU accelerated)
