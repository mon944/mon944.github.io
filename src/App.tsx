import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { HeroSection } from './components/HeroSection';
import { NAV_ITEMS, Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { PERSON_PROFILE } from './data/portfolioData';
import { resolveInitialTheme, type ThemeMode } from './utils/portfolioLogic';

const THEME_STORAGE_KEY = 'mehedi-portfolio-theme';

function readStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  try {
    return resolveInitialTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return 'dark';
  }
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(readStoredTheme);
  const [activeSection, setActiveSection] = useState<string>('');

  // Sync `.dark` class on <html> and persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [theme]);

  // Observe visible section for active navbar link state
  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map((item) => item.id)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveSection(id === 'hero' ? '' : id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className={`min-h-screen text-slate-900 dark:text-slate-100 ${
        theme === 'dark' ? 'canvas-atmosphere-dark' : 'canvas-atmosphere-light'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-teal-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar
        theme={theme}
        activeSection={activeSection}
        onToggleTheme={handleToggleTheme}
      />

      <main id="main-content">
        <HeroSection theme={theme} />
        <AboutSection />
        <ProjectsSection theme={theme} />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-[#EBF0F6]/70 dark:bg-[#0B0F16]/80 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} {PERSON_PROFILE.name} · Materials Science &amp; Engineering, RUET.
          </p>
          <a
            href="#hero"
            className="font-mono text-xs text-slate-500 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
          >
            Back to top
          </a>
        </div>
      </footer>
    </div>
  );
}
