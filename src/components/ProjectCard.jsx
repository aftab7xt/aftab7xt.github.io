import { useState } from 'react';
import LabelChip from './LabelChip';
import { ExternalLink, Star, GitFork } from 'lucide-react';

export default function ProjectCard({ repo }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    if (repo.html_url) {
      window.open(repo.html_url, '_blank', 'noopener,noreferrer');
    }
  };

  const imageUrl = `https://raw.githubusercontent.com/aftab7xt/${repo.name}/refs/heads/main/fastlane/metadata/android/en-US/images/featureGraphic.png`;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer rounded-2xl p-4 transition-colors flex flex-col md:flex-row gap-3 md:gap-4"
      style={{ backgroundColor: isHovered ? 'var(--color-surface-container-low)' : 'transparent' }}
    >
      <div className="md:w-1/3">
        {imgError ? (
          <div
            className="rounded-xl w-full aspect-video"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}
          />
        ) : (
          <img
            src={imageUrl}
            alt={repo.name}
            className="rounded-xl w-full object-cover aspect-video"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="md:flex-1">
        <div className="flex flex-row items-center gap-1 font-medium text-sm">
          <span>{repo.name}</span>
          <ExternalLink size={14} style={{ color: 'var(--color-primary)' }} />
        </div>
        
        <p
          className="text-sm mt-2"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          {repo.description || 'No description'}
        </p>

        <div className="flex flex-row gap-3 mt-2">
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: 'var(--color-outline)' }}
          >
            <Star size={12} />
            <span>{repo.stargazers_count}</span>
          </div>
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: 'var(--color-outline)' }}
          >
            <GitFork size={12} />
            <span>{repo.forks_count}</span>
          </div>
        </div>

        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {repo.topics.map((topic, index) => (
              <LabelChip key={index} label={topic} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
