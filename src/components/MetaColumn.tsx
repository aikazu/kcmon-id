"use client";

import type { JSX } from "react";
import type { Profile } from "../types";

interface MetaColumnProps {
  profile: Profile;
}

const SOCIALS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "GitHub", href: "https://github.com/aikazu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iqbalattila" },
  { label: "X / Twitter", href: "https://x.com/Vystkailash" },
];

export function MetaColumn({ profile }: MetaColumnProps): JSX.Element {
  return (
    <aside className="meta-col" aria-label="Profile meta">
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
