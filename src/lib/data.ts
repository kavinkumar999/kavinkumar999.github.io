/* Single source of truth for all site content. Components only read from this file.
   PROFILE, EXPERIENCE, PROJECTS and the tech stack are Kavin's. Certifications, achievements and the
   résumé PDF are still placeholders from the design template: replace them before going live. */

import { asset } from "./asset";

export const PROFILE = {
  name: "Kavin Kumar",
  firstName: "Kavin",
  initials: "KK",
  role: "Senior Software Engineer",
  /** Hero headline. The last word is accented, the rest sits on the first line. */
  heroTitle: "Senior Software Engineer",
  company: "Walmart",
  since: "Sep 2026",
  location: "Chennai, India",
  email: "kavinkumar21k@gmail.com",
  /** Optional: leave both empty to hide the phone row. */
  phone: "",
  phoneHref: "",
  github: "https://github.com/kavinkumar999",
  linkedin: "https://linkedin.com/in/kavinkumar999",
  resume: asset("/cv.pdf"),
  resumeSummary:
    "Senior Software Engineer at Walmart, previously at Nextiva and 6+ years at Zoho building and shipping features for Zoho Payroll with a focus on stability, security and scale. I craft high-scale web applications, dive into AI engineering and love automating boring stuff.",
  /** Pull quote in the About section. `accent` is rendered highlighted after `lead`. */
  tagline: { lead: "Making the impossible possible using 1's and", accent: "0's." },
} as const;

const heroWords = PROFILE.heroTitle.split(" ");
/** Hero headline split into a plain lead and an accented last word. */
export const HERO_TITLE = { lead: heroWords.slice(0, -1).join(" "), accent: heroWords[heroWords.length - 1] };
export const RESUME_FILE_NAME = `${PROFILE.name.replace(/\s+/g, "-")}-Resume.pdf`;

export type SectionId = "about" | "skills" | "work" | "certifications" | "experience" | "achievements" | "contact";

/** Section tag numbers follow rendered order. Use as `${index} — ${label}`. */
export const SECTIONS: Record<SectionId, { index: string; label: string }> = {
  about: { index: "01", label: "About me" },
  skills: { index: "02", label: "Skills" },
  work: { index: "03", label: "Selected work" },
  certifications: { index: "04", label: "Certifications" },
  experience: { index: "05", label: "Experience" },
  achievements: { index: "06", label: "Honours & metrics" },
  contact: { index: "07", label: "Contact" },
};

export interface NavItem {
  id: SectionId;
  label: string;
  index: string;
}
export const NAV: NavItem[] = (["about", "skills", "work", "experience", "achievements", "contact"] as const).map((id) => ({
  id,
  index: SECTIONS[id].index,
  label: id === "work" ? "Work" : id[0].toUpperCase() + id.slice(1),
}));

/* ---------- Skills ---------- */
export type SkillFamily = "Languages" | "AI & LLMs" | "LLMOps" | "Frameworks" | "Databases" | "Tools";

export interface Skill {
  /** Logo key for <TechLogo name=... /> (brand file in /public/logos or a concept icon). */
  logo: string;
  name: string;
  family: SkillFamily;
  /** Unique 2-letter element symbol. */
  symbol: string;
  /** Atomic number: 1-based position in the whole table. */
  number: number;
  /** Where the CV says it was used. Absent when the CV doesn't say. */
  usedIn?: string[];
}
export interface SkillGroup {
  family: SkillFamily;
  skills: Skill[];
}

type RawSkill = Omit<Skill, "number" | "family">;
/* Family order is the order of the keys below; skills are numbered across the whole table. */
const RAW: Record<SkillFamily, RawSkill[]> = {
  Languages: [
    { logo: "java", name: "Java", symbol: "Ja" },
    { logo: "rust", name: "Rust", symbol: "Ru" },
    { logo: "python", name: "Python", symbol: "Py" },
    { logo: "typescript", name: "TypeScript", symbol: "Ts" },
    { logo: "javascript", name: "JavaScript", symbol: "Js" },
    { logo: "sql", name: "SQL", symbol: "Sq" },
  ],
  "AI & LLMs": [
    { logo: "pytorch", name: "PyTorch", symbol: "Pt" },
    { logo: "huggingface", name: "Hugging Face", symbol: "Hf" },
    { logo: "langchain", name: "LangChain", symbol: "Lc" },
    { logo: "llamaindex", name: "LlamaIndex", symbol: "Li" },
    { logo: "rag", name: "RAG", symbol: "Rg" },
    { logo: "agents", name: "AI Agents", symbol: "Ag" },
  ],
  LLMOps: [
    { logo: "mlflow", name: "MLflow", symbol: "Ml" },
    { logo: "weightsandbiases", name: "Weights & Biases", symbol: "Wb" },
    { logo: "opentelemetry", name: "OpenTelemetry", symbol: "Ot" },
    { logo: "prometheus", name: "Prometheus", symbol: "Pm" },
    { logo: "grafana", name: "Grafana", symbol: "Gf" },
    { logo: "evals", name: "LLM Evals", symbol: "Ev" },
  ],
  Frameworks: [
    { logo: "nextjs", name: "Next.js", symbol: "Nx" },
    { logo: "react", name: "React", symbol: "Re" },
    { logo: "nodejs", name: "Node.js", symbol: "No" },
    { logo: "spring", name: "Spring Boot", symbol: "Sb" },
    { logo: "tailwindcss", name: "Tailwind CSS", symbol: "Tw" },
    { logo: "fastapi", name: "FastAPI", symbol: "Fa" },
  ],
  Databases: [
    { logo: "mongodb", name: "MongoDB", symbol: "Mo" },
    { logo: "postgresql", name: "PostgreSQL", symbol: "Pg" },
    { logo: "redis", name: "Redis", symbol: "Rd" },
    { logo: "qdrant", name: "Qdrant", symbol: "Qd" },
  ],
  Tools: [
    { logo: "docker", name: "Docker", symbol: "Do" },
    { logo: "kubernetes", name: "Kubernetes", symbol: "Ku" },
    { logo: "jenkins", name: "Jenkins", symbol: "Je" },
    { logo: "apachekafka", name: "Apache Kafka", symbol: "Ka" },
  ],
};

export const SKILL_FAMILIES = Object.keys(RAW) as SkillFamily[];

let atomic = 0;
export const SKILL_GROUPS: SkillGroup[] = SKILL_FAMILIES.map((family) => ({
  family,
  skills: RAW[family].map((s) => ({ ...s, family, number: ++atomic })),
}));
export const SKILLS: Skill[] = SKILL_GROUPS.flatMap((g) => g.skills);

/* ---------- Experience & education ---------- */
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}
/** Most recent first. */
export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "walmart",
    role: "Senior Software Engineer",
    company: "Walmart",
    period: "Sep 2026 \u2013 Present",
    bullets: [],
  },
  {
    id: "nextiva",
    role: "Software Engineer",
    company: "Nextiva (Remote)",
    period: "Sep 2025 \u2013 Sep 2026",
    bullets: ["Exploring new challenges while diving deeper into AI engineering and automation, turning ideas into meaningful solutions."],
  },
  {
    id: "zoho",
    role: "Software Engineer",
    company: "Zoho Corporation",
    period: "Mar 2021 \u2013 Sep 2025",
    bullets: ["Spent 5+ years building and shipping features for Zoho Payroll, focusing on stability, security and scale."],
  },
  {
    id: "aerele",
    role: "Software Developer Intern",
    company: "Aerele Technologies",
    period: "Sep 2020 \u2013 Mar 2021",
    bullets: [],
  },
];

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  place?: string;
  period?: string;
  /** Currently pursuing (no end date). */
  pursuing?: boolean;
}
/** Add your degrees here (most recent first). Empty means the education rows simply don't render. */
export const EDUCATION: EducationItem[] = [];

/** Education + work merged into one path. Experience section renders this. */
export interface TimelineItem {
  id: string;
  kind: "education" | "work";
  org: string;
  title: string;
  place?: string;
  period: string;
  pursuing?: boolean;
  bullets?: string[];
}
const fromEdu = (e: EducationItem): TimelineItem => ({
  id: e.id,
  kind: "education",
  org: e.school,
  title: e.degree,
  place: e.place,
  period: e.pursuing ? "Currently pursuing" : (e.period ?? ""),
  pursuing: e.pursuing,
});
const fromJob = (e: ExperienceItem): TimelineItem => ({
  id: e.id,
  kind: "work",
  org: e.company,
  title: e.role,
  period: e.period,
  bullets: e.bullets.length ? e.bullets : undefined,
});
/** Oldest first: education, then jobs. */
export const TIMELINE: TimelineItem[] = [...EDUCATION].reverse().map(fromEdu).concat([...EXPERIENCE].reverse().map(fromJob));

/* ---------- Projects ---------- */
export interface ProjectTech {
  name: string;
  /** Logo key, only when a logo exists. */
  logo?: string;
}
export interface Project {
  id: string;
  number: string;
  title: string;
  date: string;
  kicker: string;
  /** First CV bullet, used as the main description. */
  description: string;
  /** Both CV bullets, verbatim. */
  bullets: string[];
  /** Short feature phrases built from CV words. */
  features: string[];
  tech: ProjectTech[];
  link?: { href: string; label: string };
  /** Which illustrative mini-UI to draw. */
  visual: "blog" | "voice" | "iot";
}
export const PROJECTS: Project[] = [
  {
    id: "ember-productivity",
    number: "01",
    title: "Ember Productivity",
    date: "Open source",
    kicker: "VS Code extension",
    description:
      "A VS Code extension for Ember.js that simplifies switching between related files, boosting your development efficiency.",
    bullets: [
      "A VS Code extension for Ember.js that simplifies switching between related files, boosting your development efficiency.",
      "Published on the Visual Studio Code Marketplace.",
    ],
    features: ["VS Code extension", "Ember.js file navigation", "Jump between related files", "Faster development workflow"],
    tech: [{ name: "TypeScript", logo: "typescript" }, { name: "VS Code API" }],
    link: { href: "https://github.com/kavinkumar999/ember-productivity", label: "View on GitHub" },
    visual: "blog",
  },
  {
    id: "one-dark-plus",
    number: "02",
    title: "One Dark +",
    date: "Open source",
    kicker: "VS Code theme",
    description: "A custom theme for Visual Studio Code inspired by Atom's One Dark theme.",
    bullets: [
      "A custom theme for Visual Studio Code inspired by Atom's One Dark theme.",
      "Published on the Visual Studio Code Marketplace.",
    ],
    features: ["Custom colour theme", "Inspired by Atom One Dark", "Syntax highlighting tweaks"],
    tech: [{ name: "TypeScript", logo: "typescript" }, { name: "CSS" }, { name: "VS Code API" }],
    link: { href: "https://github.com/kavinkumar999/one-dark-plus", label: "View on GitHub" },
    visual: "blog",
  },
  {
    id: "test-case-generator",
    number: "03",
    title: "Test Case Generator",
    date: "Open source",
    kicker: "Ember addon",
    description:
      "An addon that helps you create tests by recording user interactions in your application, then generates test cases from your actions.",
    bullets: [
      "An addon that helps you create tests by recording user interactions in your application.",
      "Automatically generates test cases based on your actions, making test creation more intuitive and efficient.",
    ],
    features: ["Records user interactions", "Generates test cases automatically", "Intuitive test creation"],
    tech: [{ name: "Ember.js" }, { name: "TypeScript", logo: "typescript" }],
    link: { href: "https://github.com/kavinkumar999/ember-test-recorder", label: "View on GitHub" },
    visual: "voice",
  },
  {
    id: "stock-slice",
    number: "04",
    title: "Stock Slice",
    date: "Open source",
    kicker: "Stock analysis tool",
    description:
      "A tool that simplifies stock analysis by breaking large lists of stocks into manageable chunks, ideal for TradingView's free plan.",
    bullets: [
      "A tool that simplifies stock analysis by breaking large lists of stocks into manageable chunks.",
      "Ideal for users of TradingView's free plan.",
    ],
    features: ["Splits large stock lists", "Manageable chunks", "Built for TradingView's free plan"],
    tech: [{ name: "React", logo: "react" }, { name: "Tailwind CSS", logo: "tailwindcss" }, { name: "TypeScript", logo: "typescript" }],
    link: { href: "https://github.com/kavinkumar999/stock-slice", label: "View on GitHub" },
    visual: "iot",
  },
];

/* ---------- Certifications ---------- */
export interface Certification {
  id: string;
  index: string;
  title: string;
  date: string;
  url: string;
  /** Issuer, when known (derived from the title, plus HashiCorp for Terraform). */
  issuer?: string;
}
const CERT_RAW: Omit<Certification, "index">[] = [
  { id: "terraform", title: "Terraform Certified Associate", issuer: "HashiCorp", date: "Nov 2025", url: "https://www.credly.com/badges/28af38c2-9977-47c1-b129-b0e6dda5d729/public_url" },
  { id: "mckinsey", title: "Forward Learning Program – McKinsey & Company", issuer: "McKinsey & Company", date: "Jul 2025", url: "https://www.credly.com/badges/9d6e515a-3eac-4953-bca9-dde2c7057322/public_url" },
  { id: "mysql", title: "Oracle MySQL Implementation Associate", issuer: "Oracle", date: "Jul 2025", url: "https://www.linkedin.com/posts/ajaysrinic_mysql-oraclecertification-dba-activity-7351201151259693056-prWQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAACOrnI8BO2fLCVFZUyL8xe1iXEK-eLyYZaI" },
  { id: "exampro", title: "AWS Cloud Project Bootcamp – ExamPro", issuer: "ExamPro", date: "Sep 2023", url: "https://app.exampro.co/validate/certificate/KbFoaSAJEKiTR7-c74xB0Q1afbf" },
  { id: "az900", title: "Microsoft Azure AZ 900", issuer: "Microsoft", date: "Mar 2023", url: "https://www.credly.com/badges/b08211a8-a380-4c66-b868-73133794fbd9/linked_in_profile" },
  { id: "awscp", title: "AWS Cloud Practitioner", issuer: "AWS", date: "Dec 2022", url: "https://www.credly.com/badges/e9fd7851-8d5f-496c-b447-7ca8e6ec0d58/public_url" },
];
export const CERTIFICATIONS: Certification[] = CERT_RAW.map((c, i) => ({ ...c, index: String(i + 1).padStart(2, "0") }));

/* ---------- Achievements ---------- */
export interface Achievement {
  id: string;
  /** "01" .. "07" */
  index: string;
  label: string;
  caption: string;
  detail: string;
  /** Logo key: lnrs, github-actions, srm, medal (concept), linux, jenkins, azure */
  logo: string;
  /** Soft glow behind the logo, rgba. */
  tint: string;
  number?: number;
  prefix?: string;
  suffix?: string;
  /** Small unit text beside the number, e.g. "CAD / month". */
  unit?: string;
}
const ACH_RAW: Omit<Achievement, "index">[] = [
  {
    id: "spotlight",
    label: "Spotlight Award",
    caption: "Recognized for delivering high-impact automation and observability solutions",
    detail: "Values: Collaborate to Deliver, Act with Agility, Drive Commercial Edge",
    logo: "lnrs",
    tint: "rgba(237,28,36,0.16)",
  },
  {
    id: "deploy",
    label: "Deployment acceleration",
    caption: "Reduction in deployment time via GitHub Actions CI/CD",
    detail: "Windows IIS .NET apps, PRDE project, with JFrog Artifactory and Jenkins",
    logo: "github-actions",
    tint: "rgba(33,114,229,0.16)",
    number: 70,
    suffix: "%",
  },
  {
    id: "beacon",
    label: "Inspiration Beacon Award",
    caption: "Honored for a well-received guest lecture on DevOps/SRE fundamentals and career guidance",
    detail: "Motivating students and sharing practical industry insights",
    logo: "srm",
    tint: "rgba(18,70,160,0.16)",
  },
  {
    id: "skills2020",
    label: "India Skills 2020",
    caption: "Runner-up at the state-level competition",
    detail: "Recognized by the District Collectorate of Tiruvallur",
    logo: "medal",
    tint: "rgba(13,13,13,0.08)",
  },
  {
    id: "uptime",
    label: "Uptime",
    caption: "Increase in uptime managing Linux production servers 24x7",
    detail: "Live environment at TCS",
    logo: "linux",
    tint: "rgba(250,190,20,0.18)",
    number: 20,
    suffix: "%",
  },
  {
    id: "releases",
    label: "Faster releases",
    caption: "Reduction in deployment times",
    detail: "CI/CD best practices with Jenkins and Git at TCS",
    logo: "jenkins",
    tint: "rgba(215,51,39,0.14)",
    number: 40,
    suffix: "%",
  },
  {
    id: "savings",
    label: "Cost savings",
    caption: "Saved through Azure optimisation: automation, monitoring and scaling",
    detail: "Azure cloud environments at TCS",
    logo: "azure",
    tint: "rgba(0,120,212,0.16)",
    number: 2500,
    prefix: "$",
    unit: "CAD / month",
  },
];
export const ACHIEVEMENTS: Achievement[] = ACH_RAW.map((a, i) => ({ ...a, index: String(i + 1).padStart(2, "0") }));
