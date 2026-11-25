export type ThemeMode = 'dark' | 'light';

export type ProjectCategory = 'All' | 'Simulation' | 'CAD' | 'Venture';

export type PlaceholderKind = 'profile' | 'fea' | 'cfd' | 'cad' | 'venture';

export interface ProjectGallerySlot {
  key: string;
  alt: string;
  caption: string;
  placeholderKind?: PlaceholderKind;
}

export interface ResolvedGalleryImage {
  key: string;
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectItem {
  id: string;
  imageKey: 'PROJECT_IMAGE_1' | 'PROJECT_IMAGE_2' | 'PROJECT_IMAGE_3' | 'PROJECT_IMAGE_4';
  imageAlt: string;
  coverCaption?: string;
  placeholderKind: PlaceholderKind;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  title: string;
  summary: string;
  tools: string[];
  details: {
    objective: string;
    methodology: string;
    outcome: string;
  };
  gallery?: ProjectGallerySlot[];
  repoUrl?: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormValues, string>>;
}

export interface PlaceholderImageOptions {
  label: string;
  subtitle: string;
  kind: PlaceholderKind;
  theme: ThemeMode;
  width?: number;
  height?: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Resolves the active theme from persisted storage.
 * Always defaults to 'dark' per portfolio design specification.
 */
export function resolveInitialTheme(storedValue: string | null | undefined): ThemeMode {
  if (storedValue === 'light' || storedValue === 'dark') {
    return storedValue;
  }
  return 'dark';
}

/**
 * Filters projects by category while preserving original order.
 */
export function filterProjects(
  projects: readonly ProjectItem[],
  category: ProjectCategory
): ProjectItem[] {
  if (category === 'All') {
    return [...projects];
  }
  return projects.filter((project) => project.category === category);
}

/**
 * Validates contact form fields without silently substituting fallbacks.
 */
export function validateContactForm(values: ContactFormValues): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (trimmedMessage.length < 10) {
    errors.message = 'Please include a short message (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Constructs a properly encoded mailto: URI from validated contact inputs.
 */
export function buildMailtoHref(recipientEmail: string, values: ContactFormValues): string {
  const cleanRecipient = recipientEmail.trim();
  const subjectText = values.subject.trim() || `Portfolio Inquiry from ${values.name.trim()}`;
  const bodyLines = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    '',
    values.message.trim(),
  ];

  const params = new URLSearchParams({
    subject: subjectText,
    body: bodyLines.join('\n'),
  });

  // URLSearchParams encodes spaces as '+', which some mail clients display literally.
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${encodeURIComponent(cleanRecipient)}?${query}`;
}

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderPlaceholderIcon(kind: PlaceholderKind, stroke: string, accent: string): string {
  switch (kind) {
    case 'profile':
      return `
        <circle cx="0" cy="-16" r="24" fill="none" stroke="${stroke}" stroke-width="2" />
        <path d="M-40 42 C-36 16, -18 8, 0 8 C18 8, 36 16, 40 42" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" />
        <circle cx="0" cy="-16" r="32" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="4 5" opacity="0.7" />
      `;
    case 'fea':
      return `
        <polygon points="0,-38 36,-18 36,22 0,42 -36,22 -36,-18" fill="none" stroke="${stroke}" stroke-width="1.75" />
        <line x1="0" y1="-38" x2="0" y2="42" stroke="${accent}" stroke-width="1.25" opacity="0.85" />
        <line x1="-36" y1="-18" x2="36" y2="22" stroke="${stroke}" stroke-width="1" opacity="0.55" />
        <line x1="36" y1="-18" x2="-36" y2="22" stroke="${stroke}" stroke-width="1" opacity="0.55" />
        <circle cx="0" cy="2" r="4" fill="${accent}" />
      `;
    case 'cfd':
      return `
        <path d="M-56 -20 C-24 -20, -18 -34, 10 -34 C34 -34, 42 -20, 56 -20" fill="none" stroke="${accent}" stroke-width="1.8" stroke-linecap="round" />
        <path d="M-56 0 C-20 0, -14 -8, 12 -8 C34 -8, 42 0, 56 0" fill="none" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" />
        <path d="M-56 20 C-24 20, -18 32, 10 32 C34 32, 42 20, 56 20" fill="none" stroke="${stroke}" stroke-width="1.5" opacity="0.7" stroke-linecap="round" />
        <ellipse cx="-2" cy="0" rx="14" ry="8" fill="none" stroke="${accent}" stroke-width="1.75" />
      `;
    case 'cad':
      return `
        <polygon points="0,-36 38,-14 0,8 -38,-14" fill="none" stroke="${accent}" stroke-width="1.75" />
        <polyline points="-38,-14 -38,24 0,44 38,24 38,-14" fill="none" stroke="${stroke}" stroke-width="1.75" />
        <line x1="0" y1="8" x2="0" y2="44" stroke="${stroke}" stroke-width="1.5" />
        <circle cx="0" cy="-14" r="6" fill="none" stroke="${stroke}" stroke-width="1.25" stroke-dasharray="2 3" />
      `;
    case 'venture':
      return `
        <rect x="-42" y="-28" width="84" height="56" rx="4" fill="none" stroke="${stroke}" stroke-width="1.75" />
        <polyline points="-28,14 -10,-4 6,6 28,-16" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <polyline points="18,-16 28,-16 28,-6" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      `;
  }
}

/**
 * Generates a crisp, hermetic SVG data URI for placeholder <img> tags.
 * Allows easy visual identification and zero broken-image risk until replaced with real photos.
 */
export function createPlaceholderSvgDataUri(options: PlaceholderImageOptions): string {
  const { label, subtitle, kind, theme } = options;
  const width = options.width ?? (kind === 'profile' ? 400 : 800);
  const height = options.height ?? (kind === 'profile' ? 400 : 500);

  const isDark = theme === 'dark';
  const bgStart = isDark ? '#161E29' : '#EEF3F7';
  const bgEnd = isDark ? '#0F151E' : '#E2E9F0';
  const gridStroke = isDark ? 'rgba(148,163,184,0.12)' : 'rgba(15,23,42,0.08)';
  const iconStroke = isDark ? '#D6E0EB' : '#334155';
  const accent = isDark ? '#2DD4BF' : '#0D9488';
  const textPrimary = isDark ? '#F1F5F9' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#475569';
  const badgeFill = isDark ? 'rgba(15,23,42,0.82)' : 'rgba(255,255,255,0.88)';
  const badgeStroke = isDark ? 'rgba(45,212,191,0.45)' : 'rgba(13,148,136,0.4)';

  const cx = Math.round(width / 2);
  const iconY = kind === 'profile' ? Math.round(height * 0.41) : Math.round(height * 0.43);
  const labelY = kind === 'profile' ? Math.round(height * 0.72) : Math.round(height * 0.72);
  const subY = kind === 'profile' ? Math.round(height * 0.81) : Math.round(height * 0.81);
  const labelFontSize = kind === 'profile' ? 16 : 20;
  const subFontSize = kind === 'profile' ? 12 : 14;
  const pillW = kind === 'profile' ? 190 : 250;
  const pillH = kind === 'profile' ? 32 : 36;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgStart}" />
      <stop offset="100%" stop-color="${bgEnd}" />
    </linearGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="${gridStroke}" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />
  <g transform="translate(${cx}, ${iconY})">
    ${renderPlaceholderIcon(kind, iconStroke, accent)}
  </g>
  <rect x="${cx - pillW / 2}" y="${labelY - pillH / 2 - 4}" width="${pillW}" height="${pillH}" rx="6" fill="${badgeFill}" stroke="${badgeStroke}" stroke-width="1.25" />
  <text x="${cx}" y="${labelY + 2}" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="${labelFontSize}" font-weight="600" letter-spacing="1.2" fill="${textPrimary}">${escapeXml(label)}</text>
  <text x="${cx}" y="${subY + 4}" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="${subFontSize}" fill="${textMuted}">${escapeXml(subtitle)}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Resolves the full ordered image list for a project brief (primary cover + optional extra gallery slots),
 * replacing any empty entries with crisp, labeled SVG placeholders.
 */
export function resolveProjectGallery(
  project: ProjectItem,
  customCoverImages: Record<string, string>,
  customGalleryImages: Record<string, string>,
  theme: ThemeMode
): ResolvedGalleryImage[] {
  const coverSrc =
    customCoverImages[project.imageKey] ||
    createPlaceholderSvgDataUri({
      label: project.imageKey,
      subtitle: `${project.category} · Replace with project visual`,
      kind: project.placeholderKind,
      theme,
      width: 800,
      height: 500,
    });

  const images: ResolvedGalleryImage[] = [
    {
      key: project.imageKey,
      src: coverSrc,
      alt: project.imageAlt,
      caption: project.coverCaption ?? 'Primary overview',
    },
  ];

  for (const slot of project.gallery ?? []) {
    const src =
      customGalleryImages[slot.key] ||
      createPlaceholderSvgDataUri({
        label: slot.key,
        subtitle: `${project.category} · Additional brief visual`,
        kind: slot.placeholderKind ?? project.placeholderKind,
        theme,
        width: 800,
        height: 500,
      });

    images.push({
      key: slot.key,
      src,
      alt: slot.alt,
      caption: slot.caption,
    });
  }

  return images;
}
