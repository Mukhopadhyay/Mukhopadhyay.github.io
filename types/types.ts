// Personal
export type PersonalInfo = {
  name: string;
  location: string;
  email: string;
  phone: string;
  links: Link[];
  summary: string;
};

// Experiences
export type Project = {
  name: string;
  tech_stack: string[];
  highlights: string[];
};

export type Experience = {
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  location: string;
  projects: Project[];
};

// Projects
export type Link = {
  type: "github" | "docs" | "pypi" | "kaggle" | "linkedin";
  url: string;
};

export type Projects = {
  name: string;
  description: string;
  tech_stack: string[];
  highlights: string[];
  links: Link[];
};

// Education
export type Education = {
  institution: string;
  degree: string;
  year: string;
  location: string;
};

// Skills
export type Skill = {
  Languages: string[];
  Backend: string[];
  DevOps: string[];
  Databases: string[];
  ML: string[];
  MLOps: string[];
  LLM: string[];
};
