import type { ProjectItem } from '../utils/portfolioLogic';
import projectImage1 from '../assets/images/regenerated_image_1795607571212.png';
import project1Fig2 from '../assets/images/regenerated_image_1795608251860.jpg';
import project1Fig3 from '../assets/images/regenerated_image_1795608560089.jpg';
import project1Fig4 from '../assets/images/regenerated_image_1795609073141.png';
import projectImage4 from '../assets/images/regenerated_image_1795613397350.png';
import project4Fig2 from '../assets/images/regenerated_image_1795614145424.png';
import projectImage2 from '../assets/images/regenerated_image_1795622272979.png';
import project2Fig2 from '../assets/images/regenerated_image_1795628279925.jpg';
import project2Fig3 from '../assets/images/regenerated_image_1795628474563.jpg';
import project2Fig4 from '../assets/images/regenerated_image_1795628477131.png';
import projectImage3 from '../assets/images/regenerated_image_1795631041550.jpg';

/**
 * IMAGE REPLACEMENT GUIDE:
 * Replace any empty string ('') below with a real photo URL or local path
 * (e.g. '/images/mehedi-profile.jpg') to automatically swap out the labeled placeholder.
 */
export const CUSTOM_IMAGE_SOURCES: Record<
  'PROFILE_PHOTO' | 'PROJECT_IMAGE_1' | 'PROJECT_IMAGE_2' | 'PROJECT_IMAGE_3' | 'PROJECT_IMAGE_4',
  string
> = {
  PROFILE_PHOTO: '',
  PROJECT_IMAGE_1: projectImage1,
  PROJECT_IMAGE_2: projectImage2,
  PROJECT_IMAGE_3: projectImage3,
  PROJECT_IMAGE_4: projectImage4,
};

/**
 * EXTRA PROJECT BRIEF PICTURES:
 * Add paths or imported image assets here to populate additional pictures inside each Project Brief modal.
 */
export const CUSTOM_PROJECT_GALLERY_IMAGES: Record<string, string> = {
  PROJECT_1_FIG_2: project1Fig2,
  PROJECT_1_FIG_3: project1Fig3,
  PROJECT_1_FIG_4: project1Fig4,
  PROJECT_2_FIG_2: project2Fig2,
  PROJECT_2_FIG_3: project2Fig3,
  PROJECT_2_FIG_4: project2Fig4,
  PROJECT_3_FIG_2: '',
  PROJECT_3_FIG_3: '',
  PROJECT_3_FIG_4: '',
  PROJECT_4_FIG_2: project4Fig2,
  PROJECT_4_FIG_3: '',
  PROJECT_4_FIG_4: '',
};

export const PERSON_PROFILE = {
  name: 'Mehedi',
  fullNamePlaceholder: 'Mehedi [Last Name]',
  title:
    'Materials Science & Engineering Student | FEA/CFD & CAD Optimization Engineer',
  pitch:
    'Bridging computational mechanics, precision CAD design, and practical venture building from Rajshahi University of Engineering and Technology.',
  location: 'Rajshahi, Bangladesh',
  institution: 'Rajshahi University of Engineering and Technology (RUET)',
  department: 'Department of Materials Science & Engineering (MSE)',
  degree: 'B.Sc. in Materials Science & Engineering',
  graduationWindow: '[2022 – 2026 / Expected Graduation]',
  email: 'mh2321376@gmail.com',
  emailPlaceholderLabel: 'mh2321376@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/mehedi-hasan-812032324',
  linkedinDisplay: 'linkedin.com/in/mehedi-hasan-812032324',
  githubUrl: 'https://github.com/mon944',
  githubDisplay: 'github.com/mon944',
};

export interface SoftwareMarqueeItem {
  name: string;
  discipline: string;
}

export const SOFTWARE_MARQUEE_ITEMS: SoftwareMarqueeItem[] = [
  { name: 'ANSYS Mechanical', discipline: 'FEA' },
  { name: 'ANSYS Fluent', discipline: 'CFD' },
  { name: 'SolidWorks', discipline: 'CAD' },
  { name: 'Autodesk Fusion 360', discipline: 'Parametric 3D' },
  { name: 'MATLAB', discipline: 'Numerical Computing' },
  { name: 'Python', discipline: 'Engineering Scripts' },
  { name: 'ANSYS SpaceClaim', discipline: 'Geometry Prep' },
];

export const ABOUT_CONTENT = {
  paragraphs: [
    'I am an undergraduate Materials Science & Engineering student at RUET focused on turning physical theory into verifiable engineering models. My technical work centers on finite element analysis (FEA), computational fluid dynamics (CFD), and parametric CAD modeling.',
    '[Add 2–3 sentences about your specific materials research interests, favorite engineering challenges, and the entrepreneurial ventures you are building alongside your degree to create independent, real-world value.]',
  ],
  coreSkills: ['ANSYS', 'SolidWorks', 'Fusion 360', 'Applied Math'],
  educationHighlights: [
    {
      label: 'University',
      value: 'Rajshahi University of Engineering and Technology (RUET)',
    },
    {
      label: 'Program',
      value: 'B.Sc. in Materials Science & Engineering (MSE)',
    },
    {
      label: 'Focus Areas',
      value: 'Computational Mechanics, Materials Characterization, Parametric Design',
    },
    {
      label: 'Timeline',
      value: '[2022 – Present · Expected Graduation Year]',
    },
  ],
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-1',
    imageKey: 'PROJECT_IMAGE_1',
    imageAlt: 'ANSYS Mechanical structural topology optimization simulation displaying topology density results',
    coverCaption: 'Primary View — Topology Density & Optimization Result',
    placeholderKind: 'fea',
    category: 'Simulation',
    year: '[2026]',
    title: '[Project Name 1 — Thermal-Structural FEA Study]',
    summary:
      '[Project Description: Briefly summarize the geometry, material model, boundary conditions, and structural or thermal performance insights validated in ANSYS.]',
    tools: ['ANSYS', 'FEA', 'Materials Modeling', 'Applied Math'],
    details: {
      objective:
        '[State the engineering problem you investigated, target safety factor, or thermal/mechanical performance benchmark.]',
      methodology:
        '[Outline mesh convergence strategy, constitutive material parameters, boundary constraints, and solver setup in ANSYS.]',
      outcome:
        '[Share quantitative results such as peak von Mises stress reduction, thermal gradient margin, or validation against analytical calculations.]',
    },
    gallery: [
      {
        key: 'PROJECT_1_FIG_2',
        alt: 'Baseline 3D CAD geometry of the mounting plate and slotted central bracket prior to topology optimization',
        caption: 'Figure 2 — Baseline 3D CAD Geometry',
      },
      {
        key: 'PROJECT_1_FIG_3',
        alt: 'Reconstructed lightweight 3D CAD geometry of the mounting bracket after topology optimization',
        caption: 'Figure 3 — Optimized 3D CAD Geometry',
      },
      {
        key: 'PROJECT_1_FIG_4',
        alt: 'ANSYS Mechanical Static Structural validation displaying total deformation on the optimized monitor mount',
        caption: 'Figure 4 — Total Deformation Validation',
      },
    ],
    repoUrl: '#contact',
  },
  {
    id: 'project-2',
    imageKey: 'PROJECT_IMAGE_2',
    imageAlt: 'SolidWorks multi-view CAD model of a multi-branch flanged pipe mixing manifold for CFD analysis',
    coverCaption: 'Primary View — Multi-Branch Manifold CAD Geometry (Top / Left / Trimetric)',
    placeholderKind: 'cfd',
    category: 'Simulation',
    year: '[2025]',
    title: '[Project Name 2 — CFD Flow & Heat Transfer Model]',
    summary:
      '[Project Description: Describe the fluid domain, laminar or turbulent regime, conjugate heat transfer, and optimization findings modeled in ANSYS Fluent.]',
    tools: ['ANSYS Fluent', 'CFD', 'Numerical Methods'],
    details: {
      objective:
        '[Define the fluid dynamics or heat/mass transfer system analyzed and why computational modeling was needed.]',
      methodology:
        '[Describe governing PDEs, boundary-layer meshing, solver tolerances, and parametric studies in ANSYS Fluent.]',
      outcome:
        '[Summarize pressure-drop improvements, heat dissipation gains, or mathematical agreement with reference data.]',
    },
    gallery: [
      {
        key: 'PROJECT_2_FIG_2',
        alt: 'On-site field installation photograph of the corrugated multi-branch HDPE junction chamber',
        caption: 'Figure 2 — Field Installation Reference',
      },
      {
        key: 'PROJECT_2_FIG_3',
        alt: 'SolidWorks 3D CAD assembly model of a twin-barrel ribbed HDPE retention tank system',
        caption: 'Figure 3 — Twin-Barrel Tank CAD Assembly',
      },
      {
        key: 'PROJECT_2_FIG_4',
        alt: 'Fabricated large-diameter ribbed HDPE detention tank with stiffened end plate and outlet elbow on transport trailer',
        caption: 'Figure 4 — Fabricated HDPE Detention Tank',
      },
    ],
    repoUrl: '#contact',
  },
  {
    id: 'project-3',
    imageKey: 'PROJECT_IMAGE_3',
    imageAlt: 'SolidWorks 3D CAD cutaway assembly comparison of a curved ribbed mechanical bracket housing',
    coverCaption: 'Primary View — Curved Ribbed Bracket CAD Assembly & Section Comparison',
    placeholderKind: 'cad',
    category: 'CAD',
    year: '[2025]',
    title: '[Project Name 3 — Parametric CAD Mechanical Assembly]',
    summary:
      '[Project Description: Highlight the multi-part assembly, design for manufacturing constraints, tolerance considerations, and engineering drawings built in SolidWorks & Fusion 360.]',
    tools: ['SolidWorks', 'Fusion 360', 'GD&T', 'DFM'],
    details: {
      objective:
        '[Explain the functional requirements of the mechanical part or product assembly and constraints on cost, weight, or manufacturability.]',
      methodology:
        '[Detail parametric sketches, top-down assembly mates, interference checks, and fabrication-ready 2D/3D deliverables.]',
      outcome:
        '[Note part count reduction, manufacturability readiness, competition placement, or client prototype feedback.]',
    },
    gallery: [
      {
        key: 'PROJECT_3_FIG_2',
        alt: 'PROJECT_3_FIG_2 — Placeholder for exploded CAD assembly diagram',
        caption: '[Figure 2 — Exploded View & Subcomponent Breakdown]',
      },
      {
        key: 'PROJECT_3_FIG_3',
        alt: 'PROJECT_3_FIG_3 — Placeholder for cross-section view and assembly clearance check',
        caption: '[Figure 3 — Cross-Section & Fit / Tolerance Check]',
      },
      {
        key: 'PROJECT_3_FIG_4',
        alt: 'PROJECT_3_FIG_4 — Placeholder for 2D fabrication drawing with GD&T callouts',
        caption: '[Figure 4 — 2D Engineering Drawing & GD&T Sheet]',
      },
    ],
    repoUrl: '#contact',
  },
  {
    id: 'project-4',
    imageKey: 'PROJECT_IMAGE_4',
    imageAlt: 'ANSYS Mechanical Static Structural total deformation contour plot of a lightweight optimized curved bracket',
    coverCaption: 'Primary View — Total Deformation Contour (ANSYS Static Structural)',
    placeholderKind: 'venture',
    category: 'Venture',
    year: '[2026]',
    title: '[Project Name 4 — Entrepreneurial Venture / Initiative]',
    summary:
      '[Project Description: Explain the income-generating venture, technical service, or product you are building alongside your MSE studies, who it serves, and early traction.]',
    tools: ['Venture Building', 'Product Scoping', 'Client Delivery'],
    details: {
      objective:
        '[Describe the customer pain point you identified and the value proposition behind this venture.]',
      methodology:
        '[Share how you validated demand, structured pricing or workflows, and balanced execution alongside university coursework.]',
      outcome:
        '[Add real traction metrics—clients served, revenue milestones, repeat engagements, or key lessons learned.]',
    },
    gallery: [
      {
        key: 'PROJECT_4_FIG_2',
        alt: 'ANSYS Mechanical Static Structural total deformation contour plot of the baseline solid block prior to topology optimization',
        caption: 'Figure 2 — Baseline Block Total Deformation',
      },
      {
        key: 'PROJECT_4_FIG_3',
        alt: 'PROJECT_4_FIG_3 — Placeholder for workflow diagram or product architecture',
        caption: '[Figure 3 — Delivery Workflow & Process]',
      },
      {
        key: 'PROJECT_4_FIG_4',
        alt: 'PROJECT_4_FIG_4 — Placeholder for traction metrics or milestone summary',
        caption: '[Figure 4 — Milestones & Execution Summary]',
      },
    ],
    repoUrl: '#contact',
  },
];

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export const EXPERIENCE_DATA: ExperienceEntry[] = [
  {
    id: 'exp-scadr',
    role: 'Member · [Your Specific Position, e.g. Design Associate / Executive Member]',
    organization: 'SCADR — Society of Computer Aided Designers at RUET',
    period: '[2024 – Present]',
    location: 'RUET, Rajshahi',
    summary:
      'Active member of RUET’s student CAD and engineering design society, collaborating on computer-aided design challenges, simulation knowledge sharing, and peer workshops.',
    highlights: [
      '[Participated in / co-organized CAD modeling workshops and inter-university design competitions.]',
      '[Collaborated with peers across mechanical and materials disciplines on SolidWorks and Fusion 360 workflows.]',
    ],
  },
  {
    id: 'exp-venture',
    role: 'Founder & Builder',
    organization: '[Your Venture Name / Independent Engineering Practice]',
    period: '[2024 – Present]',
    location: 'Remote · Bangladesh',
    summary:
      'Building income-generating ventures and technical freelance engagements alongside undergraduate engineering studies, translating analytical and CAD/simulation skills into measurable client deliverables.',
    highlights: [
      '[Delivered custom CAD modeling, FEA/CFD simulation support, or digital product work for early clients.]',
      '[Managed project scoping, pricing, execution timelines, and iterative product improvements independently.]',
    ],
  },
  {
    id: 'exp-additional',
    role: '[Role Title — e.g. Undergraduate Lab Member / Competition Team Lead]',
    organization: '[Departmental Society, Research Group, or Student Team Name]',
    period: '[Year – Year]',
    location: 'RUET, Rajshahi',
    summary:
      '[Add a brief 1–2 sentence overview of another academic club, research initiative, or engineering team role you want to highlight.]',
    highlights: [
      '[Key technical contribution, deliverable, or leadership responsibility.]',
      '[Measurable result, presentation, or recognition earned with the team.]',
    ],
  },
];

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  description: string;
  items: string[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'skill-simulation',
    index: '01',
    title: 'Simulation & Analysis',
    description: 'Computational modeling of mechanical stress, thermal gradients, and multiphysics flow.',
    items: [
      'ANSYS Mechanical (FEA)',
      'ANSYS Fluent (CFD)',
      'Conjugate Heat Transfer Modeling',
      'Mesh Convergence & Validation',
      'Thermal & Structural Stress Analysis',
      'Materials Behavior Modeling',
    ],
  },
  {
    id: 'skill-cad',
    index: '02',
    title: 'CAD & Design',
    description: 'Parametric solid modeling, assembly engineering, and fabrication-ready technical drawings.',
    items: [
      'SolidWorks',
      'Autodesk Fusion 360',
      'Parametric Part & Assembly Design',
      '2D Technical Drawings & GD&T',
      'Design for Manufacturing (DFM)',
      'Rapid Prototyping Workflows',
    ],
  },
  {
    id: 'skill-math',
    index: '03',
    title: 'Programming / Math',
    description: 'Quantitative rigor grounding every simulation and numerical model.',
    items: [
      'Applied Mathematics',
      'Differential Equations & PDEs',
      'Numerical Methods & Approximation',
      'Linear Algebra & Matrix Analysis',
      'Data Analysis & Technical Plotting',
      '[MATLAB / Python — Edit as needed]',
    ],
  },
  {
    id: 'skill-business',
    index: '04',
    title: 'Business / Venture',
    description: 'Turning engineering capabilities into practical, income-generating execution.',
    items: [
      'Venture Ideation & Validation',
      'Technical Freelance Scoping',
      'Client Discovery & Communication',
      'Offer Structuring & Pricing',
      'Self-Directed Execution & Operations',
      '[Add Specific Venture Domain]',
    ],
  },
];
