import { SKILLS_DATA } from '../data/portfolioData';
import { Reveal } from './Reveal';

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="border-b border-slate-200/90 dark:border-slate-800/80 bg-[#EAEFF5]/80 dark:bg-[#0B0F17]/85 py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
            Skills
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Capabilities organized across computational simulation, mechanical design, applied mathematics, and venture building.
          </p>
        </Reveal>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {SKILLS_DATA.map((group, idx) => (
            <Reveal key={group.id} delay={idx * 0.05}>
              <div className="flex h-full flex-col rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#10151E] p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 dark:border-slate-800/90 pb-4">
                  <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-slate-50">
                    {group.title}
                  </h3>
                  <span className="font-mono text-xs text-teal-700 dark:text-teal-400 tabular-nums">
                    {group.index}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {group.description}
                </p>

                <ul className="mt-6 grid grid-cols-1 gap-y-2.5 sm:grid-cols-2 sm:gap-x-6 text-sm text-slate-800 dark:text-slate-200">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 leading-snug"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
