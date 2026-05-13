import type { JSX } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Item } from "../types";
import { TechStackIcon } from "./TechStackIcon";
import { techIcons } from "./TechIcons";

interface LinkRowProps {
  item: Item;
  index: number;
}

export function LinkRow({ item, index }: LinkRowProps): JSX.Element {
  const techStack = item.techStack ?? [];
  const hasTechStack = techStack.length > 0;
  const shouldStackCopy = item.tag.length > 9;
  const copyClassName = shouldStackCopy
    ? "link-copy link-copy--stacked"
    : "link-copy";
  const isFeatured = item.tag.toLowerCase() === "live";
  const rowClassName = `link-row animate-fade-up${isFeatured ? " link-row--featured" : ""}`;

  const techLabel = hasTechStack
    ? `Built with ${techStack.map((t: string) => techIcons[t.toLowerCase()]?.name ?? t).join(", ")}`
    : undefined;

  return (
    <a
      href={item.url}
      target={item.external ? "_blank" : "_self"}
      rel={item.external ? "noopener noreferrer" : ""}
      className={rowClassName}
      style={{ animationDelay: `${400 + index * 70}ms` }}
    >
      <div className={copyClassName}>
        <span className="link-tag">{item.tag}</span>
        <span className="link-label">{item.label}</span>
      </div>
      {hasTechStack ? (
        <div className="link-tech" aria-label={techLabel}>
          {techStack.map((tech: string) => (
            <TechStackIcon key={tech} tech={tech} />
          ))}
        </div>
      ) : null}
      <span className="link-arrow">
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </a>
  );
}
