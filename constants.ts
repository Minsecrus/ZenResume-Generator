import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  fullName: "Alex Chen",
  title: "Senior Product Designer",
  email: "alex.chen@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "https://alexchen.design",
  summary: "Award-winning product designer with over 8 years of experience in bridging the gap between design and engineering. Specialized in building scalable design systems, minimalist UI, and accessible UX. Proven track record of leading cross-functional teams and delivering high-impact projects for fintech and healthcare startups.",
  experience: [
    {
      id: "exp-1",
      company: "Linear & Co.",
      role: "Lead Product Designer",
      dates: "2021 - Present",
      description: "Spearheaded the redesign of the core mobile application, resulting in a 40% increase in user retention. Established a comprehensive design system (Polaris) used by 30+ engineers and designers. Mentored junior designers and conducted weekly design critiques to elevate team output."
    },
    {
      id: "exp-2",
      company: "Vercel Inc.",
      role: "Senior UI/UX Designer",
      dates: "2018 - 2021",
      description: "Designed and launched the analytics dashboard feature, utilized by 50k+ developers. Collaborated closely with frontend engineers to ensure pixel-perfect implementation using React and Tailwind CSS. Reduced design-to-code handover time by 35% through improved documentation workflows."
    },
    {
      id: "exp-3",
      company: "Dropbox",
      role: "Product Designer",
      dates: "2016 - 2018",
      description: "Contributed to the 'Paper' product team, focusing on collaborative text editing interactions. Conducted extensive user research and usability testing that informed key feature iterations."
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "Carnegie Mellon University",
      degree: "Master of Human-Computer Interaction",
      dates: "2018 - 2019",
      description: "Specialized in Cognitive Psychology and Voice User Interfaces. Capstone project sponsored by Google."
    },
    {
      id: "edu-2",
      school: "Rhode Island School of Design",
      degree: "BFA in Graphic Design",
      dates: "2014 - 2018",
      description: "Graduated with Honors. Focus on Typography and Interaction Design. President of the Design & Tech Club."
    }
  ],
  skills: [
    // Design
    "Figma", "Adobe CC", "Prototyping", "Design Systems", "Motion Design", "Spline (3D)",
    // Technical
    "HTML/CSS", "React", "TypeScript", "Tailwind CSS", "Git/GitHub", "Storybook",
    // Strategy & Research
    "User Research", "A/B Testing", "Agile/Scrum", "Accessibility (WCAG)", "Data Visualization"
  ],
  projects: [
    {
      id: "proj-1",
      name: "ZenFocus",
      link: "zenfocus.app",
      description: "A minimal productivity timer app for macOS that helps users maintain flow state. Featured on Product Hunt #1 Product of the Day.",
      technologies: ["Swift", "SwiftUI", "CoreData"]
    },
    {
      id: "proj-2",
      name: "Lumina UI Kit",
      link: "github.com/alexchen/lumina",
      description: "An open-source React component library focused on accessibility and dark mode support. Used by 2,000+ developers.",
      technologies: ["React", "TypeScript", "Tailwind", "Radix UI"]
    },
    {
      id: "proj-3",
      name: "Climate Lens",
      link: "climatelens.org",
      description: "Interactive data visualization dashboard tracking global carbon emission trends. Winner of the 2020 Data Viz Hackathon.",
      technologies: ["D3.js", "WebGL", "Next.js"]
    }
  ]
};