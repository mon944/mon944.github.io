import { ABOUT_CONTENT } from '../data/portfolioData';
import { Reveal } from './Reveal';

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-b border-slate-200 dark:border-slate-800/80 py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Section heading + Bio */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
                About
              </h2>

              <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
                {ABOUT_CONTENT.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Core Skills Tags */}
              <div className="mt-8">
                <h3 className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                  Core Technical Toolkit
                </h3>
                <ul
                  aria-label="Core skills"
                  className="mt-3 flex flex-wrap gap-2.5"
                >
                  {ABOUT_CONTENT.coreSkills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-slate-300 dark:border-slate-700/90 bg-white dark:bg-[#11151C] px-3.5 py-1.5 font-mono text-xs font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Education Specification Column */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#10151E]/95 p-6 sm:p-8 shadow-xs dark:shadow-none">
                <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
                  Education
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Academic foundation in materials, mechanics, and simulation.
                </p>

                <dl className="mt-6 divide-y divide-slate-200 dark:divide-slate-800/90">
                  {ABOUT_CONTENT.educationHighlights.map((item) => (
                    <div key={item.label} className="py-3.5 first:pt-0 last:pb-0">
                      <dt className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100 leading-snug">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
