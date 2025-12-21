import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  fullName: "Alex Chen",
  title: "Senior Product Designer",
  email: "alex.chen@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "alexchen.design",
  summary: "Award-winning product designer with over 8 years of experience in building user-centric digital products. Specialized in design systems, minimalist UI, and accessible UX. Proven track record of leading design teams and delivering high-impact projects for fintech and healthcare startups.",
  experience: [
    {
      id: "exp-1",
      company: "Linear & Co.",
      role: "Lead Product Designer",
      dates: "2021 - Present",
      description: "Spearheaded the redesign of the core mobile application, resulting in a 40% increase in user retention. Established a comprehensive design system used by 30+ engineers and designers. Mentored junior designers and conducted weekly design critiques."
    },
    {
      id: "exp-2",
      company: "Vercel Inc.",
      role: "Senior UI/UX Designer",
      dates: "2018 - 2021",
      description: "Designed and launched the analytics dashboard feature, utilized by 50k+ developers. Collaborated closely with frontend engineers to ensure pixel-perfect implementation using React and Tailwind CSS."
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "Rhode Island School of Design",
      degree: "BFA in Graphic Design",
      dates: "2014 - 2018",
      description: "Graduated with Honors. Focus on Typography and Interaction Design."
    }
  ],
  skills: [
    "Figma", "Prototyping", "Design Systems", "HTML/CSS", "React Basic", "User Research", "Agile Methodology", "Motion Design"
  ],
  projects: [
    {
      id: "proj-1",
      name: "ZenFocus",
      link: "zenfocus.app",
      description: "A minimal productivity timer app for macOS.",
      technologies: ["Swift", "SwiftUI"]
    }
  ]
};
