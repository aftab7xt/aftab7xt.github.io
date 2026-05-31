import { useState } from 'react';
import { Github, Linkedin, Mail, Sun, Moon, ExternalLink } from 'lucide-react';
import { socialLinks } from '../data/content';

const GitLabIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
  </svg>
);

export default function LeftPanel({ activeSection, onNavClick, isDark, onToggleTheme }) {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' }
  ];

  const getIcon = (iconStr) => {
    switch (iconStr) {
      case 'github':
        return <Github size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'email':
        return <Mail size={20} />;
      case 'gitlab':
        return <GitLabIcon size={20} />;
      default:
        return <ExternalLink size={20} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1
          className="text-4xl font-bold"
          style={{ color: 'var(--color-on-surface)' }}
        >
          Shaikh Aftab Alli
        </h1>
        <h2
          className="text-lg font-medium mt-2"
          style={{ color: 'var(--color-primary)' }}
        >
          Android Developer
        </h2>
        <p
          className="text-sm mt-3 max-w-xs"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          Specializing in cinematic UI/UX and high-performance Kotlin applications.
        </p>
      </div>

      <nav className="mt-12 flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="flex items-center gap-4 py-2 w-full text-left group"
            >
              <div
                className={`h-px transition-all duration-300 ${
                  isActive ? 'w-8' : 'w-4'
                }`}
                style={{
                  backgroundColor: isActive
                    ? 'var(--color-primary)'
                    : 'var(--color-outline)'
                }}
              />
              <span
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive
                    ? 'var(--color-primary)'
                    : 'var(--color-outline)'
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-4 pt-12">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredSocial(link.id)}
            onMouseLeave={() => setHoveredSocial(null)}
            className="transition-colors duration-200 cursor-pointer"
            style={{
              color:
                hoveredSocial === link.id
                  ? 'var(--color-on-surface)'
                  : 'var(--color-outline)'
            }}
          >
            {getIcon(link.icon)}
          </a>
        ))}
        
        <button
          onClick={onToggleTheme}
          onMouseEnter={() => setHoveredSocial('theme-toggle')}
          onMouseLeave={() => setHoveredSocial(null)}
          className="transition-colors duration-200 cursor-pointer"
          style={{
            color:
              hoveredSocial === 'theme-toggle'
                ? 'var(--color-on-surface)'
                : 'var(--color-outline)'
          }}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}
