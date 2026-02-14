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
- **🎨 Visual Sophistication** — Features a responsive grid background, dynamic accent glows, and staggered fade-up animations.
- **⚙️ Purely Configurable** — 100% of the content is driven by a single `data.json` file. No hardcoding required.
- **📱 Responsive & Fluid** — Mobile-first design that looks stunning on every screen size.
- **🚀 Built for Speed** — Leverages Next.js 16 App Router and React 19 for industry-leading performance.
- **🔍 SEO Ready** — Pre-configured metadata for high visibility on search engines and social media.

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Analytics** | [Vercel Speed Insights](https://vercel.com/docs/speed-insights) |

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
```

## 📂 Project Structure

```bash
src/
├── app/
│   ├── globals.css      # Tailwind 4 imports & OKLCH variables
│   ├── layout.tsx       # Root layout, Fonts & Metadata
│   └── page.tsx         # Main interactive landing page
├── components/          # Atomic UI components
├── data/
│   └── data.json        # ← YOUR CONTENT GOES HERE
├── types/               # TypeScript definitions
└── utils/               # Helper functions
```

## ⚙️ Configuration

Update your personal information in `src/data/data.json`:

```json
{
  "profile": {
    "name": "Iqbal Attila",
    "tagline": "Cybersecurity enthusiast & Full-stack developer.",
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
:root {
  --primary: oklch(0.72 0.17 45); /* Base accent */
  --background: oklch(0.13 0.004 250);
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
