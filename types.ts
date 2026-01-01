export interface Experience {
  id: string;
  company: string;
  role: string;
  dates: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  dates: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  link?: string;
  description: string;
  technologies: string[];
}

export interface ResumeData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  enablePagination?: boolean;
}

export type SectionType = 'summary' | 'experience' | 'education' | 'project';
