import type { JSX } from "react";
import type { ReactNode } from "react";
import type { Profile } from "../types";

interface ProfileHeaderProps {
  profile: Profile;
  className?: string;
  topSlot?: ReactNode;
}

export function ProfileHeader({
  profile,
  className = "mb-20",
  topSlot,
}: ProfileHeaderProps): JSX.Element {
  const nameParts = profile.name.split(" ");

  return (
    <header className={className}>
      <div className="mb-10 flex items-start justify-between gap-4">
        <div
          className="status-badge animate-slide-left"
          style={{ animationDelay: "0ms" }}
        >
          <span className="status-dot" />
          <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: "var(--muted-foreground)" }}>
            {profile.status}
          </span>
        </div>
        {topSlot ? (
          <div
            className="animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {topSlot}
          </div>
        ) : null}
      </div>

      <h1 className="hero-name text-6xl sm:text-8xl lg:text-7xl xl:text-8xl mb-7">
        {nameParts.map((part, i) => (
          <span
            key={part}
            className="block animate-slide-left"
            style={{ animationDelay: `${100 + i * 150}ms` }}
          >
            <span className="accent-letter">{part[0]}</span>
            {part.slice(1)}
          </span>
        ))}
      </h1>

      <p
        className="hero-tagline text-sm sm:text-base max-w-xs animate-fade-up"
        style={{ animationDelay: "350ms" }}
      >
        {profile.tagline}
      </p>

      <div
        className="mt-6 flex items-center gap-3 animate-fade-up"
        style={{ animationDelay: "450ms" }}
      >
        <div
          className="h-px w-14 animate-reveal-line"
          style={{ background: "var(--primary)", animationDelay: "500ms" }}
        />
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
          {profile.location}
        </span>
      </div>
    </header>
  );
}
