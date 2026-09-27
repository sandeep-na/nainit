import type { Service } from "@/types";
import { u } from "@/lib/images";

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Blazing-fast marketing sites, portals & SaaS frontends.",
    description:
      "We design and engineer conversion-focused websites and web apps with Next.js, TypeScript and edge-ready architecture — SEO-first, accessible, and measurable.",
    icon: "web",
    image: u("1547658719-da2b51169166"),
    features: ["Next.js SSR/SSG architecture", "Headless CMS integration", "E-commerce & payments", "Performance budgets (90+ Lighthouse)"],
    deliverables: ["UX wireframes", "Design system", "Production codebase", "Analytics + SEO setup"],
    tech: ["Next.js", "TypeScript", "Tailwind", "Node.js"],
    priceFrom: "$4,800",
    timeline: "4–8 weeks",
  },
  {
    slug: "app-development",
    title: "App Development",
    tagline: "Native-quality iOS, Android & cross-platform apps.",
    description:
      "From MVP to millions of users — we ship reliable mobile apps with clean architecture, offline support and store-ready polish.",
    icon: "app",
    image: u("1512941937669-90a1b58e7e9c"),
    features: ["React Native / Flutter builds", "Offline-first data sync", "Push & deep-linking", "Store submission & ASO"],
    deliverables: ["Clickable prototype", "Beta builds", "Store listings", "Crash-free SLA"],
    tech: ["React Native", "Flutter", "Swift", "Kotlin"],
    priceFrom: "$8,500",
    timeline: "8–14 weeks",
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    tagline: "AWS / Azure architectures that scale without drama.",
    description:
      "Landing zones, Kubernetes, serverless and cost controls — cloud foundations your team can actually operate.",
    icon: "cloud",
    image: u("1558494949-ef010cbdcc31"),
    features: ["Cloud migration & landing zones", "Kubernetes & serverless", "Cost optimisation (FinOps)", "Backup & DR runbooks"],
    deliverables: ["Architecture blueprint", "IaC (Terraform)", "CI/CD pipelines", "SRE handover docs"],
    tech: ["AWS", "Azure", "Terraform", "Kubernetes"],
    priceFrom: "$6,000",
    timeline: "3–6 weeks",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    tagline: "Research-backed interfaces people love to use.",
    description:
      "Discovery sprints, design systems and usability testing — interfaces that lift activation, retention and NPS.",
    icon: "design",
    image: u("1561070791-2526d30994b5"),
    features: ["UX research & journey maps", "Design systems in Figma", "Interactive prototypes", "Usability testing rounds"],
    deliverables: ["Research report", "Figma system", "Prototype", "Handoff specs"],
    tech: ["Figma", "FigJam", "Maze", "Storybook"],
    priceFrom: "$3,200",
    timeline: "2–5 weeks",
  },
  {
    slug: "devops-automation",
    title: "DevOps & Automation",
    tagline: "Ship daily with confidence — DORA metrics included.",
    description:
      "Pipelines, preview environments, observability and platform engineering that unblock your developers.",
    icon: "devops",
    image: u("1551288049-bebda4e38f71"),
    features: ["CI/CD with preview envs", "Observability (logs/metrics/traces)", "GitOps & policy-as-code", "Release automation"],
    deliverables: ["Pipeline setup", "Dashboards & alerts", "Runbooks", "DORA baseline report"],
    tech: ["GitHub Actions", "ArgoCD", "Docker", "Grafana"],
    priceFrom: "$4,000",
    timeline: "2–4 weeks",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Audits, hardening & compliance without the fear-mongering.",
    description:
      "Threat modelling, pentests, SOC-readiness and SOC 2 / ISO 27001 support for regulated industries.",
    icon: "shield",
    image: u("1550751827-4bd374c3f58b"),
    features: ["Security audits & pentests", "Cloud hardening", "SOC 2 / ISO 27001 readiness", "Incident-response plans"],
    deliverables: ["Risk register", "Pentest report", "Remediation plan", "Compliance pack"],
    tech: ["OWASP", "Burp Suite", "Wiz", "CrowdStrike"],
    priceFrom: "$5,500",
    timeline: "2–6 weeks",
  },
  {
    slug: "ai-ml",
    title: "AI & Machine Learning",
    tagline: "RAG copilots, forecasting & MLOps that pay for themselves.",
    description:
      "We build grounded AI features on your data — retrieval pipelines, eval harnesses and cost-aware inference.",
    icon: "ai",
    image: u("1677442136019-21780ecad995"),
    features: ["RAG copilots & chat", "Document intelligence", "Forecasting & churn models", "Evals + guardrails + MLOps"],
    deliverables: ["AI opportunity map", "Working pilot", "Eval dashboard", "Infra cost model"],
    tech: ["Python", "LangChain", "OpenAI", "Pinecone"],
    priceFrom: "$7,500",
    timeline: "4–10 weeks",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "SEO, paid & lifecycle — pipeline you can attribute.",
    description:
      "Full-funnel growth: technical SEO, paid media and email automation tied to revenue dashboards.",
    icon: "growth",
    image: u("1460925895917-afdab827c52f"),
    features: ["Technical SEO sprints", "Paid search & social", "Marketing automation", "Attribution dashboards"],
    deliverables: ["Growth roadmap", "Content calendar", "Ad account build", "Monthly revenue report"],
    tech: ["HubSpot", "GA4", "Semrush", "Meta Ads"],
    priceFrom: "$1,800/mo",
    timeline: "Ongoing",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
