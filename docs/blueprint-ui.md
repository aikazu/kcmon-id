# UI/UX Specification

## Design Direction

**Aesthetic**: Elegant Luxury
**Tone**: Premium, Professional, Refined
**Theme**: Dark mode default with light mode option

## Color Palette

### Dark Mode (Default)
| Token | Color | Usage |
|-------|-------|-------|
| `--background` | Deep warm brown | Page background |
| `--foreground` | Off-white cream | Primary text |
| `--card` | Slightly lighter brown | Card backgrounds |
| `--primary` | Wine red/burgundy | Accents, CTAs, hover states |
| `--muted` | Dark brown | Subtle backgrounds |
| `--muted-foreground` | Light gray | Secondary text |
| `--border` | Medium brown | Borders, dividers |
| `--accent` | Copper/gold | Secondary accents |

### Light Mode
| Token | Color | Usage |
|-------|-------|-------|
| `--background` | Warm cream | Page background |
| `--foreground` | Near black | Primary text |
| `--card` | White | Card backgrounds |
| `--primary` | Darker wine red | Accents, CTAs |
| `--muted` | Light beige | Subtle backgrounds |

## Typography

| Type | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Libre Baskerville | Bold, Italic | Headings, name |
| Body | Poppins | Regular, Medium, Semibold | UI text |
| Mono | IBM Plex Mono | Regular | Tags, technical text |

## Spacing

- Container max-width: 448px (md)
- Padding: 20px horizontal, 64-96px vertical
- Card padding: 16px
- Section gap: 40px
- Item gap: 12px

## Components

### Link Card
- Background: `var(--card)`
- Border: 1px solid `var(--border)`
- Border radius: 0.5rem
- Icon: 48x48px rounded-xl container
- Hover: lift (-4px), glow shadow, border color change, icon scale+rotate

### Section Header
- Dot indicator with ping animation
- Italic serif title
- Shimmer line divider

### Theme Toggle
- Fixed position top-right
- Rounded-xl button
- Rotating conic gradient on hover

### Status Badge
- Pill shape with sparkle icon
- Green pulsing dot
- Positioned above name

## Animations

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| fade-up | 800ms | cubic-bezier(0.22, 1, 0.36, 1) | Page load |
| scale-in | 500ms | cubic-bezier(0.22, 1, 0.36, 1) | Page load |
| float | 4-10s | ease-in-out | Continuous (orbs) |
| glow-pulse | 2-3s | ease-in-out | Continuous (status) |
| shimmer | 3s | ease-in-out | Continuous (lines) |
| ping | default | default | Continuous (dots) |

### Stagger Delays
- Status badge: 0ms
- Name: 100ms
- Tagline: 200ms
- Location: 300ms
- Sections: 400ms + (index * 100ms)
- Cards: 500ms + (index * 120ms)
- Footer: 1200ms

## Interactive Effects

### Mouse Glow
- 300x300px radial gradient
- Follows cursor position
- 20% opacity, 60px blur
- Uses primary color

### Gradient Orbs
- 2 fixed blurred circles
- Floating animation (opposite directions)
- Primary and accent colors
- Reduced opacity in light mode

### Noise Texture
- Fixed full-screen overlay
- SVG fractal noise
- 2.5% opacity, overlay blend mode

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| Mobile (default) | Single column, 16px padding |
| SM (640px) | Larger heading, 24px vertical padding |

## Accessibility

- Semantic HTML (main, header, footer, section, h1, h2)
- ARIA labels on interactive elements
- Focus states on all clickable elements
- Color contrast meets WCAG guidelines
- Reduced motion respected via CSS
