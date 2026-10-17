// Personal
export type PersonalInfo = {
  name: string;
  /** One-line role shown under the name, e.g. "Backend & applied ML engineer". */
  role: string;
  /** Years of experience shown in the role line, e.g. "5.5 yrs". Update yearly. */
  tenure: string;
  location: string;
  email: string;
  phone: string;
  links: Link[];
  summary: string;
};

export type ProjectType = "library" | "dataset" | "tool";
export type ProjectStatus = "active" | "maintained" | "archived";

// Experiences
export interface Project {
  name: string;
  description?: string;
  /** Kind of thing, used by the type filter on /projects. */
  type?: ProjectType;
  status?: ProjectStatus;
  /** Year shown in the row and used for sorting when `date` is missing. */
  year?: number;
  /** Stack tags. The stack filter on /projects is built from these. */
  tags?: string[];
  /** Used by projects nested under an experience. */
  tech_stack?: string[];
  highlights?: string[];
  links?: Link[];
  /** Full release date (YYYY-MM-DD), for sorting within a year. */
  date?: string;
  /**
   * Optional outcome signals, e.g. { "label": "PyPI downloads / month", "value": "1.2k" }.
   * Entries with an empty value are kept as placeholders and not rendered.
   */
  metrics?: Metric[];
}

export type Metric = {
  label: string;
  value: string;
};

export interface Experience {
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  location: string;
  /** One impact line shown on the home page. Empty string = placeholder, not rendered. */
  impact?: string;
  projects: Project[];
}

// Projects
export type Link = {
  // type: "github" | "docs" | "pypi" | "kaggle" | "linkedin";
  type: string;
  url: string;
};

// export type Projects = {
//   name: string;
//   description: string;
//   tech_stack: string[];
//   highlights: string[];
//   links: Link[];
// };

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
