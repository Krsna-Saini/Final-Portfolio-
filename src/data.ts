export const profile = {
  name: 'Krishna Saini',
  firstName: 'Krishna',
  roles: ['Full-Stack Developer', 'Problem Solver', 'Dreamer', 'CS Engineer @ IIT (BHU)'],
  title: 'Full-Stack Developer',
  location: 'IIT (BHU) Varanasi, India',
  tagline: 'Developer • Problem Solver • Dreamer',
  heroBlurb:
    'I turn real-world problems into impactful digital solutions — from sleek frontends to robust, scalable backends. I build applications that are not only functional, but meaningful.',
  about: [
    "I'm Krishna Saini, a software developer passionate about crafting useful technology. I'm currently pursuing engineering at IIT (BHU) Varanasi and have built everything from appointment-booking applications to real-time chat platforms and file-handling tools, using the latest technologies.",
    "With hands-on experience in technologies like Next.js, React, MongoDB and Firebase, I've developed chat platforms, task managers and collaborative tools that blend performance with user experience. I'm currently exploring advanced concepts like real-time communication, AI integration and scalable cloud architectures.",
    "I'm deeply committed to my craft and always looking for opportunities to grow, contribute and build something valuable.",
  ],
  resume: '/resume.pdf',
  email: 'krishnasaini27169@gmail.com',
  whatsapp: 'https://wa.me/9675017530',
}

export const stats = [
  { value: 4, suffix: '+', label: 'Shipped Projects' },
  { value: 3, suffix: '', label: 'Years Coding' },
  { value: 1, suffix: '', label: 'Big-Tech Internship' },
  { value: 100, suffix: '%', label: 'Curiosity' },
]

export type Social = { name: string; url: string; icon: string }
export const socials: Social[] = [
  { name: 'GitHub', url: 'https://github.com/Krsna-Saini', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/krishna-saini-1b487629a/', icon: 'linkedin' },
  { name: 'X', url: 'https://x.com/_Krishna_Saini', icon: 'twitter' },
  { name: 'Instagram', url: 'https://www.instagram.com/_krishna_saini_____', icon: 'instagram' },
  { name: 'Email', url: 'mailto:krishnasaini27169@gmail.com', icon: 'mail' },
]

export type SkillGroup = { title: string; accent: string; items: string[] }
export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    accent: 'violet',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'Framer Motion'],
  },
  {
    title: 'Backend',
    accent: 'cyan',
    items: ['Node.js', 'Express.js', 'GraphQL', 'REST APIs', 'Socket.IO', 'Firebase'],
  },
  {
    title: 'Data & Cloud',
    accent: 'magenta',
    items: ['MongoDB', 'PostgreSQL', 'Vercel', 'Cloud Telemetry', 'KQL', 'Git'],
  },
  {
    title: 'Foundations',
    accent: 'violet',
    items: ['C++', 'DSA', 'Competitive Programming', 'System Design', 'Problem Solving'],
  },
]

export const marqueeTech = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'GraphQL', 'Tailwind CSS',
  'Firebase', 'Express.js', 'Socket.IO', 'C++', 'Three.js', 'Framer Motion', 'Vercel',
]

export type Experience = {
  role: string
  company: string
  period: string
  location: string
  summary: string
  highlights: string[]
  stack: string[]
}
export const experiences: Experience[] = [
  {
    role: 'Software Engineering Intern',
    company: 'Microsoft',
    period: '2025',
    location: 'M365 Copilot',
    summary:
      'Owned an end-to-end performance investigation of the ESS agent inside M365 Copilot — measuring, diagnosing and attributing latency across the mobile and web experiences at production scale.',
    highlights: [
      'Ran structured manual testing of the ESS agent across web and mobile, isolating high-latency query patterns and confirming latency was platform-agnostic rather than mobile-specific.',
      'Onboarded a dynamic agent (no static ID) onto the CIE performance dashboard by pioneering a schema-name filter over the Custom Usage Dataset (CUD) — and shipped a reference query the platform team adopted.',
      'Correlated telemetry across three data sources on the same conversation turns, proving first-token streaming was healthy (Client-FTR ≈ Sydney-FTR, within ~0.5s) and pinpointing the connected-agent path as the true bottleneck.',
      'Decomposed connected-agent latency into measured spans, showing plan-creation, universal search and flow execution as the dominant contributors — and drove a data-backed recommendation to migrate ESS to the new MCS experience for a reliable perf baseline.',
    ],
    stack: ['KQL', 'Telemetry', 'Performance', 'Data Analysis', 'M365 Copilot'],
  },
]

export type TimelineItem = {
  year: string
  title: string
  points: string[]
}
export const timeline: TimelineItem[] = [
  {
    year: '2023',
    title: 'Where it began',
    points: [
      'Started my coding journey right after entering IIT (BHU) by learning C++.',
      'Explored the fundamentals of programming and wrote my first console-based projects.',
    ],
  },
  {
    year: 'Early 2024',
    title: 'Sharpening the blade',
    points: [
      'Took a deep dive into Competitive Programming and Data Structures & Algorithms in C++.',
      'Participated in contests and sharpened my problem-solving instincts.',
    ],
  },
  {
    year: 'Late 2024',
    title: 'Going full-stack',
    points: [
      'Transitioned into full-stack development, building real-world applications end to end.',
      'Shipped a real-time chat app and a lawyer-appointment system.',
      'Mastered responsive design and advanced UI/UX with Tailwind CSS and ShadCN UI.',
      'Integrated GraphQL, MongoDB and Express.js into production projects.',
    ],
  },
  {
    year: '2025',
    title: 'Big-tech internship',
    points: [
      'Joined Microsoft as a Software Engineering Intern on M365 Copilot.',
      'Led a production-scale latency investigation of the ESS agent and drove a data-backed migration recommendation.',
    ],
  },
]

export type ProjectFeature = { title: string; description: string }
export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  overview: string[]
  image: string
  url: string
  repoUrl?: string
  tags: string[]
  stack: string[]
  features: ProjectFeature[]
  year: string
  role: string
  accent: 'violet' | 'cyan' | 'magenta'
}
export const projects: Project[] = [
  {
    slug: 'notesmania',
    name: 'NotesMania',
    tagline: 'Notes, organized.',
    description:
      'A platform for students to organize and share notes and academic content — built to replace the chaos of unorganized WhatsApp groups.',
    overview: [
      'NotesMania started from a very real pain point: academic material scattered across dozens of unorganized WhatsApp groups, impossible to search and easy to lose.',
      'It gives students one structured hub to upload, categorize and discover notes, assignments and resources — now enhanced with AI-powered insights that summarize and surface the right material fast.',
    ],
    image: '/images/notesmania.png',
    url: 'https://notes-mania-frontend.vercel.app/',
    repoUrl: 'https://github.com/Krsna-Saini',
    tags: ['Next.js', 'MongoDB', 'Tailwind'],
    stack: ['Next.js', 'MongoDB', 'Tailwind CSS', 'AI Integration', 'Vercel'],
    features: [
      { title: 'Organized sharing', description: 'Structured groups and categories replace messy chat threads so nothing gets lost.' },
      { title: 'AI-powered insights', description: 'Summaries and smart search help students find and understand material faster.' },
      { title: 'Collaborative hub', description: 'Share notes, academic details and assignments in one place, together.' },
    ],
    year: '2024',
    role: 'Full-stack — design, frontend & backend',
    accent: 'violet',
  },
  {
    slug: 'nexus',
    name: 'Nexus',
    tagline: 'Productivity, streamlined.',
    description:
      'A productivity platform to manage tasks, deadlines and content efficiently — designed to streamline organization for everyone.',
    overview: [
      'Nexus is a team productivity workspace that turns scattered to-dos and deadlines into a single, calm board.',
      'It focuses on flow: fast task capture, clear stages (To Do → In Progress → Review → Done) and a layout that stays readable even when a project gets busy.',
    ],
    image: '/images/nexus.png',
    url: 'https://nexus-two-snowy.vercel.app/',
    repoUrl: 'https://github.com/Krsna-Saini',
    tags: ['React', 'Node.js', 'Express'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    features: [
      { title: 'Kanban workflow', description: 'Drag work across clear stages with priorities, tags and assignees.' },
      { title: 'Deadline tracking', description: 'Never miss a date — every task carries its own timeline and status.' },
      { title: 'Built for teams', description: 'Shared boards keep everyone aligned on what is happening and what is next.' },
    ],
    year: '2024',
    role: 'Full-stack — architecture & UI',
    accent: 'cyan',
  },
  {
    slug: 'ai-chat',
    name: 'AI Chat Application',
    tagline: 'Conversations, supercharged.',
    description:
      'An AI-powered chat platform featuring group chat, audio messages, attachments and follow-up prompts with full message context.',
    overview: [
      'A real-time chat platform that blends human conversation with an AI assistant that actually remembers context.',
      'Beyond text, it supports group chats, audio messages and attachments — with context-aware follow-ups so the assistant stays useful across a whole thread.',
    ],
    image: '/images/chatassistant.png',
    url: 'https://chatgpt-gray-xi.vercel.app/',
    repoUrl: 'https://github.com/Krsna-Saini',
    tags: ['AI', 'Socket.IO', 'React'],
    stack: ['React', 'Socket.IO', 'Node.js', 'AI', 'MongoDB'],
    features: [
      { title: 'Context-aware AI', description: 'Follow-up prompts understand the full conversation, not just the last line.' },
      { title: 'Rich messaging', description: 'Group chat, audio messages and file attachments in a smooth real-time UI.' },
      { title: 'Real-time sync', description: 'Socket.IO keeps every participant instantly in sync.' },
    ],
    year: '2024',
    role: 'Full-stack — realtime & AI integration',
    accent: 'magenta',
  },
  {
    slug: 'better-call-saul',
    name: 'Better Call Saul',
    tagline: 'Legal help, booked.',
    description:
      'A modern full-stack platform where users book appointments with lawyers and advocates showcase their expertise.',
    overview: [
      'Better Call Saul connects people who need legal help with advocates who can provide it — end to end.',
      'Clients browse expertise and book appointments; advocates get a profile to showcase their practice. Powered by a GraphQL API over MongoDB for precise, efficient data fetching.',
    ],
    image: '/images/bettercallsaul.png',
    url: 'https://better-call-saul-frontend.vercel.app/',
    repoUrl: 'https://github.com/Krsna-Saini',
    tags: ['Full-Stack', 'GraphQL', 'MongoDB'],
    stack: ['React', 'GraphQL', 'MongoDB', 'Node.js', 'Express'],
    features: [
      { title: 'Appointment booking', description: 'Clients find the right advocate and book a slot in a few clicks.' },
      { title: 'Advocate profiles', description: 'Lawyers showcase expertise, experience and availability.' },
      { title: 'GraphQL API', description: 'Precise, efficient data fetching with a typed GraphQL layer.' },
    ],
    year: '2024',
    role: 'Full-stack — GraphQL API & UI',
    accent: 'violet',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Journey', href: '#journey' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]
