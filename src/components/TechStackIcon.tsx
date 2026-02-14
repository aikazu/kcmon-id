import React from 'react';
import { techIcons } from './TechIcons';

interface TechStackIconProps {
  tech: string;
}

export const TechStackIcon: React.FC<TechStackIconProps> = ({ tech }) => {
  const techData = techIcons[tech.toLowerCase()];
  if (!techData) return null;

  return (
    <div className="tech-icon" title={techData.name}>
      <div className="tech-icon-inner">
        <techData.Component />
      </div>
    </div>
  );
};
