import type { JSX } from "react";
import type { Section as SectionData } from "../types";
import { LinkRow } from "./LinkRow";

interface SectionProps {
  section: SectionData;
  sectionIndex: number;
  className?: string;
}

function formatSectionNumber(i: number): string {
  return i < 9 ? `0${i + 1}` : `${i + 1}`;
}

export function Section({ section, sectionIndex, className = "" }: SectionProps): JSX.Element {
  return (
    <section className={`section ${className}`.trim()} aria-labelledby={`section-${sectionIndex}`}>
      <header className="section__header">
        <span className="section__number animate-fade-up" style={{ animationDelay: "0ms" }}>
          § {formatSectionNumber(sectionIndex)}
        </span>
        <h2 id={`section-${sectionIndex}`} className="section__title animate-fade-up" style={{ animationDelay: "60ms" }}>
          {section.title}
        </h2>
        <span className="section__rule animate-reveal-line" style={{ animationDelay: "180ms" }} />
      </header>

      {section.intro ? (
        <p className="section__intro animate-fade-up" style={{ animationDelay: "260ms" }}>
          {section.intro}
        </p>
      ) : null}

      <div className="section__list">
        {section.items.map((item, i) => (
          <LinkRow key={item.url + item.label} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
