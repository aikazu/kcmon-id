<div align="center">

# 🌌 KCMON.ID

**Premium Personal Landing Page & Link Tree**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

A modern, elegant, and performance-optimized landing page designed to serve as a centralized hub for professional profiles, project portfolios, and social connections.

[Live Demo](https://kcmon.id) · [Report Bug](https://github.com/aikazu/kcmon-id/issues)

</div>

---

## ✨ Features

- **🌓 Dynamic Theming** — Seamless Light/Dark mode transition using OKLCH color space for superior perceptual uniformity.
- **🎨 Visual Sophistication** — Features a responsive grid background, dynamic accent glows, and scroll-triggered staggered animations.
- **⚙️ Purely Configurable** — 100% of the content is driven by a single `data.json` file. No hardcoding required.
- **📱 Responsive & Fluid** — Mobile-first design that looks stunning on every screen size.
- **🚀 Built for Speed** — Leverages Next.js 16 App Router and React 19 for industry-leading performance.
- **🔍 SEO Ready** — Pre-configured metadata for high visibility on search engines and social media.
- **🔒 Security Hardened** — Ships with 7 security headers including CSP, HSTS, and X-Frame-Options.

## 🛠️ Tech Stack

| Layer          | Technology                                            |
| :------------- | :---------------------------------------------------- |
| **Framework**  | [Next.js 16 (App Router)](https://nextjs.org/)        |
| **UI Library** | [React 19](https://react.dev/)                        |
| **Language**   | [TypeScript](https://www.typescriptlang.org/)         |
| **Styling**    | [Tailwind CSS 4](https://tailwindcss.com/)            |
| **Icons**      | [Lucide React](https://lucide.dev/)                   |
| **Analytics**  | [Vercel Analytics](https://vercel.com/docs/analytics) |

## 🚀 Getting Started

The project uses `bun` as the preferred package manager.

```bash
# Clone the repository
git clone https://github.com/aikazu/kcmon-id.git

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Type-check (uses tsc, not ESLint)
bun run lint
```

## 📂 Project Structure

```bash
src/
├── app/
│   ├── globals.css      # OKLCH theme variables, animations, component styles
│   ├── layout.tsx       # Root layout, fonts, metadata, analytics, theme script
│   ├── page.tsx         # "use client" landing page with theme & scroll observer
│   ├── error.tsx        # Error boundary (client component)
│   ├── loading.tsx      # Loading spinner (server component)
│   ├── not-found.tsx    # Custom 404 page
│   ├── robots.ts        # robots.txt generation
│   ├── sitemap.ts       # sitemap.xml generation
│   └── manifest.ts      # Web app manifest
├── components/          # UI components (PascalCase)
├── data/
│   └── data.json        # ← ALL CONTENT GOES HERE
└── types/               # TypeScript interfaces
```

## ⚙️ Configuration

Update your personal information in `src/data/data.json`:

```json
{
  "profile": {
    "name": "Iqbal Attila",
    "tagline": "Cybersecurity enthusiast with part-time full-stack development experience.",
    "location": "Jakarta, Indonesia",
    "status": "Available for opportunities"
  },
  "sections": [
    {
      "title": "Projects",
      "items": [
        {
          "tag": "DEMO",
          "label": "Project Name",
          "url": "https://project.com",
          "external": true,
          "techStack": ["nextjs", "vercel"]
        }
      ]
    }
  ]
}
```

## 🎨 Customization

### Colors (OKLCH)

Theme colors are managed using OKLCH variables in `src/app/globals.css`. This allows for precise control over luminance and chroma across themes.

```css
[data-theme="dark"] {
  --background: oklch(0.13 0.004 250);
  --foreground: oklch(0.93 0.005 250);
  --accent: oklch(0.72 0.17 45);
  --border: oklch(0.22 0.005 250);
  --muted-foreground: oklch(0.55 0.01 250);
}
```

### Typography

Fonts are loaded via `next/font/google` in `src/app/layout.tsx`:

- **Outfit**: Primary sans-serif for body and labels.
- **Instrument Serif**: Elegant italic serif for headings.
- **JetBrains Mono**: Technical font for tags and numbers.

## 🚢 Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Vercel will automatically detect Next.js and deploy.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ by [**Iqbal Attila**](https://github.com/aikazu)
