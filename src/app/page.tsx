"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import data from "../data/data.json";
import { ProfileFooter } from "../components/ProfileFooter";
import { ProfileHeader } from "../components/ProfileHeader";
import { Section } from "../components/Section";
import type { Data, Section as SectionType } from "../types";

const typedData: Data = data;
const { profile, sections } = typedData;

export default function App(): React.JSX.Element | null {
  const [theme, setTheme] = useState<string>("dark");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("kcmon-theme") ?? "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    setMounted(true);
  }, []);

  const toggleTheme = (): void => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("kcmon-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) {
    return null;
  }

  const getSectionByTitle = (title: string): SectionType | undefined =>
    sections.find((section: SectionType) => section.title === title);

  const infoSection = getSectionByTitle("Information");
  const projectsSection = getSectionByTitle("Projects");
  const connectSection = getSectionByTitle("Connect");

  const getSectionIndex = (title: string): number =>
    sections.findIndex((section: SectionType) => section.title === title);

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
          {theme === "dark" ? (
            <Moon className="h-3.5 w-3.5" />
          ) : (
            <Sun className="h-3.5 w-3.5" />
          )}
        </span>
      </span>
      <span className="toggle-btn__value">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );

  return (
    <main
      className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] lg:h-screen lg:overflow-hidden"
    >
      <div className="grid-bg" />
      <div className="accent-glow" />

      <div className="relative z-10 mx-auto max-w-lg px-6 py-20 pb-32 sm:py-28 sm:pb-36 lg:hidden">
        <ProfileHeader profile={profile} topSlot={themeToggle} />

        <div>
          {sections.map((section, idx) => (
            <Section key={section.title} section={section} sectionIndex={idx} />
          ))}
        </div>

        <ProfileFooter profile={profile} />
      </div>

      <div className="hidden lg:grid h-screen w-full grid-cols-12 relative z-10">
        <div className="col-span-4 border-r border-[var(--border)] p-12 flex flex-col justify-between h-full">
          <ProfileHeader profile={profile} className="mb-0" topSlot={themeToggle} />
          <ProfileFooter profile={profile} className="mt-0" />
        </div>

        <div className="col-span-4 border-r border-[var(--border)] p-12 overflow-y-auto no-scrollbar flex flex-col gap-14">
          {infoSection && (
            <Section
              section={infoSection}
              sectionIndex={getSectionIndex("Information")}
              className=""
            />
          )}
          {projectsSection && (
            <Section
              section={projectsSection}
              sectionIndex={getSectionIndex("Projects")}
              className="mb-0"
            />
          )}
        </div>

        <div className="col-span-4 p-12 overflow-y-auto no-scrollbar">
          {connectSection && (
            <Section
              section={connectSection}
              sectionIndex={getSectionIndex("Connect")}
              className="mb-0"
            />
          )}
        </div>
      </div>
    </main>
  );
}
