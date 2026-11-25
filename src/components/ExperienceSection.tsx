import { EXPERIENCE_DATA } from '../data/portfolioData';
import { Reveal } from './Reveal';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="border-b border-slate-200 dark:border-slate-800/80 py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
            Experience &amp; Involvement
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Technical society memberships at RUET, collaborative engineering teams, and independent venture execution.
          </p>
        </Reveal>

        <div className="mt-8 sm:mt-10 divide-y divide-slate-200 dark:divide-slate-800/80 border-t border-b border-slate-200 dark:border-slate-800/80">
          {EXPERIENCE_DATA.map((entry, idx) => (
            <Reveal key={entry.id} delay={idx * 0.06}>
              <article className="grid grid-cols-1 gap-4 py-6 lg:grid-cols-12 lg:gap-8">
                {/* Left column: Period & Location */}
                <div className="lg:col-span-4">
                  <p className="text-sm font-semibold text-teal-700 dark:text-teal-400 tabular-nums">
                    {entry.period}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {entry.location}
                  </p>
                </div>

                {/* Right column: Organization, Role & Highlights */}
                <div className="lg:col-span-8">
                  <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-slate-50">
                    {entry.organization}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {entry.role}
                  </p>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
                    {entry.summary}
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                    {entry.highlights.map((highlight, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
