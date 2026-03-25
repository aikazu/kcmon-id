import type { JSX } from "react";
import type { Profile } from "../types";

interface ProfileFooterProps {
  profile: Profile;
  className?: string;
}

export function ProfileFooter({
  profile,
  className = "mt-24",
}: ProfileFooterProps): JSX.Element {
  return (
    <footer
      className={`${className} animate-fade-up`}
      style={{ animationDelay: "1400ms" }}
    >
      <div className="footer-line mb-6" />
      <div className="footer-shell">
        <div className="footer-copy">
          <span className="footer-kicker">Next step</span>
          <p className="footer-note">{profile.closingNote}</p>
        </div>
        <a
          href={profile.cta.url}
          target={profile.cta.external ? "_blank" : "_self"}
          rel={profile.cta.external ? "noopener noreferrer" : ""}
          className="footer-cta"
        >
          <span>{profile.cta.label}</span>
        </a>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="font-mono text-[10px] tracking-wider" style={{ color: "var(--border)" }}>
          kcmon.id
        </span>
      </div>
    </footer>
  );
}
