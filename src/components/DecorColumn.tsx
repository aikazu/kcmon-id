import type { JSX } from "react";
import type { ProfileIssue } from "../types";

interface DecorColumnProps {
  issue: ProfileIssue;
}

export function DecorColumn({ issue }: DecorColumnProps): JSX.Element {
  return (
    <aside className="decor-col" aria-hidden="true">
      <span className="decor-col__glyph">§</span>
      <span className="decor-col__rule" />
      <span className="decor-col__rotated">
        {issue.number} · {issue.year}
      </span>
      <span className="decor-col__rule" />
      <span className="decor-col__glyph">¶</span>
      <span className="decor-col__rule" />
      <span className="decor-col__glyph">◆</span>
    </aside>
  );
}
