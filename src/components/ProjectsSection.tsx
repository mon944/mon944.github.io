import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  CUSTOM_IMAGE_SOURCES,
  CUSTOM_PROJECT_GALLERY_IMAGES,
  PROJECTS_DATA,
} from '../data/portfolioData';
import {
  createPlaceholderSvgDataUri,
  filterProjects,
  resolveProjectGallery,
  type ProjectCategory,
  type ProjectItem,
  type ThemeMode,
} from '../utils/portfolioLogic';
import { Reveal } from './Reveal';

const CATEGORIES: ProjectCategory[] = ['All', 'Simulation', 'CAD', 'Venture'];

interface ProjectsSectionProps {
  theme: ThemeMode;
}

export function ProjectsSection({ theme }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const visibleProjects = filterProjects(PROJECTS_DATA, selectedCategory);
  const activeGallery = activeProject
    ? resolveProjectGallery(activeProject, CUSTOM_IMAGE_SOURCES, CUSTOM_PROJECT_GALLERY_IMAGES, theme)
    : [];
  const safeImageIndex =
    activeGallery.length > 0 ? Math.min(activeImageIndex, activeGallery.length - 1) : 0;
  const activeImage = activeGallery[safeImageIndex] ?? null;

  const openProjectBrief = (project: ProjectItem) => {
    setActiveProject(project);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    if (!activeProject) {
      return;
    }
    const totalImages = activeGallery.length;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      } else if (event.key === 'ArrowRight' && totalImages > 1) {
        setActiveImageIndex((prev) => (prev + 1) % totalImages);
      } else if (event.key === 'ArrowLeft' && totalImages > 1) {
        setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, activeGallery.length]);

  const getProjectImageSrc = (project: ProjectItem) => {
    return (
      CUSTOM_IMAGE_SOURCES[project.imageKey] ||
      createPlaceholderSvgDataUri({
        label: project.imageKey,
        subtitle: `${project.category} · Replace with project visual`,
        kind: project.placeholderKind,
        theme,
        width: 800,
        height: 500,
      })
    );
  };

  return (
    <section
      id="projects"
      className="border-b border-slate-200/90 dark:border-slate-800/80 bg-[#EAEFF5]/80 dark:bg-[#0B0F17]/85 py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
                Projects
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Engineering simulations, parametric CAD assemblies, and venture initiatives. Replace bracketed details and labeled images with your completed work.
              </p>
            </div>

            {/* Interactive category filter segmented bar */}
            <div
              role="group"
              aria-label="Filter projects by discipline"
              className="inline-flex w-fit items-center gap-1 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-[#111620] p-1"
            >
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={isSelected}
                    className={`min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-[#1B2330] dark:text-teal-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Project card grid */}
        <div
          data-testid="projects-grid"
          className="mt-8 sm:mt-10 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {visibleProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#10151E] transition-colors duration-200 hover:border-teal-600/60 dark:hover:border-teal-400/50">
                {/* Rectangular rounded image placeholder with consistent 16:10 aspect ratio */}
                <div className="p-4 pb-0">
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-[#11161D]">
                    <img
                      src={getProjectImageSrc(project)}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Quiet unboxed metadata line */}
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 tabular-nums">
                    <span className="text-teal-700 dark:text-teal-400">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
                    {project.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {project.summary}
                  </p>

                  {/* Tech / tools metadata line + inspect trigger */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800/80 pt-4">
                    <div
                      aria-label={`Tools used in ${project.title}`}
                      className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-slate-600 dark:text-slate-400"
                    >
                      {project.tools.map((tool, toolIdx) => (
                        <span key={tool} className="inline-flex items-center gap-2">
                          <span>{tool}</span>
                          {toolIdx < project.tools.length - 1 && (
                            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">
                              /
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => openProjectBrief(project)}
                      aria-label={`Inspect brief for ${project.title}`}
                      className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
                    >
                      <span>Project Brief</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Accessible Project Detail Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F131A] p-6 sm:p-8 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-teal-700 dark:text-teal-400 tabular-nums">
                  {activeProject.category} · {activeProject.year} · {activeImage?.key ?? activeProject.imageKey}
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-1.5 font-display text-2xl font-bold text-slate-950 dark:text-slate-50"
                >
                  {activeProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project brief"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-teal-600 dark:hover:border-teal-400 hover:text-slate-950 dark:hover:text-white transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {activeImage && (
              <div className="mt-5">
                <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#11161D]">
                  <img
                    src={activeImage.src}
                    alt={activeImage.alt}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Caption + slide controls */}
                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate font-mono text-xs text-slate-500 dark:text-slate-400">
                    {activeImage.caption}
                  </p>

                  {activeGallery.length > 1 && (
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="mr-1 font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                        {safeImageIndex + 1} / {activeGallery.length}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex(
                            (safeImageIndex - 1 + activeGallery.length) % activeGallery.length
                          )
                        }
                        aria-label="Previous project image"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-teal-600 dark:hover:border-teal-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex((safeImageIndex + 1) % activeGallery.length)
                        }
                        aria-label="Next project image"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-teal-600 dark:hover:border-teal-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Thumbnail gallery selector */}
                {activeGallery.length > 1 && (
                  <div
                    role="group"
                    aria-label="Project brief image gallery"
                    className="mt-3 grid grid-cols-4 gap-2.5"
                  >
                    {activeGallery.map((img, idx) => {
                      const isSelected = idx === safeImageIndex;
                      return (
                        <button
                          key={img.key}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          aria-label={`View image ${idx + 1} of ${activeGallery.length}: ${img.caption}`}
                          aria-pressed={isSelected}
                          className={`group relative aspect-[16/10] overflow-hidden rounded-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                            isSelected
                              ? 'border-2 border-teal-600 dark:border-teal-400 ring-2 ring-teal-500/35 opacity-100'
                              : 'border border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-400 dark:hover:border-slate-600'
                          }`}
                        >
                          <img
                            src={img.src}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <dl className="mt-6 divide-y divide-slate-200 dark:divide-slate-800/80 text-sm">
              <div className="py-3.5 first:pt-0">
                <dt className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                  Objective
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200 leading-relaxed">
                  {activeProject.details.objective}
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                  Methodology
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200 leading-relaxed">
                  {activeProject.details.methodology}
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                  Outcome &amp; Metrics
                </dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-200 leading-relaxed">
                  {activeProject.details.outcome}
                </dd>
              </div>
              <div className="py-3.5 last:pb-0">
                <dt className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                  Tools &amp; Methods
                </dt>
                <dd className="mt-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
                  {activeProject.tools.join('  ·  ')}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800 pt-5">
              <a
                href="#contact"
                onClick={() => setActiveProject(null)}
                className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-teal-600 dark:bg-teal-500 px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 hover:bg-teal-700 dark:hover:bg-teal-400 transition-colors whitespace-nowrap"
              >
                Discuss This Project
              </a>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
