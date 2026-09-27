import type { Post, Project, Job, Testimonial } from "@/types";
import { u } from "@/lib/images";

export const projects: Project[] = [
  {
    slug: "medicare-plus-portal",
    title: "MediCare+ Patient Portal",
    client: "MediCare+ Group",
    industry: "Healthcare",
    image: u("1576091160550-2173dba999ef"),
    summary: "FHIR-powered portal with telehealth, prescriptions and smart reminders across 40 clinics.",
    results: [
      { label: "No-shows", value: "-38%" },
      { label: "Portal MAU", value: "210k" },
      { label: "Rating", value: "4.9★" },
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "FHIR"],
    year: "2025",
  },
  {
    slug: "paynest-ledger",
    title: "PayNest Realtime Ledger",
    client: "PayNest",
    industry: "Fintech",
    image: u("1556742049-0cfed4f6a45d"),
    summary: "Event-sourced ledger with instant settlement, KYC orchestration and fraud rules engine.",
    results: [
      { label: "Fraud loss", value: "-61%" },
      { label: "Settlement", value: "<2s" },
      { label: "TPM", value: "48k" },
    ],
    stack: ["Node.js", "Kafka", "Redis", "AWS"],
    year: "2025",
  },
  {
    slug: "velvetkart-headless",
    title: "VelvetKart Headless Commerce",
    client: "VelvetKart",
    industry: "E-commerce",
    image: u("1441986300917-64674bd600d8"),
    summary: "Sub-second headless storefront with AI search, one-page checkout and loyalty automation.",
    results: [
      { label: "Conversion", value: "+52%" },
      { label: "Mobile LCP", value: "1.1s" },
      { label: "AOV", value: "+19%" },
    ],
    stack: ["Next.js", "Shopify", "Algolia", "Klaviyo"],
    year: "2024",
  },
  {
    slug: "learnloop-lms",
    title: "LearnLoop Cohort LMS",
    client: "LearnLoop",
    industry: "Education",
    image: u("1522202176988-66273c2fd55f"),
    summary: "Cohort LMS with live rooms, auto-graded assessments and early-warning analytics.",
    results: [
      { label: "Completion", value: "+47%" },
      { label: "Learners", value: "120k" },
      { label: "NPS", value: "68" },
    ],
    stack: ["React", "WebRTC", "Python", "GCP"],
    year: "2024",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const posts: Post[] = [
  {
    slug: "nextjs-seo-playbook-2026",
    title: "The Next.js SEO Playbook We Use on Every Client Site",
    excerpt: "Metadata, streaming, sitemaps and Core Web Vitals — the exact checklist behind our 95+ Lighthouse scores.",
    image: u("1432888622747-4eb9a8efeb07"),
    author: "Aarav Nain",
    date: "2026-08-14",
    readTime: "8 min",
    tags: ["Next.js", "SEO", "Performance"],
    content: [
      "Most SEO advice stops at meta tags. In production, rankings are won in the rendering layer: what streams first, what shifts layout, and what Googlebot can crawl without JavaScript.",
      "Our baseline is strict: server-render critical content, stream the rest with Suspense, and keep LCP under 1.5s on mid-tier mobile. next/image with priority on the hero, font subsetting, and route-level code splitting do most of the heavy lifting.",
      "Then comes structured data. Every service and article page ships JSON-LD, canonical URLs and Open Graph images at 1200×630. Finally we verify in Search Console and field data — lab scores alone never ship.",
    ],
  },
  {
    slug: "rag-copilot-costs",
    title: "Shipping a RAG Copilot Without Burning $30k/month",
    excerpt: "Chunking, caching and eval harnesses — how we keep AI pilots grounded and affordable.",
    image: u("1620712943543-bcc4688e7485"),
    author: "Sana Kapoor",
    date: "2026-07-02",
    readTime: "6 min",
    tags: ["AI", "RAG", "MLOps"],
    content: [
      "RAG demos are easy; production copilots are not. Hallucinations, stale chunks and runaway inference bills kill most pilots before they reach users.",
      "We start with evals: 200+ golden Q&A pairs scored on faithfulness before any UI work. Then hybrid retrieval — dense vectors plus BM25 — with aggressive caching of common queries.",
      "The result is typically a 60–70% cost cut versus naive implementations, with grounded answers your support team can trust.",
    ],
  },
  {
    slug: "dora-metrics-that-matter",
    title: "DORA Metrics Your CTO Actually Cares About",
    excerpt: "Deployment frequency is vanity. Change-failure rate and MTTR pay the bills — here's our DevOps baseline.",
    image: u("1555066931-4365d14bab8c"),
    author: "Rohan Mehta",
    date: "2026-05-20",
    readTime: "5 min",
    tags: ["DevOps", "Platform"],
    content: [
      "Elite teams don't just ship fast — they recover fast. We instrument four signals on every engagement: lead time, frequency, change-failure rate and MTTR.",
      "Preview environments per PR, trunk-based development and progressive delivery get you most of the way there. The rest is culture: blameless retros and error budgets.",
    ],
  },
  {
    "slug": "designing-digital-products-for-people",
    "title": "Better Products Start With Better Questions",
    "excerpt": "Before the wireframes and design systems, get clear on the people, problems, and decisions that matter.",
    "image": u("1561070791-2526d30994b5"),
    "author": "NainIT Editorial Team",
    "date": "2026-05-12",
    "readTime": "2 min",
    "tags": [
      "Design",
      "UX",
      "Product"
    ],
    "headings": [
      "Start with the task",
      "Make the next step clear",
      "Learn from real use"
    ],
    "content": [
      "A useful design brief begins with a task, not a screen. Describe what someone is trying to achieve, what triggers that need, and what makes the task difficult today. For a service business, that might mean helping a prospective customer understand whether a team has the right experience before they book a call. Interview the people who perform the task and observe their existing process. Pay attention to workarounds: the spreadsheet, copied email, or repeated phone call often reveals the problem the product needs to solve.",
      "Once the task is clear, map the smallest complete journey. Every screen should answer three questions: where am I, what can I do here, and what happens next? Use labels that match the language customers use. Show constraints before someone submits a form, preserve their input when validation fails, and provide a clear recovery path when something goes wrong. Include keyboard navigation, visible focus, readable contrast, and meaningful headings in the initial design rather than treating accessibility as a final review.",
      "A prototype is a question you can put in front of a person. Ask participants to complete a realistic task without coaching them through the interface. Record where they hesitate, what they misunderstand, and whether they reach the intended outcome. Prioritize changes by the severity of the obstacle, then test again. After launch, combine task completion data with customer conversations. A polished interface is valuable when it makes the work easier; the measure of success is whether people can confidently finish what they came to do."
    ]
  },
  {
    "slug": "modular-software-before-microservices",
    "title": "Build for Growth. Start With Clear Boundaries.",
    "excerpt": "A practical way to think about software architecture before adding more services, infrastructure, and complexity.",
    "image": u("1558494949-ef010cbdcc31"),
    "author": "NainIT Editorial Team",
    "date": "2026-04-28",
    "readTime": "2 min",
    "tags": [
      "Engineering",
      "Architecture",
      "Platform"
    ],
    "headings": [
      "Name the responsibilities",
      "Separate decisions before deployments",
      "Make change observable"
    ],
    "content": [
      "Architecture is a collection of decisions about how a system can change. Begin by naming the responsibilities in your product: identity, billing, catalog, scheduling, or reporting. Give each responsibility an owner and define the information it needs from the others. When every part of the application can reach into every database table, even a small feature can become a coordination problem. Clear module boundaries make those dependencies visible while keeping the deployment process manageable.",
      "A module does not need to become a separate service to have a clear interface. Start with explicit inputs, outputs, and rules for data ownership inside the application. Keep business decisions separate from delivery details such as HTTP handlers and queue clients. Consider a separate service when there is a concrete reason, such as independent scaling, a distinct reliability requirement, or a team that needs to release independently. Include the operational cost in that decision: network failures, tracing, access control, and data consistency all become part of the work.",
      "Whichever structure you choose, make it possible to understand a change in production. Record useful events, propagate request identifiers, and define the signals that indicate a feature is behaving correctly. Plan how to roll back a release and how to handle data written by both old and new code during deployment. Document important tradeoffs in short decision records. Future engineers need to understand why a boundary exists so they can revise it intentionally when the product changes."
    ]
  },
  {
    "slug": "from-product-idea-to-useful-first-release",
    "title": "Your First Release Should Answer One Big Question",
    "excerpt": "Turn a long feature wishlist into a focused product launch that helps your team learn what to build next.",
    "image": u("1522202176988-66273c2fd55f"),
    "author": "NainIT Editorial Team",
    "date": "2026-04-14",
    "readTime": "2 min",
    "tags": [
      "Strategy",
      "Product",
      "Delivery"
    ],
    "headings": [
      "Write down the uncertainty",
      "Choose a complete small journey",
      "Plan the decision after launch"
    ],
    "content": [
      "A new product begins with assumptions. Someone has a problem, that problem matters enough to act on, and your proposed solution fits how they work. Write these assumptions down before turning the idea into a backlog. Choose the uncertainty that would most change your plan if it proved false. For a booking product, the important question might be whether customers will complete a reservation without speaking to a person. That question gives the first release a purpose beyond simply making the product available.",
      "A focused release should still let someone finish a meaningful task. A reservation flow may need availability, a confirmation, and a way to correct a mistake, while advanced reporting can wait. Map the complete journey and distinguish what is essential to trust from what is convenient to add later. Agree on acceptance criteria using concrete examples. Include support, empty states, permissions, and recovery from failures in the scope so that early users encounter a coherent experience.",
      "Before launch, decide what evidence will guide the next investment. Track the key steps in the journey and invite users to explain where they got stuck. Keep a record of support requests alongside product analytics; a completed transaction can still hide frustration. Schedule a review with the people who can change the roadmap. The outcome might be to improve the current flow, test a different audience, or expand the product. A useful first release creates enough evidence to make that next decision deliberately."
    ]
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const jobs: Job[] = [
  {
    id: "FE-26",
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer (Next.js)",
    team: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    salary: "₹18–28 LPA",
    description:
      "Own flagship client builds end-to-end — from Figma to 95+ Lighthouse production deploys. You'll set frontend standards across the studio and mentor mid-level engineers.",
    responsibilities: [
      "Lead Next.js App Router builds with SSR/SSG and streaming",
      "Own Core Web Vitals budgets and accessibility (WCAG 2.2 AA)",
      "Build and maintain our shared UI kit and motion patterns",
      "Review code and mentor two mid-level engineers",
    ],
    requirements: [
      "4+ years with React, 2+ with Next.js App Router",
      "Deep TypeScript, Tailwind and Framer Motion experience",
      "Portfolio of production sites with 90+ Lighthouse scores",
      "Clear async communication — we are remote-first",
    ],
  },
  {
    id: "AI-11",
    slug: "ai-engineer",
    title: "AI Engineer (RAG / LLM Apps)",
    team: "AI Lab",
    location: "Remote",
    type: "Full-time",
    salary: "₹22–35 LPA",
    description:
      "Ship grounded AI copilots on real client data — retrieval pipelines, eval harnesses and cost-aware inference. No demo-ware; everything you build reaches production users.",
    responsibilities: [
      "Design RAG pipelines: chunking, hybrid retrieval, reranking",
      "Build eval harnesses (faithfulness, latency, cost per query)",
      "Productionise pilots with guardrails, caching and MLOps",
      "Prototype new AI offerings with the lab team",
    ],
    requirements: [
      "2+ years with LLM apps (LangChain, LlamaIndex or custom)",
      "Strong Python; vector DB experience (Pinecone, pgvector, Qdrant)",
      "Understanding of evals — you measure before you ship",
      "Bonus: fine-tuning or small-model deployment experience",
    ],
  },
  {
    id: "DX-07",
    slug: "product-designer",
    title: "Product Designer (UI/UX)",
    team: "Design",
    location: "Hybrid",
    type: "Full-time",
    salary: "₹14–22 LPA",
    description:
      "Lead discovery-to-handoff design for 2–3 client products at a time. Research, systems and prototypes — with engineers who actually implement your specs faithfully.",
    responsibilities: [
      "Run discovery sprints: interviews, journeys, JTBD",
      "Own Figma design systems (variables, components, docs)",
      "Deliver interactive prototypes and usability test rounds",
      "Partner with engineers through build and QA",
    ],
    requirements: [
      "3+ years designing shipped web/mobile products",
      "Systems thinking — tokens, variants, documentation",
      "Motion sensibility (prototype-level, not just static)",
      "Portfolio showing process, not just pretty screens",
    ],
  },
  {
    id: "BE-14",
    slug: "backend-engineer",
    title: "Backend Engineer (Node.js / Postgres)",
    team: "Engineering",
    location: "On-site · Noida",
    type: "Full-time",
    salary: "₹16–26 LPA",
    description:
      "Own APIs and data pipelines for client platforms serving millions of requests. Event-driven design, strict SLAs, zero-downtime deploys.",
    responsibilities: [
      "Design and ship Node.js + PostgreSQL services",
      "Own queues, caching and background workers",
      "Write load tests and hold the p99 budget",
      "Pair with frontend on API contracts",
    ],
    requirements: [
      "3+ years with Node.js in production",
      "Deep PostgreSQL — indexing, EXPLAIN, migrations",
      "Redis / BullMQ or similar experience",
      "You write tests without being asked",
    ],
  },
  {
    id: "QA-05",
    slug: "qa-automation-engineer",
    title: "QA Automation Engineer",
    team: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    salary: "₹10–16 LPA",
    description:
      "Be the last line of defence before production. Build Playwright suites that catch regressions while developers sleep.",
    responsibilities: [
      "Build and maintain Playwright E2E suites",
      "Own regression checklists per release",
      "File crisp, reproducible bug reports",
      "Push quality metrics into every sprint",
    ],
    requirements: [
      "2+ years with Cypress or Playwright",
      "API testing with Postman / k6 basics",
      "CI integration experience (GitHub Actions)",
      "Ruthless attention to edge cases",
    ],
  },
  {
    id: "PM-09",
    slug: "technical-project-manager",
    title: "Technical Project Manager",
    team: "Delivery",
    location: "Remote",
    type: "Full-time",
    salary: "₹18–30 LPA",
    description:
      "Run 2–3 client engagements end-to-end — scope, sprints, demos and honest status updates. You shield the team and delight the client.",
    responsibilities: [
      "Own scope, sprint plans and release calendars",
      "Run weekly client demos and async updates",
      "Flag risks early with mitigation options",
      "Keep Jira/Linear a source of truth, not a graveyard",
    ],
    requirements: [
      "3+ years running software projects",
      "Enough technical depth to challenge estimates",
      "Excellent written English — async-first",
      "Bonus: agency or multi-client experience",
    ],
  },
  {
    id: "DO-03",
    slug: "devops-engineer",
    title: "DevOps Engineer (AWS / K8s)",
    team: "Platform",
    location: "Remote",
    type: "Contract",
    salary: "₹2.2–3 LPM",
    description:
      "Give client teams preview environments, one-command deploys and dashboards they trust. Six-month contract with strong conversion-to-full-time history.",
    responsibilities: [
      "Build CI/CD with preview envs (GitHub Actions, ArgoCD)",
      "Manage AWS landing zones and Kubernetes clusters",
      "Stand up observability: logs, metrics, traces, alerts",
      "Write runbooks and coach client devs on-call",
    ],
    requirements: [
      "3+ years with AWS in production; Terraform mandatory",
      "Kubernetes (EKS) and GitOps workflows",
      "Incident experience — you stay calm when graphs go red",
      "Bonus: FinOps wins you can quantify",
    ],
  },
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);

export const testimonials: Testimonial[] = [
  { name: "Dr. Elena Ruiz", role: "COO, MediCare+ Group", quote: "NainIT rebuilt our patient platform without disrupting a single clinic day. No-shows dropped 38% in one quarter.", rating: 5 },
  { name: "Daniel Osei", role: "Founder, PayNest", quote: "Ledger-grade engineering with startup speed. Their fraud rules paid for the whole engagement in month two.", rating: 5 },
  { name: "Priya Sharma", role: "CMO, VelvetKart", quote: "Our storefront went from 4.2s to 1.1s LCP — and conversion followed. The most ROI-positive agency call I've made.", rating: 5 },
];

export const stats = [
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 14, suffix: "", label: "Industries served" },
  { value: 40, suffix: "+", label: "Engineers & designers" },
];
