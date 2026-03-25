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

  return (
    <a
      href={item.url}
      target={item.external ? "_blank" : "_self"}
      rel={item.external ? "noopener noreferrer" : ""}
      className="link-row animate-fade-up"
      style={{ animationDelay: `${600 + index * 100}ms` }}
    >
      <div className="link-copy">
        <span className="link-tag">{item.tag}</span>
        <span className="link-label">{item.label}</span>
      </div>
      {hasTechStack ? (
        <div className="link-tech">
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
