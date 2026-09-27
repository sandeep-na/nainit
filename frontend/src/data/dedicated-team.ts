import type { TeamCategory, TeamRole } from "@/types";

export const teamCategories: TeamCategory[] = [
  {
    slug: "dedicated-developers",
    title: "Dedicated Developers",
    tagline: "Senior engineers who join your rituals, tools and roadmap.",
    description:
      "Hand-picked developers who plug into your sprint cycle from week one — code reviews, standups, CI/CD and documentation included. Scale the pod up or down every month.",
    icon: "code",
    roles: [
      {
        slug: "python-developer",
        title: "Python Developer",
        tagline: "APIs, automation and data-heavy backends in Django & FastAPI.",
        description:
          "Our Python developers build clean, typed, well-tested backends — REST and GraphQL APIs, workers, integrations and admin tooling. They profile before they optimise and document everything they ship.",
        icon: "code",
        skills: ["Python 3.12+", "Django / DRF", "FastAPI", "PostgreSQL", "Celery / Redis", "Docker", "Pytest"],
        responsibilities: [
          "Design and build versioned REST/GraphQL APIs",
          "Model data and write efficient ORM queries",
          "Build background workers and scheduled jobs",
          "Add tests, type hints and CI checks",
          "Review code and keep docs current",
        ],
        experience: "4+ yrs avg",
        rateFrom: "$24/hr",
        hireTimeline: "48 hours",
      },
      {
        slug: "nextjs-developer",
        title: "Next.js Developer",
        tagline: "SSR/SSG storefronts, portals and SaaS apps that score 90+.",
        description:
          "Next.js specialists who care about Core Web Vitals as much as DX — App Router, server components, edge caching and SEO baked in from the first commit.",
        icon: "code",
        skills: ["Next.js 14/15", "React + TypeScript", "Tailwind CSS", "Server Components", "Vercel / Edge", "SEO & Metadata API", "Playwright"],
        responsibilities: [
          "Build App Router pages with streaming SSR",
          "Optimise LCP, CLS and INP budgets",
          "Wire headless CMS and commerce APIs",
          "Implement auth, forms and analytics",
          "Keep Lighthouse scores above 90",
        ],
        experience: "4+ yrs avg",
        rateFrom: "$26/hr",
        hireTimeline: "48 hours",
      },
      {
        slug: "react-developer",
        title: "React Developer",
        tagline: "Complex dashboards and design-system-driven frontends.",
        description:
          "React engineers who turn Figma into accessible, state-managed, test-covered interfaces — from admin consoles to customer-facing product UI.",
        icon: "code",
        skills: ["React 18/19", "TypeScript", "Redux / Zustand", "React Query", "Vite", "Storybook", "Vitest"],
        responsibilities: [
          "Build reusable component libraries",
          "Manage client state and server cache",
          "Implement role-based views and routing",
          "Write unit and interaction tests",
          "Pair with designers on motion and a11y",
        ],
        experience: "4+ yrs avg",
        rateFrom: "$24/hr",
        hireTimeline: "48 hours",
      },
      {
        slug: "nodejs-developer",
        title: "Node.js Developer",
        tagline: "Realtime APIs, microservices and event-driven backends.",
        description:
          "Node.js developers who build observable, horizontally-scalable services — queues, websockets, gateways and scheduled pipelines with proper tracing.",
        icon: "code",
        skills: ["Node.js", "Express / NestJS", "PostgreSQL / MongoDB", "RabbitMQ / Kafka", "Socket.io", "Jest", "AWS Lambda"],
        responsibilities: [
          "Design service boundaries and contracts",
          "Build auth, billing and webhook flows",
          "Add structured logging and tracing",
          "Tune event loops and DB pools",
          "Ship zero-downtime deploys",
        ],
        experience: "4+ yrs avg",
        rateFrom: "$24/hr",
        hireTimeline: "48 hours",
      },
      {
        slug: "flutter-developer",
        title: "Flutter Developer",
        tagline: "One codebase, native feel on iOS and Android.",
        description:
          "Flutter developers who ship store-ready apps with offline sync, push, deep links and platform-channel integrations — reviewed against store guidelines before submission.",
        icon: "code",
        skills: ["Flutter / Dart", "Riverpod / Bloc", "Firebase", "REST / GraphQL", "In-app purchases", "Fastlane", "Patrol testing"],
        responsibilities: [
          "Build pixel-accurate cross-platform UI",
          "Integrate native SDKs via channels",
          "Implement offline-first data sync",
          "Handle push, links and purchases",
          "Prepare store listings and releases",
        ],
        experience: "3+ yrs avg",
        rateFrom: "$22/hr",
        hireTimeline: "72 hours",
      },
      {
        slug: "fullstack-developer",
        title: "Full-Stack Developer",
        tagline: "End-to-end owners for MVPs and lean product teams.",
        description:
          "Full-stack developers who take a ticket from database migration to deployed UI — ideal when you need one accountable engineer across the whole slice.",
        icon: "code",
        skills: ["Next.js + Node.js", "TypeScript", "PostgreSQL", "Prisma / Drizzle", "Tailwind CSS", "Docker", "CI/CD"],
        responsibilities: [
          "Own features end to end",
          "Model schema and write migrations",
          "Build API plus consuming UI",
          "Set up previews and deploys",
          "Track errors and fix forward",
        ],
        experience: "5+ yrs avg",
        rateFrom: "$28/hr",
        hireTimeline: "48 hours",
      },
    ],
  },
  {
    slug: "project-management",
    title: "Project Management",
    tagline: "Delivery discipline without the waterfall baggage.",
    description:
      "Certified delivery leads who run your cadence — planning, risks, dependencies and stakeholder updates — so engineers stay in flow and you always know the ship date.",
    icon: "users",
    roles: [
      {
        slug: "scrum-master",
        title: "Scrum Master",
        tagline: "Healthy ceremonies, clear boards, zero blocker pile-ups.",
        description:
          "Servant-leaders who keep sprints honest — facilitation, impediment removal and flow metrics, plus coaching for teams new to agile.",
        icon: "users",
        skills: ["Scrum / Kanban", "Jira / Linear", "Facilitation", "Flow metrics", "Retrospectives", "Conflict resolution", "Agile coaching"],
        responsibilities: [
          "Run standups, planning and retros",
          "Clear blockers within one business day",
          "Track velocity, cycle time and WIP",
          "Coach the team on agile practices",
          "Shield engineers from ad-hoc noise",
        ],
        experience: "5+ yrs avg",
        rateFrom: "$26/hr",
        hireTimeline: "48 hours",
      },
      {
        slug: "delivery-manager",
        title: "Delivery Manager",
        tagline: "Multi-team releases that land on the date promised.",
        description:
          "Delivery managers who coordinate pods, vendors and dependencies across workstreams — with RAID logs, release trains and executive-ready reporting.",
        icon: "users",
        skills: ["Release planning", "RAID management", "Dependency mapping", "Stakeholder comms", "OKRs", "Budget tracking", "Vendor coordination"],
        responsibilities: [
          "Own the release calendar end to end",
          "Manage risks, issues and dependencies",
          "Run cross-team sync and demos",
          "Report progress against milestones",
          "Drive go-live checklists and rollbacks",
        ],
        experience: "6+ yrs avg",
        rateFrom: "$32/hr",
        hireTimeline: "72 hours",
      },
      {
        slug: "project-manager",
        title: "Project Manager",
        tagline: "Fixed-scope projects run like clockwork.",
        description:
          "PMP-style project managers for scoped builds — plans, baselines, change control and weekly demos, so fixed price stays fixed.",
        icon: "users",
        skills: ["Scope baselining", "MS Project / ClickUp", "Change control", "Budget control", "Client reporting", "QA coordination", "Handover docs"],
        responsibilities: [
          "Lock scope, schedule and budget",
          "Run weekly demos and sign-offs",
          "Control changes with impact notes",
          "Coordinate QA and UAT cycles",
          "Deliver handover documentation",
        ],
        experience: "5+ yrs avg",
        rateFrom: "$28/hr",
        hireTimeline: "72 hours",
      },
      {
        slug: "product-owner",
        title: "Product Owner",
        tagline: "A backlog your engineers will actually thank you for.",
        description:
          "Embedded product owners who turn stakeholder wishes into sliced, acceptance-criteria-ready stories — and say no with data when it matters.",
        icon: "users",
        skills: ["Backlog refinement", "User stories + AC", "Prioritisation (RICE)", "Stakeholder interviews", "Roadmapping", "Analytics", "UAT sign-off"],
        responsibilities: [
          "Own and order the product backlog",
          "Write stories with clear acceptance criteria",
          "Accept or reject sprint increments",
          "Align stakeholders on priorities",
          "Measure outcomes, not just output",
        ],
        experience: "5+ yrs avg",
        rateFrom: "$30/hr",
        hireTimeline: "72 hours",
      },
    ],
  },
  {
    slug: "business-analysis",
    title: "Business Analysis",
    tagline: "Requirements so clear that rework disappears.",
    description:
      "Analysts who map processes, quantify the problem and write specs engineers love — BRDs, user journeys, data dictionaries and acceptance criteria included.",
    icon: "chart",
    roles: [
      {
        slug: "business-analyst",
        title: "Business Analyst",
        tagline: "From vague idea to buildable specification.",
        description:
          "Business analysts who run discovery workshops, map as-is/to-be processes and produce traceable requirements your team can estimate against.",
        icon: "chart",
        skills: ["Discovery workshops", "BRD / FRD", "BPMN process maps", "User journeys", "Gap analysis", "UAT planning", "SQL basics"],
        responsibilities: [
          "Elicit requirements from stakeholders",
          "Document processes and use cases",
          "Define scope boundaries and MVP cuts",
          "Write testable acceptance criteria",
          "Support UAT and sign-off",
        ],
        experience: "4+ yrs avg",
        rateFrom: "$24/hr",
        hireTimeline: "72 hours",
      },
      {
        slug: "systems-analyst",
        title: "Systems Analyst",
        tagline: "Where business needs meet system reality.",
        description:
          "Systems analysts who translate requirements into integration maps, data flows and API contracts — the bridge between your BA docs and the build.",
        icon: "chart",
        skills: ["Systems mapping", "API contracts", "Data flow diagrams", "Integration specs", "ERD modelling", "Non-functional reqs", "Postman / OpenAPI"],
        responsibilities: [
          "Map systems and integrations",
          "Specify APIs and data contracts",
          "Define NFRs (perf, security, scale)",
          "Review technical designs for fit",
          "Support SIT and defect triage",
        ],
        experience: "5+ yrs avg",
        rateFrom: "$26/hr",
        hireTimeline: "72 hours",
      },
      {
        slug: "data-analyst",
        title: "Data Analyst",
        tagline: "Dashboards and insights that drive decisions.",
        description:
          "Data analysts who clean messy data, build trusted dashboards and answer the questions leadership actually asks — with definitions everyone agrees on.",
        icon: "chart",
        skills: ["SQL", "Power BI / Metabase", "Excel / Sheets", "dbt basics", "KPI definitions", "Funnel analysis", "Data QA"],
        responsibilities: [
          "Define metrics with stakeholders",
          "Build and maintain dashboards",
          "Audit data quality issues",
          "Run ad-hoc deep dives",
          "Document metric definitions",
        ],
        experience: "3+ yrs avg",
        rateFrom: "$22/hr",
        hireTimeline: "48 hours",
      },
    ],
  },
  {
    slug: "ai-team",
    title: "AI Team",
    tagline: "Production AI, not demo-ware.",
    description:
      "ML and LLM engineers who take AI from notebook to production — retrieval pipelines, evals, guardrails, cost controls and monitoring your team can operate.",
    icon: "chip",
    roles: [
      {
        slug: "ai-engineer",
        title: "AI Engineer",
        tagline: "LLM features wired into your product in weeks.",
        description:
          "AI engineers who ship chat, search and automation on top of frontier models — prompt systems, function calling, evals and cost-aware model routing.",
        icon: "chip",
        skills: ["OpenAI / Anthropic APIs", "LangChain / LlamaIndex", "RAG pipelines", "Vector DBs", "Evals + guardrails", "Prompt systems", "Cost optimisation"],
        responsibilities: [
          "Design LLM feature architecture",
          "Build RAG over your data",
          "Write evals before launch",
          "Add guardrails and fallbacks",
          "Monitor quality, latency and cost",
        ],
        experience: "3+ yrs avg",
        rateFrom: "$34/hr",
        hireTimeline: "72 hours",
      },
      {
        slug: "ml-engineer",
        title: "ML Engineer",
        tagline: "Models trained, served and monitored reliably.",
        description:
          "ML engineers who own the full lifecycle — data pipelines, training, serving infrastructure and drift monitoring for classic ML workloads.",
        icon: "chip",
        skills: ["Python / PyTorch", "scikit-learn", "MLflow", "Feature stores", "Model serving", "Drift monitoring", "Kubernetes"],
        responsibilities: [
          "Build training and eval pipelines",
          "Serve models with versioning",
          "Monitor drift and performance",
          "Optimise inference cost",
          "Document model cards and limits",
        ],
        experience: "4+ yrs avg",
        rateFrom: "$32/hr",
        hireTimeline: "1 week",
      },
      {
        slug: "data-scientist",
        title: "Data Scientist",
        tagline: "Forecasts, segments and experiments you can act on.",
        description:
          "Data scientists who frame the business question first — then model churn, LTV, demand or risk with rigorous validation and plain-English readouts.",
        icon: "chip",
        skills: ["Python / pandas", "Statistics", "Forecasting", "Segmentation", "A/B testing", "Visualisation", "Stakeholder storytelling"],
        responsibilities: [
          "Frame measurable questions",
          "Build and validate models",
          "Design and read experiments",
          "Present findings plainly",
          "Hand off scoring logic to eng",
        ],
        experience: "4+ yrs avg",
        rateFrom: "$30/hr",
        hireTimeline: "1 week",
      },
      {
        slug: "llm-engineer",
        title: "LLM Engineer",
        tagline: "Fine-tunes, agents and eval harnesses for serious use.",
        description:
          "LLM specialists for the hard parts — domain fine-tuning, multi-step agents, long-context retrieval and red-teaming before your launch.",
        icon: "chip",
        skills: ["Fine-tuning / LoRA", "Agent frameworks", "Long-context RAG", "Eval harnesses", "Red-teaming", "Quantisation", "Tracing (LangSmith)"],
        responsibilities: [
          "Tune models on your domain data",
          "Build and test agent workflows",
          "Create regression eval suites",
          "Harden prompts against abuse",
          "Tune context vs cost trade-offs",
        ],
        experience: "3+ yrs avg",
        rateFrom: "$36/hr",
        hireTimeline: "1 week",
      },
    ],
  },
];

export function getTeamCategory(slug: string) {
  return teamCategories.find((c) => c.slug === slug);
}

export function getAllTeamRoles(): (TeamRole & { categorySlug: string; categoryTitle: string })[] {
  return teamCategories.flatMap((c) =>
    c.roles.map((r) => ({ ...r, categorySlug: c.slug, categoryTitle: c.title }))
  );
}

export function getTeamRole(slug: string) {
  for (const c of teamCategories) {
    const role = c.roles.find((r) => r.slug === slug);
    if (role) return { role, category: c };
  }
  return null;
}

export interface VettingStage {
  n: string;
  title: string;
  copy: string;
  stat: string;
}

export const vettingProcess: VettingStage[] = [
  {
    n: "01",
    title: "Profile screening",
    copy: "1,200+ applications land every month. Only senior profiles with shipped, verifiable work move forward — the rest never reach your shortlist.",
    stat: "1,200+ profiles / month",
  },
  {
    n: "02",
    title: "Live technical rounds",
    copy: "90-minute live coding plus a system-design review run by our principal engineers. No take-home puzzles that prove nothing.",
    stat: "5+ interview hrs / candidate",
  },
  {
    n: "03",
    title: "Paid trial project",
    copy: "Finalists complete a real, paid 2-day build in your stack — judged on code quality, communication and ownership, not certificates.",
    stat: "Real work, real review",
  },
  {
    n: "04",
    title: "Communication & culture",
    copy: "English fluency, async writing, timezone overlap and client handling — because great code with poor communication still fails.",
    stat: "4.8/5 client-ready score",
  },
  {
    n: "05",
    title: "Only 3% join the pool",
    copy: "Accepted specialists sign NDAs, document their work and stay interview-ready. Everyone else is a polite no.",
    stat: "3% acceptance rate",
  },
];
