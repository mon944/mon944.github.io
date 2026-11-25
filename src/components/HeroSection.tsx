import { ArrowDownRight, Mail } from 'lucide-react';
import {
  CUSTOM_IMAGE_SOURCES,
  PERSON_PROFILE,
  SOFTWARE_MARQUEE_ITEMS,
} from '../data/portfolioData';
import { createPlaceholderSvgDataUri, type ThemeMode } from '../utils/portfolioLogic';
import { Reveal } from './Reveal';

interface HeroSectionProps {
  theme: ThemeMode;
}

export function HeroSection({ theme }: HeroSectionProps) {
  const profileSrc =
    CUSTOM_IMAGE_SOURCES.PROFILE_PHOTO ||
    createPlaceholderSvgDataUri({
      label: 'PROFILE_PHOTO',
      subtitle: 'Replace with circular portrait',
      kind: 'profile',
      theme,
      width: 440,
      height: 440,
    });

  return (
    <section
      id="hero"
      className={`relative overflow-hidden border-b border-slate-200/90 dark:border-slate-800/80 bg-[#F6F9FC]/90 dark:bg-[#070A0F]/90 ${
        theme === 'dark' ? 'engineering-grid-dark' : 'engineering-grid-light'
      }`}
    >
      {/* Subtle architectural ambient fade at section perimeter */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(243,246,250,0.75)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,11,16,0.85)_100%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-12 sm:gap-8 md:gap-12 lg:gap-16">
          {/* Primary typographic column */}
          <div className="order-2 sm:order-1 sm:col-span-7">
            <Reveal>
              <p className="text-[13px] sm:text-sm font-semibold tracking-wide text-teal-700 dark:text-teal-400">
                RUET · Rajshahi, Bangladesh
              </p>

              <h1 className="mt-3.5 font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl lg:text-[3.75rem] lg:leading-[1.08]">
                Mehedi Hasan
              </h1>

              <p className="mt-4 text-base font-medium text-slate-800 dark:text-slate-200 sm:text-lg leading-relaxed max-w-xl text-balance">
                {PERSON_PROFILE.title}
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-teal-600 dark:bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white dark:text-slate-950 hover:bg-teal-700 dark:hover:bg-teal-400 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-[#090B0E]"
                >
                  <span>View Projects</span>
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-[#11151C] px-6 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 hover:border-teal-600 dark:hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-[#090B0E]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Contact</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Circular profile photo placeholder column */}
          <div className="order-1 flex justify-center sm:order-2 sm:col-span-5 sm:justify-end">
            <Reveal delay={0.08}>
              <div className="relative rounded-full p-2 sm:p-2.5 border border-dashed border-slate-300 dark:border-slate-700/90 shrink-0">
                <div className="h-44 w-44 sm:h-48 sm:w-48 md:h-60 md:w-60 lg:h-72 lg:w-72 overflow-hidden rounded-full border-2 border-teal-600 dark:border-teal-400 bg-slate-200 dark:bg-[#151C26] shadow-sm">
                  <img
                    src={profileSrc}
                    alt="PROFILE_PHOTO — Circular portrait photograph of Mehedi, Materials Science & Engineering student at RUET"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Continuous scrolling software stack marquee below the hero split */}
        <Reveal delay={0.14}>
          <div className="mt-10 sm:mt-12 border-t border-slate-200/90 dark:border-slate-800/80 pt-6">
            <div
              role="region"
              aria-label="Engineering software stack"
              className="software-marquee-container relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            >
              <div className="software-marquee-track">
                <ul className="flex shrink-0 items-center gap-10 pr-10 sm:gap-12 sm:pr-12">
                  {SOFTWARE_MARQUEE_ITEMS.map((item) => (
                    <li
                      key={item.name}
                      className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 rotate-45 bg-teal-600 dark:bg-teal-400"
                      />
                      <span className="font-display text-sm sm:text-[15px] font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <ul
                  aria-hidden="true"
                  className="flex shrink-0 items-center gap-10 pr-10 sm:gap-12 sm:pr-12"
                >
                  {SOFTWARE_MARQUEE_ITEMS.map((item) => (
                    <li
                      key={`dup-${item.name}`}
                      className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-teal-600 dark:bg-teal-400" />
                      <span className="font-display text-sm sm:text-[15px] font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
