"use client";

import type { JSX } from "react";
import type { Profile } from "../types";

interface ProfileFooterProps {
  profile: Profile;
}

function handleScrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function ProfileFooter({ profile }: ProfileFooterProps): JSX.Element {
  return (
    <footer className="profile-footer">
      <span>© {profile.issue.year} · {profile.name.toUpperCase()} · KCMON.ID</span>
      <button type="button" onClick={handleScrollToTop} className="profile-footer__top">
        <span>Top</span>
        <span aria-hidden="true">↑</span>
      </button>
    </footer>
  );
}
