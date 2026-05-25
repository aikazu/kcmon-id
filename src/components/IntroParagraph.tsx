"use client";

import { useEffect, useRef, type JSX } from "react";

interface IntroParagraphProps {
   children: string;
   delayMs?: number;
}

export function IntroParagraph({ children, delayMs = 260 }: IntroParagraphProps): JSX.Element {
   const ref = useRef<HTMLParagraphElement | null>(null);

   useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
         el.classList.add("in-view");
         return;
      }

      const io = new IntersectionObserver(
         (entries) => {
            for (const entry of entries) {
               if (entry.isIntersecting) {
                  el.classList.add("in-view");
                  io.disconnect();
                  break;
               }
            }
         },
         { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
      );

      io.observe(el);
      return () => io.disconnect();
   }, []);

   return (
      <p
         ref={ref}
         className="section__intro animate-fade-up"
         style={{ animationDelay: `${delayMs}ms` }}
      >
         {children}
      </p>
   );
}
