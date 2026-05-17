"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import data from "../data/data.json";
import { ProfileFooter } from "../components/ProfileFooter";
import { ProfileHeader } from "../components/ProfileHeader";
import { Section } from "../components/Section";
import type { Data } from "../types";

const { profile, sections } = data as Data;

export default function App(): React.JSX.Element | null {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "light" || currentTheme === "dark" ? currentTheme : "dark";

    setTheme(nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
  }, []);

  useEffect(() => {
    const animatedElements = document.querySelectorAll(
      ".animate-fade-up, .animate-slide-left, .animate-scale-in, .animate-reveal-line, .animate-number",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    animatedElements.forEach((el) => observer.observe(el));

    return (): void => {
      observer.disconnect();
    };
  }, []);

  const toggleTheme = (): void => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("kcmon-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.style.colorScheme = newTheme;
  };

  const themeToggle = (
    <button
      type="button"
      onClick={toggleTheme}
      className="toggle-btn"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "light"}
    >
      <span className="toggle-btn__caption">Theme</span>
      <span className="toggle-btn__track" aria-hidden="true">
        <span className="toggle-btn__thumb">
          {theme === "dark" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </span>
      </span>
      <span className="toggle-btn__value">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] lg:h-screen lg:overflow-hidden">
      <div className="grid-bg" />
      <div className="accent-glow" />
      <div className="accent-glow-secondary" />

      {/* Mobile layout */}
      <div className="relative z-10 mx-auto max-w-lg px-6 py-16 pb-24 sm:py-24 sm:pb-32 lg:hidden">
        <ProfileHeader profile={profile} topSlot={themeToggle} />

        <div>
          {sections.map((section, idx) => (
            <Section key={section.title} section={section} sectionIndex={idx} />
          ))}
        </div>

        <ProfileFooter profile={profile} />
      </div>

      {/* Desktop layout: 2-column (5-7) */}
      <div className="relative z-10 hidden h-screen w-full grid-cols-12 lg:grid">
        <div className="col-span-5 flex h-full flex-col justify-between border-r border-[var(--border)] p-12">
          <ProfileHeader profile={profile} className="mb-0" topSlot={themeToggle} />
          <ProfileFooter profile={profile} className="mt-0" />
        </div>

        <div className="no-scrollbar scroll-hint-bottom col-span-7 overflow-y-auto p-12">
          <div className="mx-auto flex max-w-2xl flex-col gap-16">
            {sections.map((section, idx) => (
              <Section key={section.title} section={section} sectionIndex={idx} className="mb-0" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
