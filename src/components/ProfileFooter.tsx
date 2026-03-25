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
      <div className="flex items-center justify-between">
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
