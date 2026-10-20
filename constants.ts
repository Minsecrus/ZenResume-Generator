import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  fullName: "Alex Chen",
  title: "Senior Product Designer",
  email: "alex.chen@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "https://alexchen.design",
  summary: "Product designer with 8 years of experience bridging design and engineering. Focused on design systems, minimalist UI, and accessible product flows for fintech and healthcare teams.",
  experience: [
    {
      id: "exp-1",
      company: "Linear & Co.",
      role: "Lead Product Designer",
      dates: "2021 - Present",
      description: "Led the mobile redesign (+40% retention) and built Polaris, the design system used by 30+ engineers."
    },
    {
      id: "exp-2",
      company: "Vercel Inc.",
      role: "Senior UI/UX Designer",
      dates: "2018 - 2021",
      description: "Shipped the analytics dashboard (50k+ developers) and cut design-to-code handover by 35%."
    },
    {
      id: "exp-3",
      company: "Dropbox",
      role: "Product Designer",
      dates: "2016 - 2018",
      description: "Designed collaborative editing interactions for Paper, guided by research and usability testing."
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "Carnegie Mellon University",
      degree: "Master of Human-Computer Interaction",
      dates: "2018 - 2019",
      description: "Cognitive psychology and voice interfaces. Capstone sponsored by Google."
    },
    {
      id: "edu-2",
      school: "Rhode Island School of Design",
      degree: "BFA in Graphic Design",
      dates: "2014 - 2018",
      description: "Graduated with honors. Focus on typography and interaction design."
    }
  ],
  skills: [
    "Figma", "Adobe CC", "Prototyping", "Design Systems",
    "HTML/CSS", "React", "TypeScript", "Tailwind CSS",
    "User Research", "A/B Testing", "Accessibility", "Data Visualization"
  ],
  projects: [
    {
      id: "proj-1",
      name: "ZenFocus",
      link: "zenfocus.app",
      description: "A minimal macOS focus timer. Product Hunt #1 Product of the Day.",
      technologies: ["Swift", "SwiftUI"]
    },
    {
      id: "proj-2",
      name: "Lumina UI Kit",
      link: "github.com/alexchen/lumina",
      description: "Open-source accessible React components, used by 2,000+ developers.",
      technologies: ["React", "TypeScript", "Tailwind"]
    }
  ]
};