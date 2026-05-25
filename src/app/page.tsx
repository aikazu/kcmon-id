"use client";

import { useEffect, useState } from "react";
import data from "../data/data.json";
import { DecorColumn } from "../components/DecorColumn";
import { Masthead } from "../components/Masthead";
import { MetaColumn } from "../components/MetaColumn";
import { PaperGrain } from "../components/PaperGrain";
import { ProfileFooter } from "../components/ProfileFooter";
import { PullQuote } from "../components/PullQuote";
import { Section } from "../components/Section";
import type { Data } from "../types";

const { profile, sections } = data as Data;

export default function App(): React.JSX.Element | null {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" || current === "dark" ? current : "dark";
    setTheme(next);
    document.documentElement.style.colorScheme = next;
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(
      ".animate-fade-up, .animate-slide-left, .animate-reveal-line",
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleTheme = (): void => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("kcmon-theme", next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
  };

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <PaperGrain />
      <Masthead profile={profile} theme={theme} onToggleTheme={toggleTheme} />

      <div className="body-grid">
        <MetaColumn profile={profile} />
        <div className="body-grid__center">
          {sections.map((section, idx) => (
            <Section key={section.title} section={section} sectionIndex={idx} />
          ))}
        </div>
        <DecorColumn issue={profile.issue} />
      </div>

      <PullQuote text={profile.tagline} />
      <ProfileFooter profile={profile} />
    </main>
  );
}
