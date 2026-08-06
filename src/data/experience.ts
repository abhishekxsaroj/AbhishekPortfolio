export type Milestone = {
  id: string
  company: string
  role: string
  location?: string
  period: string
  employmentType?: string
  summary: string
  highlights: string[]
  skills?: string[]
}

export const milestones: Milestone[] = [
  {
    id: 'amazon',
    company: 'Amazon',
    role: 'Logistics Associate',
    employmentType: 'Full-time',
    location: 'Dubai, United Arab Emirates · On-site',
    period: 'Dec 2025 – Present',
    summary:
      'Supporting warehouse and fulfillment operations for Amazon Now in a high-volume e-commerce environment.',
    highlights: [
      'Supporting warehouse and fulfillment operations for Amazon Now, ensuring accurate inventory handling and efficient order processing.',
      'Receiving inbound shipments and verifying products against purchase orders and documentation.',
      'Managing inventory through cycle counts, stock reconciliation, and inventory accuracy checks.',
      'Utilizing Warehouse Management Systems (WMS) to track inventory movement and maintain stock records.',
      'Ensuring compliance with safety standards and operational procedures while collaborating with teams to meet fulfillment targets.',
    ],
  },
  {
    id: 'pcred-developer',
    company: 'PCRED Venture Pvt. Ltd.',
    role: 'Website Developer',
    employmentType: 'Full-time',
    location: 'Mumbai, Maharashtra, India · On-site',
    period: 'Jun 2024 – Oct 2025',
    summary:
      'Built and shipped production websites for business clients — from responsive front-end delivery to Firebase-backed deployments.',
    highlights: [
      'Developed and launched responsive business websites using HTML, CSS, Bootstrap, JavaScript, and related frontend tools.',
      'Integrated Firebase for hosting, realtime data, and reliable content workflows.',
      'Collaborated on end-to-end delivery spanning UI implementation, content structure, and live deployment.',
      'Applied responsive design and UX best practices to ship polished, client-ready sites.',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'Firebase'],
  },
  {
    id: 'pcred-intern',
    company: 'PCRED Venture Pvt. Ltd.',
    role: 'Web Development Intern',
    employmentType: 'Internship',
    location: 'Mumbai, Maharashtra, India · On-site',
    period: 'Mar 2024 – Jun 2024',
    summary:
      'Independently developed and launched websites while learning full delivery — from build to hosting.',
    highlights: [
      'Independently developed and launched websites using HTML, CSS, Bootstrap, and Firebase.',
      'Implemented realtime database management by integrating Firebase with Google Sheets for seamless data updates.',
      'Managed end-to-end deployment, including hosting on BigRock and Firebase, ensuring optimal performance and reliability.',
      'Applied best practices in responsive design and user experience to deliver professional, high-quality websites.',
    ],
    skills: ['HTML5', 'CSS', 'Bootstrap', 'Firebase', 'Google Sheets'],
  },
  {
    id: 'marketing-burp',
    company: 'Marketing Burp',
    role: 'Search Engine Optimization Analyst',
    location: 'Navi Mumbai, Maharashtra, India',
    period: 'Jun 2023 – Jun 2024',
    summary:
      'Focused on search visibility, content structure, and SEO fundamentals for digital growth.',
    highlights: [
      'Applied Search Engine Optimization practices to improve discoverability and content structure.',
      'Supported digital marketing workflows with SEO-focused analysis and recommendations.',
    ],
    skills: ['Search Engine Optimization (SEO)'],
  },
  {
    id: 'banyan-tree',
    company: 'The Banyan Tree English School',
    role: 'Computer Teacher',
    employmentType: 'Part-time',
    location: 'Mumbai, Maharashtra, India',
    period: 'Jul 2023 – Feb 2024',
    summary:
      'Taught computer fundamentals part-time, building clear explanations and structured learning sessions.',
    highlights: [
      'Delivered part-time computer education for students in a school setting.',
      'Translated technical concepts into accessible lessons and practical exercises.',
    ],
  },
]
