import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoHref,
  createPlaceholderSvgDataUri,
  filterProjects,
  resolveInitialTheme,
  resolveProjectGallery,
  validateContactForm,
  type ProjectItem,
} from './portfolioLogic';

const sampleProjects: ProjectItem[] = [
  {
    id: 'p1',
    imageKey: 'PROJECT_IMAGE_1',
    imageAlt: 'FEA placeholder',
    placeholderKind: 'fea',
    category: 'Simulation',
    year: '2026',
    title: '[Thermal FEA Study]',
    summary: '[Summary 1]',
    tools: ['ANSYS', 'FEA'],
    details: { objective: '[Obj]', methodology: '[Method]', outcome: '[Outcome]' },
  },
  {
    id: 'p2',
    imageKey: 'PROJECT_IMAGE_2',
    imageAlt: 'CAD placeholder',
    placeholderKind: 'cad',
    category: 'CAD',
    year: '2025',
    title: '[CAD Assembly]',
    summary: '[Summary 2]',
    tools: ['SolidWorks'],
    details: { objective: '[Obj]', methodology: '[Method]', outcome: '[Outcome]' },
  },
  {
    id: 'p3',
    imageKey: 'PROJECT_IMAGE_3',
    imageAlt: 'Venture placeholder',
    placeholderKind: 'venture',
    category: 'Venture',
    year: '2026',
    title: '[Venture Name]',
    summary: '[Summary 3]',
    tools: ['Strategy'],
    details: { objective: '[Obj]', methodology: '[Method]', outcome: '[Outcome]' },
  },
];

test('resolveInitialTheme defaults to dark and respects explicit light/dark values', () => {
  assert.equal(resolveInitialTheme(null), 'dark');
  assert.equal(resolveInitialTheme(undefined), 'dark');
  assert.equal(resolveInitialTheme('invalid'), 'dark');
  assert.equal(resolveInitialTheme('light'), 'light');
  assert.equal(resolveInitialTheme('dark'), 'dark');
});

test('filterProjects returns all items for All and subsets for specific categories', () => {
  assert.equal(filterProjects(sampleProjects, 'All').length, 3);
  const sim = filterProjects(sampleProjects, 'Simulation');
  assert.equal(sim.length, 1);
  assert.equal(sim[0].id, 'p1');
  const cad = filterProjects(sampleProjects, 'CAD');
  assert.equal(cad.length, 1);
  assert.equal(cad[0].id, 'p2');
});

test('validateContactForm rejects empty or invalid inputs without bypassing', () => {
  const emptyResult = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.message);

  const badEmailResult = validateContactForm({
    name: 'Arif',
    email: 'not-an-email',
    subject: 'Hi',
    message: 'Interested in collaborating on a CAD assembly.',
  });
  assert.equal(badEmailResult.valid, false);
  assert.ok(badEmailResult.errors.email);
  assert.equal(badEmailResult.errors.name, undefined);
  assert.equal(badEmailResult.errors.message, undefined);
});

test('validateContactForm accepts valid input and buildMailtoHref encodes parameters cleanly', () => {
  const values = {
    name: 'Nadia Rahman',
    email: 'nadia@example.com',
    subject: 'FEA Consulting Inquiry',
    message: 'Hello Mehedi, would like to discuss a thermal stress model in ANSYS.',
  };
  const validResult = validateContactForm(values);
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});

  const href = buildMailtoHref('mehedi@example.com', values);
  assert.ok(href.startsWith('mailto:mehedi%40example.com?'));
  assert.ok(href.includes('subject=FEA%20Consulting%20Inquiry'));
  assert.ok(href.includes('Name%3A%20Nadia%20Rahman'));
  assert.equal(href.includes('+'), false);
});

test('createPlaceholderSvgDataUri produces valid SVG data URI containing the requested label', () => {
  const uri = createPlaceholderSvgDataUri({
    label: 'PROFILE_PHOTO',
    subtitle: 'Replace with circular portrait',
    kind: 'profile',
    theme: 'dark',
  });
  assert.ok(uri.startsWith('data:image/svg+xml;charset=utf-8,'));
  const decoded = decodeURIComponent(uri.replace('data:image/svg+xml;charset=utf-8,', ''));
  assert.ok(decoded.includes('PROFILE_PHOTO'));
  assert.ok(decoded.includes('<svg'));
  assert.ok(decoded.includes('</svg>'));
});

test('resolveProjectGallery combines custom cover, custom gallery items, and SVG fallbacks in order', () => {
  const projectWithGallery: ProjectItem = {
    ...sampleProjects[0],
    coverCaption: 'Primary Result Overview',
    gallery: [
      {
        key: 'PROJECT_1_FIG_2',
        alt: 'Mesh refinement study',
        caption: 'Figure 2 — Mesh Refinement',
      },
      {
        key: 'PROJECT_1_FIG_3',
        alt: 'Stress distribution contour',
        caption: 'Figure 3 — Stress Contour',
      },
    ],
  };

  const resolved = resolveProjectGallery(
    projectWithGallery,
    { PROJECT_IMAGE_1: '/custom-cover.png' },
    { PROJECT_1_FIG_2: '/custom-mesh.png', PROJECT_1_FIG_3: '' },
    'dark'
  );

  assert.equal(resolved.length, 3);
  assert.equal(resolved[0].src, '/custom-cover.png');
  assert.equal(resolved[0].caption, 'Primary Result Overview');
  assert.equal(resolved[1].src, '/custom-mesh.png');
  assert.equal(resolved[1].caption, 'Figure 2 — Mesh Refinement');
  assert.ok(resolved[2].src.startsWith('data:image/svg+xml;charset=utf-8,'));
  assert.ok(decodeURIComponent(resolved[2].src).includes('PROJECT_1_FIG_3'));
});
