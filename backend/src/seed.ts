import "dotenv/config";
import mongoose from "mongoose";
import { Service } from "./models/Service.js";
import { Industry } from "./models/Industry.js";

const services = [
  { slug: "web-development", title: "Web Development", tagline: "Blazing-fast sites & SaaS frontends", description: "Next.js, SEO-first builds.", image: "/images/service-web.svg", features: ["SSR/SSG", "Headless CMS"], priceFrom: "$4,800" },
  { slug: "app-development", title: "App Development", tagline: "iOS, Android & cross-platform", description: "Reliable mobile apps.", image: "/images/service-app.svg", features: ["React Native", "Offline-first"], priceFrom: "$8,500" },
  { slug: "cloud-solutions", title: "Cloud Solutions", tagline: "AWS/Azure that scales", description: "Landing zones & K8s.", image: "/images/service-cloud.svg", features: ["Migration", "FinOps"], priceFrom: "$6,000" },
  { slug: "ui-ux-design", title: "UI/UX Design", tagline: "Interfaces people love", description: "Research-backed design.", image: "/images/service-design.svg", features: ["Design systems", "Testing"], priceFrom: "$3,200" },
  { slug: "devops-automation", title: "DevOps & Automation", tagline: "Ship daily", description: "Pipelines & observability.", image: "/images/service-devops.svg", features: ["CI/CD", "GitOps"], priceFrom: "$4,000" },
  { slug: "cybersecurity", title: "Cybersecurity", tagline: "Audits & compliance", description: "Pentests & hardening.", image: "/images/service-security.svg", features: ["Pentests", "SOC 2"], priceFrom: "$5,500" },
  { slug: "ai-ml", title: "AI & Machine Learning", tagline: "RAG copilots & MLOps", description: "Grounded AI features.", image: "/images/service-ai.svg", features: ["RAG", "Evals"], priceFrom: "$7,500" },
  { slug: "digital-marketing", title: "Digital Marketing", tagline: "Pipeline you can attribute", description: "SEO, paid & lifecycle.", image: "/images/service-marketing.svg", features: ["SEO", "Paid media"], priceFrom: "$1,800/mo" },
];

const industries = [
  { slug: "healthcare", title: "Healthcare", tagline: "HIPAA-aware platforms", description: "Portals & telehealth.", image: "/images/industry-healthcare.svg" },
  { slug: "fintech", title: "Fintech", tagline: "Ledger-grade backends", description: "Payments & lending.", image: "/images/industry-fintech.svg" },
  { slug: "ecommerce", title: "E-commerce", tagline: "Headless storefronts", description: "Sub-second commerce.", image: "/images/industry-ecommerce.svg" },
  { slug: "education", title: "Education", tagline: "LMS & cohorts", description: "Learning platforms.", image: "/images/industry-education.svg" },
  { slug: "real-estate", title: "Real Estate", tagline: "Listings & CRM", description: "Brokerage platforms.", image: "/images/industry-realestate.svg" },
  { slug: "manufacturing", title: "Manufacturing", tagline: "IoT & MES", description: "Shop-floor intelligence.", image: "/images/industry-manufacturing.svg" },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI ?? "");
  await Service.deleteMany({});
  await Industry.deleteMany({});
  await Service.insertMany(services);
  await Industry.insertMany(industries);
  console.log("Seeded services + industries");
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
