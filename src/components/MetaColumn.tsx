"use client";

import { useEffect, useRef, type JSX } from "react";
import type { Profile } from "../types";

interface MetaColumnProps {
  profile: Profile;
}

const SOCIALS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "GitHub", href: "https://github.com/aikazu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iqbalattila" },
  { label: "X / Twitter", href: "https://x.com/Vystkailash" },
];

const MAX_OFFSET = 32;

export function MetaColumn({ profile }: MetaColumnProps): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (reduce || !wide) return;

    let raf = 0;
    let lastY = window.scrollY;

    const apply = (): void => {
      raf = 0;
      const offset = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, lastY * -0.06));
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = (): void => {
      lastY = window.scrollY;
      if (raf === 0) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, []);

  return (
    <aside ref={ref} className="meta-col" data-parallax="" aria-label="Profile meta">
      <div className="meta-col__block">
        <span className="meta-col__key">Issue</span>
        <span className="meta-col__value">
          {profile.issue.number} · {profile.issue.year}
        </span>
      </div>

      <div className="meta-col__block">
        <span className="meta-col__key">Status</span>
        <span className="meta-col__value">{profile.status}</span>
      </div>

      <div className="meta-col__block">
        <span className="meta-col__key">Role</span>
        <span className="meta-col__value">{profile.role}</span>
      </div>

      <div className="meta-col__block">
        <span className="meta-col__key">Located</span>
        <span className="meta-col__value">{profile.location}</span>
      </div>

      <div className="meta-col__block">
        <span className="meta-col__key">Threads</span>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            className="meta-col__link meta-col__value"
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
          >
            <span className="meta-col__link-icon" aria-hidden="true" />
            {s.label}
          </a>
        ))}
      </div>

      <div className="meta-col__block">
        <span className="meta-col__copy">© {profile.issue.year} {profile.name}</span>
      </div>
    </aside>
  );
}
