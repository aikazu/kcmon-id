import type { JSX } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Item } from "../types";
import { TechStackIcon } from "./TechStackIcon";

interface LinkRowProps {
  item: Item;
  index: number;
}

export function LinkRow({ item, index }: LinkRowProps): JSX.Element {
  const techStack = item.techStack ?? [];
  const hasTechStack = techStack.length > 0;
  const hasMeta = Boolean(item.year) || hasTechStack;
  const rowClassName = item.featured ? "link-row link-row--featured animate-fade-up" : "link-row animate-fade-up";

  return (
    <a
      href={item.url}
      target={item.external ? "_blank" : "_self"}
      rel={item.external ? "noopener noreferrer" : ""}
      className={rowClassName}
      style={{ animationDelay: `${600 + index * 100}ms` }}
    >
      <div className="link-row__topline">
        <span className="link-tag">{item.tag}</span>
        {item.year ? <span className="link-year">{item.year}</span> : null}
      </div>

      <div className="link-copy">
        <span className="link-label">{item.label}</span>
        {item.summary ? <span className="link-summary">{item.summary}</span> : null}
      </div>

      {hasMeta ? (
        <div className="link-meta">
          {hasTechStack ? (
            <div className="flex items-center gap-1">
              {techStack.map((tech: string) => (
                <TechStackIcon key={tech} tech={tech} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <span className="link-arrow">
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </a>
  );
}
