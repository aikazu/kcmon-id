# KCMON.ID - Project Blueprint

## Overview

Personal landing page untuk **Iqbal Attila** di domain `kcmon.id`. Berfungsi sebagai hub terpusat untuk CV, project demos, dan social media links.

## Purpose

- **Target User**: Recruiters, potential clients, professional connections
- **Core Function**: Quick access point ke semua professional presence online
- **Design Goal**: Premium, memorable, professional impression

## Features

### Core
- [ ] Landing page dengan links ke CV, demos, socials
- [ ] Dark/Light mode toggle dengan persistence
- [ ] Responsive design (mobile-first)
- [ ] SEO optimized

### Content Management
- [ ] Semua konten editable via single JSON file
- [ ] Profile info (nama, tagline, location, status)
- [ ] Sections dengan items (tag, label, url, external flag)

### Visual
- [ ] Elegant luxury theme (warm burgundy/wine palette)
- [ ] Staggered fade-up animations
- [ ] Hover effects dengan glow dan transform
- [ ] Mouse-following glow effect
- [ ] Gradient orbs background
- [ ] Noise texture overlay

## Content Structure

```
Profile
├── name: Display name
├── tagline: Short bio/description  
├── location: City, Country
└── status: Availability status

Sections[]
├── title: Section header
└── items[]
    ├── tag: Category label (uppercase)
    ├── label: Display text
    ├── url: Destination link
    └── external: Open in new tab?
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main landing page dengan semua links |

## External Links

| Destination | URL |
|-------------|-----|
| CV/Portfolio | https://me.kcmon.id/ |
| HiveCreator Demo | https://demohc.kcmon.id/ |
| GitHub | https://github.com/aikazu |
| LinkedIn | https://linkedin.com/in/iqbalattila |
| X/Twitter | https://x.com/Vystkailash |
