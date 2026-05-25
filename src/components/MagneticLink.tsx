"use client";

import { useEffect, useRef, type JSX, type ReactNode } from "react";

interface MagneticLinkProps {
  children: ReactNode;
  radius?: number;
  strength?: number;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isHoverCapable(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function MagneticLink({
  children,
  radius = 80,
  strength = 0.35,
}: MagneticLinkProps): JSX.Element {
  const wrapRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !isHoverCapable()) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const target = wrap.firstElementChild as HTMLElement | null;
    if (!target) return;

    let raf = 0;
    let active = false;
    let tx = 0;
    let ty = 0;

    const onMove = (e: PointerEvent): void => {
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        active = true;
        tx = dx * strength;
        ty = dy * strength;
      } else if (active) {
        active = false;
        tx = 0;
        ty = 0;
      } else {
        return;
      }
      schedule();
    };

    const onLeave = (): void => {
      active = false;
      tx = 0;
      ty = 0;
      schedule();
    };

    const apply = (): void => {
      raf = 0;
      target.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
    };

    const schedule = (): void => {
      if (raf !== 0) return;
      raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    target.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
      if (raf !== 0) cancelAnimationFrame(raf);
      target.style.transform = "";
    };
  }, [radius, strength]);

  return (
    <span ref={wrapRef} className="magnetic">
      {children}
    </span>
  );
}
