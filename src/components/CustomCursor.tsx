"use client";

import { useEffect, useRef, type JSX } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isPointerFine(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function CustomCursor(): JSX.Element | null {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !isPointerFine()) return;

    const root = rootRef.current;
    if (!root) return;

    document.documentElement.classList.add("cursor-active");

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const onMove = (e: PointerEvent): void => {
      targetX = e.clientX;
      targetY = e.clientY;
      const t = e.target as HTMLElement | null;
      const isLink = !!t?.closest('[data-cursor="link"], a, button');
      root.classList.toggle("is-link", isLink);
      if (raf === 0) raf = requestAnimationFrame(tick);
    };

    const tick = (): void => {
      raf = 0;
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      root.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf !== 0) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-active");
    };
  }, []);

  return (
    <div ref={rootRef} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor__ring" />
      <span className="custom-cursor__dot" />
    </div>
  );
}
