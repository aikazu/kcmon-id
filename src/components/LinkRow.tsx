import type { JSX } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Item } from "../types";
import { techIcons } from "./TechIcons";

interface LinkRowProps {
  item: Item;
  index: number;
}

function formatIndex(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function LinkRow({ item, index }: LinkRowProps): JSX.Element {
  const techStack = item.techStack ?? [];
  const isFeatured = item.tag.toLowerCase() === "live";
  const cls = `link-row animate-fade-up${isFeatured ? " link-row--featured" : ""}`;

  return (
    <a
      href={item.url}
      target={item.external ? "_blank" : "_self"}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={cls}
      data-cursor="link"
      style={{ animationDelay: `${400 + index * 70}ms` }}
    >
      <span className="link-row__index" aria-hidden="true">
        {formatIndex(index + 1)}
      </span>
      <span className="link-row__body">
        <span className="link-row__tag">{item.tag}</span>
        <span className="link-row__label">{item.label}</span>
        {techStack.length > 0 ? (
          <span className="link-row__tech" aria-label={`Built with ${techStack.join(", ")}`}>
            {techStack.map((tech) => {
              const t = techIcons[tech.toLowerCase()];
              if (!t) return null;
              return (
                <span
                  key={tech}
                  className="link-row__tech-icon"
                  title={t.name}
                  aria-hidden="true"
                >
                  <t.Component />
                </span>
              );
            })}
          </span>
        ) : null}
      </span>
      <span className="link-row__arrow" aria-hidden="true">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}
