export type SkillCategory =
  | 'Frontend'
  | 'Backend / Database'
  | 'CMS'
  | 'Tools'
  | 'Other'

export type Skill = {
  id: string
  title: string
  description: string
  category: SkillCategory
  icon: string
}

export const skillCategories: SkillCategory[] = [
  'Frontend',
  'Backend / Database',
  'CMS',
  'Tools',
  'Other',
]

export const skills: Skill[] = [
  { id: 'html', title: 'HTML', description: 'Semantic structure for accessible pages.', category: 'Frontend', icon: '</>' },
  { id: 'css', title: 'CSS', description: 'Layout systems, polish, and responsive craft.', category: 'Frontend', icon: '#' },
  { id: 'javascript', title: 'JavaScript', description: 'Interactive logic and modern ES patterns.', category: 'Frontend', icon: 'JS' },
  { id: 'react', title: 'React', description: 'Component-driven UI and state-aware apps.', category: 'Frontend', icon: 'R' },
  { id: 'typescript', title: 'TypeScript', description: 'Typed interfaces for safer front-end code.', category: 'Frontend', icon: 'TS' },
  { id: 'tailwind', title: 'Tailwind', description: 'Utility-first styling at product speed.', category: 'Frontend', icon: 'Tw' },

  { id: 'firebase', title: 'Firebase', description: 'Auth, hosting, and app backends.', category: 'Backend / Database', icon: 'Fb' },
  { id: 'firestore', title: 'Firestore', description: 'Document data for scalable apps.', category: 'Backend / Database', icon: 'Fs' },
  { id: 'realtime', title: 'Realtime Database', description: 'Live sync for dynamic experiences.', category: 'Backend / Database', icon: 'Rt' },

  { id: 'wordpress', title: 'WordPress', description: 'CMS builds for business websites.', category: 'CMS', icon: 'Wp' },
  { id: 'shopify', title: 'Shopify', description: 'Storefronts, themes, and commerce-ready sites.', category: 'CMS', icon: 'Sh' },

  { id: 'github', title: 'Github', description: 'Code hosting, reviews, and shipping workflows.', category: 'Tools', icon: 'GH' },
  { id: 'vite', title: 'Vite', description: 'Fast tooling for modern front-end apps.', category: 'Tools', icon: 'V' },
  { id: 'canva', title: 'Canva', description: 'Quick visual production when needed.', category: 'Tools', icon: 'Cv' },
  { id: 'vscode', title: 'Visual Studio Code', description: 'Primary editor for daily frontend development.', category: 'Tools', icon: 'VS' },
  { id: 'chatgpt', title: 'ChatGPT', description: 'AI-assisted ideation, debugging, and faster delivery.', category: 'Tools', icon: 'AI' },
  { id: 'cursor', title: 'Cursor AI', description: 'AI-native coding workflow for building and shipping faster.', category: 'Tools', icon: 'Cu' },

  { id: 'responsive', title: 'Responsive Design', description: 'Layouts that hold up across devices.', category: 'Other', icon: 'Rsp' },
  { id: 'seo', title: 'SEO Basics', description: 'Structure and metadata that get found.', category: 'Other', icon: 'SEO' },
  { id: 'perf', title: 'Performance Optimization', description: 'Faster loads, leaner interactions.', category: 'Other', icon: 'P' },
]
