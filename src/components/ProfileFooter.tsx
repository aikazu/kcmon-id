import type { JSX } from "react";
import type { Profile } from "../types";

interface ProfileFooterProps {
  profile: Profile;
  className?: string;
}

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      {...props}
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

function handleScrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
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
          © 2026 {profile.name}
        </span>
        <button
          type="button"
          onClick={handleScrollToTop}
          className="footer-back-to-top font-mono text-[10px] tracking-wider uppercase"
        >
          <ArrowUpIcon className="footer-back-to-top__icon" />
          <span>Top</span>
        </button>
      </div>
    </footer>
  );
}
