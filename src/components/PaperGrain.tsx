import type { JSX } from "react";

const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='4' stitchTiles='stitch' />
    <feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0' />
  </filter>
  <rect width='100%' height='100%' filter='url(%23n)' />
</svg>`;

const NOISE_URL = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE_SVG).replace(/'/g, "%27")}")`;

export function PaperGrain(): JSX.Element {
  return (
    <div
      className="paper-grain"
      aria-hidden="true"
      style={{
        // CSS custom property consumed by .paper-grain rule
        ["--grain-url" as string]: NOISE_URL,
      }}
    />
  );
}
