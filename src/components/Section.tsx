import type { JSX } from "react";
import type { Section as SectionType } from "../types";
import { LinkRow } from "./LinkRow";

interface SectionProps {
  section: SectionType;
  sectionIndex: number;
  className?: string;
}

export function Section({
  section,
  sectionIndex,
  className = "mb-14",
}: SectionProps): JSX.Element {
  const baseIndex = sectionIndex * 5;
  const sectionNum = String(sectionIndex + 1).padStart(2, "0");

  return (
    <section className={className}>
      <div
        className="section-header animate-fade-up"
        style={{ animationDelay: `${500 + sectionIndex * 120}ms` }}
      >
        <span className="section-number animate-number" style={{ animationDelay: `${550 + sectionIndex * 120}ms` }}>
          {sectionNum}
        </span>
        <span className="section-title">{section.title}</span>
        <div
          className="section-rule animate-reveal-line"
          style={{ animationDelay: `${600 + sectionIndex * 120}ms` }}
        />
      </div>

      <div>
        {section.items.map((item, idx) => (
          <LinkRow key={item.label} item={item} index={baseIndex + idx} />
        ))}
      </div>
    </section>
  );
}
