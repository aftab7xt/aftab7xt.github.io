import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function TopBar({ visible, activeSection, isDark, onToggleTheme }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{
        height: '56px',
        backgroundColor: 'var(--color-surface-container-low)',
        borderBottom: '1px solid rgba(111, 121, 121, 0.3)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease',
      }}
    >
      <span
        className="text-sm font-medium capitalize"
        style={{ color: 'var(--color-on-surface)' }}
      >
        {activeSection}
      </span>
      <button
        onClick={onToggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer transition-colors duration-200 flex items-center justify-center"
        style={{
          color: isHovered ? 'var(--color-on-surface)' : 'var(--color-outline)',
        }}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
