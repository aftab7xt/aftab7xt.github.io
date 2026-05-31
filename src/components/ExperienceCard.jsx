import { useState } from 'react';
import LabelChip from './LabelChip';
import { ExternalLink } from 'lucide-react';

export default function ExperienceCard({ experience }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (experience.companyUrl) {
      window.open(experience.companyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer rounded-2xl p-4 transition-colors flex flex-col md:flex-row"
      style={{ backgroundColor: isHovered ? 'var(--color-surface-container-low)' : 'transparent' }}
    >
      <div className="md:w-1/4 pt-1 mb-2 md:mb-0">
        <span
          className="uppercase text-xs"
          style={{ color: 'var(--color-outline)' }}
        >
          {experience.start} &ndash; {experience.end}
        </span>
      </div>
      
      <div className="md:w-3/4">
        <div className="flex flex-wrap items-center gap-1 font-medium">
          <span>{experience.position}</span>
          <span>&middot;</span>
          <span>{experience.company}</span>
          <ExternalLink size={14} style={{ color: 'var(--color-primary)' }} />
        </div>
        
        <p
          className="text-sm mt-2"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          {experience.description}
        </p>
        
        {experience.skills && experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.skills.map((skill, index) => (
              <LabelChip key={index} label={skill} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
