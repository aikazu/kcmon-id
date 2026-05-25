"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, type JSX } from "react";
import type { Profile } from "../types";

interface MastheadProps {
  profile: Profile;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Masthead({ profile, theme, onToggleTheme }: MastheadProps): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const nameParts = profile.name.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Force reflow then trigger reveal so the keyframe restarts every mount
    el.classList.remove("masthead--reveal");
    void el.offsetWidth;
    el.classList.add("masthead--reveal");
  }, []);

  return (
    <header ref={ref} className="masthead">
      <div className="masthead__topbar">
        <span className="masthead__topbar-meta">
          <span>ISSUE {profile.issue.number}</span>
          <span className="masthead__topbar-rule" aria-hidden="true" />
          <span>{profile.issue.year}</span>
          <span className="masthead__topbar-rule" aria-hidden="true" />
          <span>{profile.location.toUpperCase()}</span>
        </span>
        <button
          type="button"
          onClick={onToggleTheme}
          className="toggle-btn"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-pressed={theme === "light"}
        >
          <span className="toggle-btn__caption">Theme</span>
          <span className="toggle-btn__track" aria-hidden="true">
            <span className="toggle-btn__thumb">
              {theme === "dark" ? (
                <Moon className="h-3.5 w-3.5" />
              ) : (
                <Sun className="h-3.5 w-3.5" />
              )}
            </span>
          </span>
        </button>
      </div>

      <div className="masthead__grid">
        <h1 className="masthead__name">
          {nameParts.map((part, i) => (
            <span
              key={part}
              className="masthead__name-line animate-slide-left"
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              <span className="masthead__name-accent">{part[0]}</span>
              {part.slice(1)}
              {i === nameParts.length - 1 ? "." : ""}
            </span>
          ))}
        </h1>

        <div className="masthead__meta">
          <div className="masthead__meta-row animate-fade-up" style={{ animationDelay: "260ms" }}>
            <span className="masthead__meta-key">Status</span>
            <span className="masthead__meta-value">
              <span className="status-row">
                <span className="status-dot" aria-hidden="true" />
                {profile.status}
              </span>
            </span>
          </div>
          <div className="masthead__meta-row animate-fade-up" style={{ animationDelay: "320ms" }}>
            <span className="masthead__meta-key">Role</span>
            <span className="masthead__meta-value">{profile.role}</span>
          </div>
          <div className="masthead__meta-row animate-fade-up" style={{ animationDelay: "380ms" }}>
            <span className="masthead__meta-key">Subject</span>
            <span className="masthead__meta-value">{profile.subtitle}</span>
          </div>
        </div>
      </div>

      <p className="masthead__tagline animate-fade-up" style={{ animationDelay: "440ms" }}>
        {profile.tagline}
      </p>

      <div className="masthead__divider" aria-hidden="true">
        <span className="masthead__divider-glyph">§</span>
      </div>
    </header>
  );
}
