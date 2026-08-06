export type ProjectAccent = 'ring' | 'shimmer' | 'reel' | 'wave' | 'orbit' | 'pulse'

export type Project = {
  id: string
  title: string
  fullTitle: string
  period: string
  description: string
  details: string[]
  highlights?: string[]
  association?: string
  image: string
  tags: string[]
  accent: ProjectAccent
  accentColor: string
  liveUrl?: string
  githubUrl?: string
}

/** Featured projects — append here to extend. */
export const projects: Project[] = [
  {
    id: 'creative-portfolio',
    title: 'Creative Portfolio',
    fullTitle: 'Creative Portfolio – Instagram-Inspired Digital Creative Showcase',
    period: '2026 – 2026',
    description:
      'Instagram-inspired creative portfolio with a dynamic feed, profile grid, video showcase, category filtering, and a story-style browsing experience.',
    details: [
      'Designed and developed a responsive, Instagram-inspired creative portfolio website to showcase my work in social media content, graphic design, and video content.',
      'Built an interactive browsing experience featuring a dynamic feed, randomized content display, responsive profile grid, video showcase, category filtering, and a custom story-style portfolio experience.',
      'Developed using modern web technologies with a focus on responsive design, smooth animations, user experience, and visual presentation.',
    ],
    image: '/projects/creative-portfolio.png',
    tags: ['HTML5', 'CSS', 'JavaScript', 'React'],
    accent: 'ring',
    accentColor: '#ff6b2c',
    liveUrl: 'https://creativeportfolio-mu.vercel.app/',
  },
  {
    id: 'satyendra-portfolio',
    title: 'Satyendra Yadav Portfolio',
    fullTitle: 'Personal Portfolio Website – Satyendra Yadav',
    period: '2026',
    description:
      'Modern responsive professional portfolio with clean UI, Framer Motion animations, and Vercel deployment.',
    details: [
      'Designed and developed a modern and responsive portfolio website to showcase professional experience, technical skills, projects, and certifications.',
      'The website was built with a clean design, smooth animations, and an intuitive user experience, ensuring it works seamlessly across all devices while maintaining high performance and fast loading speeds.',
    ],
    highlights: [
      'Designed a clean and modern user interface with responsive layouts.',
      'Created dedicated sections for About, Skills, Projects, Experience, and Contact.',
      'Added smooth animations and interactive elements using Framer Motion.',
      'Optimized the website for performance, accessibility, and SEO.',
      'Built reusable components for better scalability and maintainability.',
      'Deployed the website on Vercel for fast and reliable hosting.',
    ],
    image: '/projects/satyendra-portfolio.png',
    tags: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    accent: 'wave',
    accentColor: '#2563eb',
    liveUrl: 'https://satyendra-yadav.vercel.app/',
  },
  {
    id: 'pcred-corporate-advisory',
    title: 'PCRED Corporate Advisory',
    fullTitle: 'PCRED Corporate Advisory - Website',
    period: '2025',
    description:
      'End-to-end business website with Firebase hosting, Google Sheets integration, and a React blog dashboard for auto-generated posts.',
    details: [
      'This end-to-end project involved both design and development, using the following technologies:',
    ],
    highlights: [
      'HTML, CSS, Bootstrap – for a responsive and clean UI',
      'JavaScript – for dynamic functionality',
      'Firebase – used for database and hosting',
      'Google Sheets integration – for seamless data accessibility',
      'React.js-based Blog Dashboard – auto-generates blog cards and creates dedicated pages for each blog post',
    ],
    image: '/projects/pcred-corporate-advisory.png',
    tags: ['HTML5', 'Bootstrap', 'JavaScript', 'Firebase', 'React.js', 'SEO'],
    accent: 'shimmer',
    accentColor: '#e6683c',
    liveUrl: 'https://www.pcred.org/',
  },
  {
    id: 'digicrew-media',
    title: 'DigiCrew Media',
    fullTitle: 'Website For Digicrew Media',
    period: 'Nov 2024 – Dec 2024',
    association: 'Associated with PCRED Venture Pvt. Ltd.',
    description:
      'Responsive website for a digital marketing agency with Firebase Realtime Database and interactive animations.',
    details: [
      'Developed a responsive and dynamic website for DigiCrew Media, a digital marketing agency specializing in branding, content creation, and online growth strategies.',
      'Built using HTML, CSS, Bootstrap, and JavaScript, the website ensures a seamless and engaging user experience.',
      'Integrated Firebase Realtime Database for real-time data updates and efficient content management.',
      'Implemented interactive animations to enhance engagement and improve navigation, aligning with the company\'s vision of delivering innovative digital solutions.',
    ],
    image: '/projects/digicrew-media.png',
    tags: ['HTML5', 'CSS', 'Bootstrap', 'JavaScript', 'Firebase'],
    accent: 'reel',
    accentColor: '#bc1888',
    liveUrl: 'https://primacred.vercel.app/',
  },
  {
    id: 'aquarock-buildcon',
    title: 'Aquarock Buildcon',
    fullTitle: 'Website For Aquarock Buildcon',
    period: 'Oct 2024 – Nov 2024',
    association: 'Associated with PCRED Venture Pvt. Ltd.',
    description:
      'Fully responsive real estate advisory website with Firebase Realtime Database and interactive UI animations.',
    details: [
      'Designed and developed a fully responsive website for Aquarock Group, a company specializing in real estate advisory and consulting.',
      'Implemented a dynamic and visually appealing interface using HTML, CSS, Bootstrap, and JavaScript.',
      'Integrated Firebase Realtime Database for seamless data management and real-time updates.',
      'Added interactive animations to enhance user engagement and improve the browsing experience.',
    ],
    image: '/projects/aquarock-buildcon.png',
    tags: ['HTML5', 'CSS', 'Bootstrap', 'JavaScript', 'Firebase'],
    accent: 'wave',
    accentColor: '#38bdf8',
    liveUrl: 'https://aquarocktest.vercel.app/',
  },
  {
    id: 'flying-funds',
    title: 'Flying Funds',
    fullTitle: 'Website For Flying Funds - WIX Studio',
    period: 'Mar 2024 – Apr 2024',
    association: 'Associated with PCRED Venture Pvt. Ltd.',
    description:
      'Landing page built in Wix Studio with responsive design, animations, and Google Sheets form integration.',
    details: [
      'Designed and developed a Landing Page Website using Wix Studio, showcasing expertise in web development, UI/UX design, CMS technologies, and database integration.',
      'The site features a responsive design, dynamic animations, and a seamless user experience.',
      'Integrated custom forms with Google Sheets, enabling real-time data storage and automation for efficient data management.',
    ],
    image: '/projects/flying-funds.png',
    tags: ['Wix Studio', 'Google Sheets', 'UI/UX'],
    accent: 'orbit',
    accentColor: '#fbbf24',
    liveUrl: 'https://sarojabhishek21102.wixstudio.com/my-site-13',
  },
  {
    id: 'pcred-venture',
    title: 'PCRED Venture Pvt. Ltd.',
    fullTitle: 'Website For PCRED Venture Pvt. Ltd.',
    period: 'Mar 2024 – Apr 2024',
    association: 'Associated with PCRED Venture Pvt. Ltd.',
    description:
      'Responsive financial services website with Firebase Realtime Database and optimized interactive elements.',
    details: [
      'Designed and developed a fully responsive website for PCRED, a company specializing in various loan offerings and financial services.',
      'The website provides an intuitive user experience, ensuring seamless navigation across different devices.',
      'Integrated Firebase Realtime Database to enable dynamic content updates and real-time data management.',
      'Implemented interactive elements and optimized performance for a smooth and engaging user experience.',
    ],
    image: '/projects/pcred-venture.png',
    tags: ['HTML5', 'CSS', 'JavaScript', 'Firebase'],
    accent: 'pulse',
    accentColor: '#a3e635',
    liveUrl: 'https://pcredmain.web.app/',
  },
]
