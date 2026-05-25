import type { JSX } from "react";

interface PullQuoteProps {
  text: string;
}

export function PullQuote({ text }: PullQuoteProps): JSX.Element {
  return (
    <aside className="pull-quote animate-fade-up" aria-hidden="true">
      <p className="pull-quote__text">{text}</p>
    </aside>
  );
}
