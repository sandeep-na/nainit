import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { posts, projects, jobs } from "@/data/site";
import { getAllTeamRoles } from "@/data/dedicated-team";
import type { Inquiry, JobApplication } from "@/lib/api";

export const library = [
  ...services.map(item => ({ title: item.title, category: "Services", detail: item.tagline, href: `/services/${item.slug}` })),
  ...industries.map(item => ({ title: item.title, category: "Industries", detail: item.tagline, href: `/industries/${item.slug}` })),
  ...projects.map(item => ({ title: item.title, category: "Portfolio", detail: `${item.client} · ${item.industry}`, href: `/portfolio/${item.slug}` })),
  ...posts.map(item => ({ title: item.title, category: "Blog", detail: `${item.author} · ${item.date}`, href: `/blog/${item.slug}` })),
  ...jobs.map(item => ({ title: item.title, category: "Careers", detail: `${item.team} · ${item.location}`, href: `/careers/${item.slug}` })),
  ...getAllTeamRoles().map(item => ({ title: item.title, category: "Dedicated team", detail: item.categoryTitle, href: `/dedicated-team/${item.slug}` })),
  ...[{ title: "Home", href: "/" }, { title: "About us", href: "/about" }, { title: "Contact", href: "/contact" }, { title: "Schedule a call", href: "/schedule-call" }].map(item => ({ ...item, category: "Pages", detail: "Main website page" })),
];
export const libraryCategories = [...new Set(library.map(item => item.category))];

export function demoInquiries(): Inquiry[] {
  const created = (days: number) => new Date(Date.now() - days * 86400000).toISOString();
  const nextDate = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
  return [
    { id: "demo-1", name: "Aditi Sharma", email: "aditi@example.com", company: "Northstar Studio", message: "We are planning a new customer portal and would like to discuss architecture, design, and a phased launch.", status: "new", createdAt: created(0), callRequest: { preferredDate: nextDate, preferredTime: "11:00", timeZone: "Asia/Kolkata", service: "Web development", phone: "+91 90000 00001" } },
    { id: "demo-2", name: "James Wilson", email: "james@example.com", company: "Orbit Commerce", message: "Looking for a team to improve our storefront performance and redesign the checkout experience.", status: "new", createdAt: created(0) },
    { id: "demo-3", name: "Priya Mehta", email: "priya@example.com", company: "Bloom Health", message: "We need a mobile application for appointment scheduling. Could you share the first steps?", status: "replied", createdAt: created(1) },
    { id: "demo-4", name: "Alex Morgan", email: "alex@example.com", company: "Summit Labs", message: "We would like to explore an internal AI assistant and discuss retrieval, evaluation, and cost planning.", status: "new", createdAt: created(2), callRequest: { preferredDate: nextDate, preferredTime: "15:00", timeZone: "Europe/London", service: "AI & machine learning", phone: "" } },
    { id: "demo-5", name: "Rohan Shah", email: "rohan@example.com", company: "Meridian Finance", message: "Interested in cloud migration and a review of our deployment workflow.", status: "replied", createdAt: created(3) },
    { id: "demo-6", name: "Mia Chen", email: "mia@example.com", company: "Canvas Learning", message: "We are exploring a redesign of our learning platform for teachers and students.", status: "archived", createdAt: created(5) },
  ];
}
export function demoApplications(): JobApplication[] {
  return [
    { id: "app-demo-1", name: "Neha Patel", email: "neha@example.com", phone: "", jobSlug: "senior-frontend-engineer", jobTitle: "Senior Frontend Engineer", link: "https://example.com", experience: "5+ years", coverNote: "I build accessible React applications and enjoy working closely with product and design teams.", status: "new", createdAt: new Date().toISOString() },
    { id: "app-demo-2", name: "Daniel Lee", email: "daniel@example.com", phone: "", jobSlug: "product-designer", jobTitle: "Product Designer", link: "https://example.com", experience: "3–5 years", coverNote: "My focus is on research, interaction design, and design systems for digital products.", status: "shortlisted", createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: "app-demo-3", name: "Sara Khan", email: "sara@example.com", phone: "", jobSlug: "ai-engineer", jobTitle: "AI Engineer", link: "https://example.com", experience: "3–5 years", coverNote: "I work on retrieval systems and evaluation tooling for applied AI products.", status: "new", createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  ];
}
