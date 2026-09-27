// Central domain types — human-readable, one place to look.

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // emoji-free: short label used by UI to pick an SVG
  image: string;
  features: string[];
  deliverables: string[];
  tech: string[];
  priceFrom: string;
  timeline: string;
}

export interface Industry {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  challenges: string[];
  solutions: string[];
  kpis: { label: string; value: string }[];
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  image: string;
  summary: string;
  results: { label: string; value: string }[];
  stack: string[];
  year: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
  headings?: string[];
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface TeamRole {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // short label used by UI to pick an SVG
  skills: string[];
  responsibilities: string[];
  experience: string;
  rateFrom: string;
  hireTimeline: string;
}

export interface TeamCategory {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // short label used by UI to pick an SVG
  roles: TeamRole[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "admin";
  token?: string;
}
