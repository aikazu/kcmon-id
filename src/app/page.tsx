"use client";

import { useState, useEffect } from 'react';
import data from "../data/data.json";
import { Sun, Moon } from 'lucide-react';
import { Data } from '../types';
import { Section } from '../components/Section';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileFooter } from '../components/ProfileFooter';

const { profile, sections } = data as unknown as Data;





export default function App(): React.JSX.Element | null {
  const [theme, setTheme] = useState<string>('dark');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('kcmon-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setMounted(true);
  }, []);

  const toggleTheme = (): void => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('kcmon-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) return null;

  const infoSection = sections.find(s => s.title === 'Information');
  const projectsSection = sections.find(s => s.title === 'Projects');
  const connectSection = sections.find(s => s.title === 'Connect');

  const getSectionIndex = (title: string): number => sections.findIndex(s => s.title === title);

  return (
    <main
      className="h-screen w-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] relative"
    >
      <div className="grid-bg" />
      <div className="accent-glow" />

      <button
        type="button"
        onClick={toggleTheme}
        className="toggle-btn fixed top-6 right-6 z-50 animate-scale-in"
        style={{ animationDelay: '100ms' }}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
        ) : (
          <Moon className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
        )}
      </button>

      <div className="lg:hidden max-w-lg mx-auto px-6 py-20 sm:py-28 relative z-10">
        <ProfileHeader profile={profile} />

        <div>
          {sections.map((section, idx) => (
            <Section key={section.title} section={section} sectionIndex={idx} />
          ))}
        </div>

        <ProfileFooter profile={profile} />
      </div>

      <div className="hidden lg:grid h-screen w-full grid-cols-12 relative z-10">
        
        <div className="col-span-4 border-r border-[var(--border)] p-12 flex flex-col justify-between h-full">
          <ProfileHeader profile={profile} className="mb-0" />
          <ProfileFooter profile={profile} className="mt-0" />
        </div>

        <div className="col-span-4 border-r border-[var(--border)] p-12 overflow-y-auto no-scrollbar flex flex-col gap-14">
          {infoSection && (
            <Section 
              section={infoSection} 
              sectionIndex={getSectionIndex('Information')}
              className="" 
            />
          )}
          {projectsSection && (
            <Section 
              section={projectsSection} 
              sectionIndex={getSectionIndex('Projects')} 
              className="mb-0"
            />
          )}
        </div>

        <div className="col-span-4 p-12 overflow-y-auto no-scrollbar">
          {connectSection && (
            <Section 
              section={connectSection} 
              sectionIndex={getSectionIndex('Connect')} 
              className="mb-0"
            />
          )}
        </div>

      </div>
    </main>
  );
}
