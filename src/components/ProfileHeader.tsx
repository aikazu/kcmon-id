import React from 'react';
import { Profile } from '../types';

interface ProfileHeaderProps {
  profile: Profile;
  className?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, className = "mb-20" }) => {
  const nameParts = profile.name.split(' ');

  return (
    <header className={className}>
      <div
        className="status-badge mb-8 animate-slide-left"
        style={{ animationDelay: '0ms' }}
      >
        <span className="status-dot" />
        <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'var(--muted-foreground)' }}>
          {profile.status}
        </span>
      </div>

      <h1 className="hero-name text-6xl sm:text-8xl lg:text-7xl xl:text-8xl mb-6">
        {nameParts.map((part, i) => (
          <span
            key={part}
            className="block animate-slide-left"
            style={{ animationDelay: `${100 + i * 150}ms` }}
          >
            <span className="accent-letter">{part[0]}</span>
            {part.slice(1)}
          </span>
        ))}
      </h1>

      <p
        className="hero-tagline text-sm sm:text-base max-w-xs leading-relaxed animate-fade-up"
        style={{ animationDelay: '350ms' }}
      >
        {profile.tagline}
      </p>

      <div
        className="mt-5 flex items-center gap-3 animate-fade-up"
        style={{ animationDelay: '450ms' }}
      >
        <div
          className="h-px w-12 animate-reveal-line"
          style={{ background: 'var(--primary)', animationDelay: '500ms' }}
        />
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--muted-foreground)' }}>
          {profile.location}
        </span>
      </div>
    </header>
  );
};
