import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import type { ThemeMode } from '../utils/portfolioLogic';

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  theme: ThemeMode;
  activeSection: string;
  onToggleTheme: () => void;
}

export function Navbar({ theme, activeSection, onToggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-[#F3F6FA]/85 dark:bg-[#080B10]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#hero"
          onClick={handleNavClick}
          className="font-display text-xl font-bold tracking-tight text-slate-950 dark:text-slate-50 hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
        >
          Mehedi
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm ${
                  isActive
                    ? 'text-teal-700 dark:text-teal-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[21px] h-[2px] bg-teal-600 dark:bg-teal-400"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme toggle (primary header control) + mobile menu button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#11151C] px-3.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-teal-600 dark:hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-teal-400" aria-hidden="true" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-teal-700" aria-hidden="true" />
                <span>Dark</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#11151C] text-slate-800 dark:text-slate-200 hover:border-teal-600 dark:hover:border-teal-400 md:hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1015] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleNavClick}
                  className={`flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-500/10 text-teal-700 dark:text-teal-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
