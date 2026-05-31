import { useRef, useState, useEffect } from 'react';
import useGitHub from '../hooks/useGitHub';
import { paragraphs, experiences, socialLinks } from '../data/content';
import LeftPanel from '../components/LeftPanel';
import TopBar from '../components/TopBar';
import ExperienceCard from '../components/ExperienceCard';
import ProjectCard from '../components/ProjectCard';
import { Github, Linkedin, Mail, Sun, Moon, ExternalLink } from 'lucide-react';

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

export default function HomeScreen({ isDark, onToggleTheme }) {
  const [activeSection, setActiveSection] = useState('about');
  const [topBarVisible, setTopBarVisible] = useState(false);
  
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  
  const { repos, isLoading } = useGitHub('aftab7xt');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      
      const aboutTop = aboutRef.current?.offsetTop || 0;
      const expTop = experienceRef.current?.offsetTop || 0;
      const projTop = projectsRef.current?.offsetTop || 0;

      if (scrollPos >= projTop && projTop > 0) {
        setActiveSection('projects');
      } else if (scrollPos >= expTop && expTop > 0) {
        setActiveSection('experience');
      } else {
        setActiveSection('about');
      }
      
      setTopBarVisible(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onNavClick = (sectionId) => {
    let targetRef = null;
    if (sectionId === 'about') targetRef = aboutRef;
    if (sectionId === 'experience') targetRef = experienceRef;
    if (sectionId === 'projects') targetRef = projectsRef;

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="lg:hidden">
        <TopBar
          visible={topBarVisible}
          activeSection={activeSection}
          isDark={isDark}
          onToggleTheme={onToggleTheme}
        />
      </div>

      <div className="max-w-screen-xl mx-auto lg:flex">
        {/* Left Column (Desktop) */}
        <div className="hidden lg:flex flex-col w-[45%] max-w-md sticky top-0 h-screen py-24 pl-16 pr-8">
          <LeftPanel
            activeSection={activeSection}
            onNavClick={onNavClick}
            isDark={isDark}
            onToggleTheme={onToggleTheme}
          />
        </div>

        {/* Right Column (Scrollable content) */}
        <div className="w-full lg:w-[55%] py-16 px-6 lg:px-16 lg:py-24">
          
          {/* Mobile-only header */}
          <div className="lg:hidden mb-16">
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: 'var(--color-on-surface)' }}
            >
              Shaikh Aftab Alli
            </h1>
            <h2
              className="text-lg font-medium mb-3"
              style={{ color: 'var(--color-primary)' }}
            >
              Android Developer
            </h2>
            <p
              className="text-sm mb-8 max-w-xs"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              Specializing in cinematic UI/UX and high-performance Kotlin applications.
            </p>
            
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={{ color: 'var(--color-outline)' }}
                >
                  {getIcon(link.icon)}
                </a>
              ))}
              <button
                onClick={onToggleTheme}
                className="transition-colors duration-200 flex items-center justify-center"
                style={{ color: 'var(--color-outline)' }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* About Section */}
          <div ref={aboutRef} className="pt-24 lg:pt-0">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Experience Section */}
          <div ref={experienceRef} className="mt-28">
            {experiences.map((exp, idx) => (
              <div key={idx} className="mb-8">
                <ExperienceCard experience={exp} />
              </div>
            ))}
            <a
              href="https://linkedin.com/in/aftab7xt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-max items-center gap-1 text-sm mt-4 transition-colors"
              style={{ color: 'var(--color-on-surface)' }}
            >
              View LinkedIn profile
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Projects Section */}
          <div ref={projectsRef} className="mt-28">
            {isLoading ? (
              <div className="text-sm" style={{ color: 'var(--color-outline)' }}>
                Loading projects...
              </div>
            ) : (
              repos.map((repo) => (
                <div key={repo.id} className="mb-8">
                  <ProjectCard repo={repo} />
                </div>
              ))
            )}
            <a
              href="https://github.com/aftab7xt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-max items-center gap-1 text-sm mt-4 transition-colors"
              style={{ color: 'var(--color-on-surface)' }}
            >
              View all projects on GitHub
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Footer Section */}
          <div className="mt-28 pb-16 flex flex-col items-center gap-1 text-xs text-center" style={{ color: 'var(--color-outline)' }}>
            <p>Built with React and Tailwind CSS.</p>
            <p>Deployed with Vercel.</p>
            <p>Designed with inspiration from Brittany Chiang.</p>
            <p>Layout adapted from a Compose Multiplatform portfolio.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
