import { u } from "@/lib/images";

export interface ServiceContent {
  visual: { image: string; alt: string };
  headline: string;
  highlight: string;
  intro: string;
  audience: string[];
  outcomes: { title: string; problem: string; solution: string }[];
  capabilities: { title: string; copy: string; points: string[] }[];
  useCases: { title: string; copy: string }[];
  process: { title: string; copy: string }[];
  faqs: { question: string; answer: string }[];
  related: string[];
}

export const serviceContent: Record<string, ServiceContent> = {
  "web-development": {
    visual: { image: u("1522202176988-66273c2fd55f"), alt: "A team collaborating around a shared workspace" },
    "headline": "Your next big idea.",
    "highlight": "Built for the web.",
    "intro": "From your first impression to your most important customer workflow, we build websites and web applications that are easy to use, fast to load and ready to evolve.",
    "audience": [
      "Growing businesses",
      "SaaS teams",
      "E-commerce brands"
    ],
    "outcomes": [
      {
        "title": "Turn visits into action",
        "problem": "People arrive, but struggle to find the next step.",
        "solution": "Clear journeys, useful content and purposeful calls to action help visitors enquire, sign up or buy."
      },
      {
        "title": "Make performance a feature",
        "problem": "Slow pages get between customers and your product.",
        "solution": "We plan rendering, images and loading around real devices, then measure performance before launch."
      },
      {
        "title": "Keep your team in control",
        "problem": "Every content update becomes a developer request.",
        "solution": "A structured CMS and documented components make everyday updates easier for your team."
      }
    ],
    "capabilities": [
      {
        "title": "Marketing websites",
        "copy": "A clear story, responsive pages and conversion journeys built around your audience.",
        "points": [
          "Content structure & landing pages",
          "Responsive, accessible interfaces",
          "Search-friendly page architecture"
        ]
      },
      {
        "title": "Web apps & customer portals",
        "copy": "Useful software for the workflows that spreadsheets and disconnected tools cannot handle.",
        "points": [
          "Account and dashboard experiences",
          "Role-based user journeys",
          "API and business-system integrations"
        ]
      },
      {
        "title": "Commerce experiences",
        "copy": "Connect product discovery, checkout and order management in a coherent buying experience.",
        "points": [
          "Catalog, search & product pages",
          "Payment and checkout integration",
          "Order and inventory connections"
        ]
      },
      {
        "title": "Modernisation & migrations",
        "copy": "Improve an existing website without losing sight of its content, users or search visibility.",
        "points": [
          "Code and performance audit",
          "Content migration & redirect planning",
          "Testing, release & rollback planning"
        ]
      }
    ],
    "useCases": [
      {
        "title": "Launch a SaaS product",
        "copy": "Bring onboarding, billing and your core product workflow into a focused first release."
      },
      {
        "title": "Upgrade a company website",
        "copy": "Give your team a clearer brand story and a site they can update themselves."
      },
      {
        "title": "Connect customer operations",
        "copy": "Replace email-based requests with a portal for status, documents and approvals."
      }
    ],
    "process": [
      {
        "title": "Map the journey",
        "copy": "Agree on users, conversion goals, content and the smallest useful release."
      },
      {
        "title": "Design the experience",
        "copy": "Review wireframes, responsive screens and the components that tie them together."
      },
      {
        "title": "Build and validate",
        "copy": "Develop in increments with review links, functional checks and performance testing."
      },
      {
        "title": "Launch with confidence",
        "copy": "Connect analytics, verify redirects and hand over deployment and editing guidance."
      }
    ],
    "faqs": [
      {
        "question": "Can you improve our existing website?",
        "answer": "Yes. We first review the code, content, integrations and performance. The proposal then separates what can stay, what needs rebuilding and how the migration will work."
      },
      {
        "question": "Will our team be able to update content?",
        "answer": "Where a CMS is part of the scope, we set up the content types and editing workflow, then include guidance for your editors."
      },
      {
        "question": "Are SEO and accessibility included?",
        "answer": "We address technical SEO foundations, semantic structure, responsive layouts and keyboard access. Content campaigns or a formal accessibility audit can be scoped separately."
      },
      {
        "question": "What happens after launch?",
        "answer": "We agree the handover, warranty and ongoing support scope in the proposal. That can include maintenance, performance reviews and a roadmap for later releases."
      }
    ],
    "related": [
      "ui-ux-design",
      "cloud-solutions",
      "digital-marketing"
    ]
  },
  "app-development": {
    visual: { image: u("1561070791-2526d30994b5"), alt: "Interface design materials for a digital product" },
    "headline": "An idea worth opening.",
    "highlight": "An app worth keeping.",
    "intro": "Build a mobile experience that earns a place in your customers’ daily lives. We connect thoughtful product design with dependable iOS and Android engineering.",
    "audience": [
      "Product founders",
      "Consumer brands",
      "Field operations teams"
    ],
    "outcomes": [
      {
        "title": "Make the first session count",
        "problem": "A confusing first experience sends new users away.",
        "solution": "Focused onboarding and clear navigation help people reach the useful part of your app sooner."
      },
      {
        "title": "Work beyond perfect Wi-Fi",
        "problem": "Connectivity changes when users leave their desks.",
        "solution": "Offline behaviour, local storage and recovery flows are designed around the places your app will be used."
      },
      {
        "title": "Release with visibility",
        "problem": "Crashes and device-specific issues are hard to reproduce.",
        "solution": "Beta testing and crash reporting give your team a clearer picture before and after release."
      }
    ],
    "capabilities": [
      {
        "title": "Product definition & prototyping",
        "copy": "Shape a useful first release before committing to a large feature list.",
        "points": [
          "User flows & feature priorities",
          "Interactive app prototype",
          "Platform and architecture choices"
        ]
      },
      {
        "title": "iOS & Android development",
        "copy": "Choose native or cross-platform delivery around your product’s actual needs.",
        "points": [
          "React Native or Flutter builds",
          "Native device integrations",
          "Responsive mobile interfaces"
        ]
      },
      {
        "title": "Connected mobile workflows",
        "copy": "Bring your app, backend and customer communications together.",
        "points": [
          "Authentication & API integration",
          "Offline storage and sync",
          "Push notifications & deep links"
        ]
      },
      {
        "title": "Testing & store preparation",
        "copy": "Prepare the experience and release materials for real users.",
        "points": [
          "Device and journey testing",
          "Beta builds & crash reporting",
          "Store assets and submission support"
        ]
      }
    ],
    "useCases": [
      {
        "title": "Launch a customer app",
        "copy": "Give customers a convenient way to book, buy, manage accounts or receive updates."
      },
      {
        "title": "Equip a field team",
        "copy": "Let staff record jobs, upload evidence and sync their work when connectivity returns."
      },
      {
        "title": "Extend an existing platform",
        "copy": "Bring the most valuable workflows from your web product to a mobile experience."
      }
    ],
    "process": [
      {
        "title": "Define the first release",
        "copy": "Map users, device needs, integrations and what the MVP must prove."
      },
      {
        "title": "Prototype the flows",
        "copy": "Test the key screens and interactions before building the full experience."
      },
      {
        "title": "Build and beta-test",
        "copy": "Ship reviewable builds and validate behaviour across the agreed devices."
      },
      {
        "title": "Prepare for release",
        "copy": "Support store submission and hand over release, monitoring and support guidance."
      }
    ],
    "faqs": [
      {
        "question": "Should we choose native or cross-platform?",
        "answer": "It depends on device integrations, performance needs, team skills and budget. We assess those trade-offs before choosing the implementation."
      },
      {
        "question": "Can the app work offline?",
        "answer": "Yes, for suitable workflows. We define what is stored locally, how changes sync and how conflicts are handled when the device reconnects."
      },
      {
        "question": "Do you handle app store submissions?",
        "answer": "We can prepare builds, listings and submission materials. Store accounts remain yours, and final approval and review timing are controlled by Apple and Google."
      },
      {
        "question": "Can you connect to our existing backend?",
        "answer": "Yes. We review API availability, authentication and data contracts first, then identify any backend changes needed for the mobile experience."
      }
    ],
    "related": [
      "ui-ux-design",
      "web-development",
      "cloud-solutions"
    ]
  },
  "cloud-solutions": {
    visual: { image: u("1551288049-bebda4e38f71"), alt: "Data dashboards used to understand system performance" },
    "headline": "A stronger foundation.",
    "highlight": "Room for what’s next.",
    "intro": "Move from infrastructure that needs constant attention to a cloud foundation your team understands. We plan, migrate and improve systems with reliability, cost and day-to-day operations in mind.",
    "audience": [
      "Scaling SaaS teams",
      "IT leaders",
      "Businesses modernising infrastructure"
    ],
    "outcomes": [
      {
        "title": "Know where your spend goes",
        "problem": "Cloud bills grow without a clear view of the cause.",
        "solution": "Cost allocation, right-sizing reviews and budget alerts make infrastructure choices easier to evaluate."
      },
      {
        "title": "Make recovery a plan",
        "problem": "Backups exist, but restoring service is uncertain.",
        "solution": "Recovery objectives, restore exercises and practical runbooks turn resilience into an operational workflow."
      },
      {
        "title": "Build for change",
        "problem": "Infrastructure depends on manual setup and tribal knowledge.",
        "solution": "Versioned infrastructure and repeatable environments make changes easier to review and reproduce."
      }
    ],
    "capabilities": [
      {
        "title": "Cloud architecture & landing zones",
        "copy": "Establish the account, network and access foundations for your workloads.",
        "points": [
          "Workload and dependency review",
          "Identity and network design",
          "Environment and governance structure"
        ]
      },
      {
        "title": "Migration & modernisation",
        "copy": "Move applications and data through a controlled, testable transition.",
        "points": [
          "Migration sequencing",
          "Data transfer and validation",
          "Cutover and rollback planning"
        ]
      },
      {
        "title": "Platforms & automation",
        "copy": "Use managed services, containers or serverless where they fit the workload.",
        "points": [
          "Infrastructure as code",
          "Container or serverless deployment",
          "Environment provisioning"
        ]
      },
      {
        "title": "Reliability & cost management",
        "copy": "Give your team the tools to operate and improve the platform.",
        "points": [
          "Monitoring and budget alerts",
          "Backup and recovery runbooks",
          "Capacity and cost reviews"
        ]
      }
    ],
    "useCases": [
      {
        "title": "Move beyond one server",
        "copy": "Plan a cloud foundation for an application that has outgrown its original setup."
      },
      {
        "title": "Modernise an existing estate",
        "copy": "Consolidate environments, remove unnecessary complexity and document ownership."
      },
      {
        "title": "Prepare for growth",
        "copy": "Review capacity, recovery and operating cost before a major launch or expansion."
      }
    ],
    "process": [
      {
        "title": "Assess the estate",
        "copy": "Inventory workloads, dependencies, costs and operational requirements."
      },
      {
        "title": "Design the foundation",
        "copy": "Agree architecture, access controls, recovery objectives and migration stages."
      },
      {
        "title": "Migrate and validate",
        "copy": "Move in phases with application checks and a documented rollback path."
      },
      {
        "title": "Transfer operational control",
        "copy": "Hand over infrastructure code, dashboards, runbooks and a prioritised improvement plan."
      }
    ],
    "faqs": [
      {
        "question": "Do we need to move everything at once?",
        "answer": "Usually not. A phased approach lets us test representative workloads and validate dependencies before committing the rest of the estate."
      },
      {
        "question": "Which cloud should we choose?",
        "answer": "We evaluate your existing contracts, team experience, workload needs and cost model. AWS and Azure are options; the decision follows the assessment."
      },
      {
        "question": "Can you guarantee zero downtime?",
        "answer": "Cutover requirements depend on the application and data layer. We agree an acceptable maintenance window or a migration strategy designed to minimise interruption, with rollback steps."
      },
      {
        "question": "Will our team own the infrastructure?",
        "answer": "Your organisation should control its cloud accounts. The agreed handover includes infrastructure definitions and operating documentation so your team can manage the environment."
      }
    ],
    "related": [
      "devops-automation",
      "cybersecurity",
      "web-development"
    ]
  },
  "ui-ux-design": {
    visual: { image: u("1547658719-da2b51169166"), alt: "A website design displayed on a computer" },
    "headline": "Less friction.",
    "highlight": "More “that makes sense.”",
    "intro": "Turn a complex product into an experience people can understand. We combine research, interaction design and visual systems to help your team make better product decisions.",
    "audience": [
      "Product teams",
      "Early-stage founders",
      "Businesses redesigning a platform"
    ],
    "outcomes": [
      {
        "title": "Understand what users need",
        "problem": "Feature decisions rely on internal assumptions.",
        "solution": "Research and journey mapping make user goals, constraints and friction visible."
      },
      {
        "title": "Validate before you build",
        "problem": "Expensive development starts before the flow is clear.",
        "solution": "Interactive prototypes help your team evaluate the experience while changes are still inexpensive."
      },
      {
        "title": "Design with consistency",
        "problem": "Each new screen introduces a different pattern.",
        "solution": "Reusable components and clear interaction rules give designers and developers a shared system."
      }
    ],
    "capabilities": [
      {
        "title": "Research & experience strategy",
        "copy": "Understand the people, tasks and context behind the product.",
        "points": [
          "Stakeholder and user interviews",
          "Journey mapping & UX audits",
          "Opportunity prioritisation"
        ]
      },
      {
        "title": "Interaction & product design",
        "copy": "Make complex tasks feel clear and manageable.",
        "points": [
          "Information architecture",
          "User flows and wireframes",
          "Interactive prototypes"
        ]
      },
      {
        "title": "Visual design & systems",
        "copy": "Create a recognisable product language that can grow with your team.",
        "points": [
          "Responsive interface design",
          "Reusable Figma components",
          "Typography, colour and state rules"
        ]
      },
      {
        "title": "Validation & developer handoff",
        "copy": "Connect design decisions to evidence and implementation.",
        "points": [
          "Usability testing",
          "Feedback and iteration",
          "Specifications & implementation reviews"
        ]
      }
    ],
    "useCases": [
      {
        "title": "Improve a difficult workflow",
        "copy": "Untangle a long onboarding flow, complex dashboard or confusing checkout."
      },
      {
        "title": "Validate a new product",
        "copy": "Explore a product concept with a clickable prototype before commissioning a full build."
      },
      {
        "title": "Unify a growing platform",
        "copy": "Bring disconnected screens and teams together around a common design system."
      }
    ],
    "process": [
      {
        "title": "Listen and map",
        "copy": "Define users, business goals and the questions research needs to answer."
      },
      {
        "title": "Explore the structure",
        "copy": "Review journeys, wireframes and alternative approaches to key tasks."
      },
      {
        "title": "Design and test",
        "copy": "Build a visual prototype and use feedback to refine the experience."
      },
      {
        "title": "Equip your builders",
        "copy": "Deliver organised design files, component guidance and handoff documentation."
      }
    ],
    "faqs": [
      {
        "question": "Can we start with a UX audit?",
        "answer": "Yes. An audit can identify friction and prioritise changes before you commit to a broader redesign."
      },
      {
        "question": "Will we receive editable design files?",
        "answer": "The agreed design deliverables include editable Figma files and the component or prototype assets listed in the scope."
      },
      {
        "question": "How do you validate the designs?",
        "answer": "We agree research and testing methods around the project. These may include user interviews, task-based prototype testing and reviews with your product team."
      },
      {
        "question": "Can you work with our developers?",
        "answer": "Yes. We organise components and specifications for handoff and can include implementation reviews to help preserve the intended experience."
      }
    ],
    "related": [
      "web-development",
      "app-development",
      "digital-marketing"
    ]
  },
  "devops-automation": {
    visual: { image: u("1558494949-ef010cbdcc31"), alt: "Server infrastructure supporting digital applications" },
    "headline": "Every release.",
    "highlight": "Make shipping routine.",
    "intro": "Give developers a dependable path to production. We connect build pipelines, environments and observability so your team can release software with less manual coordination.",
    "audience": [
      "Engineering teams",
      "Platform leads",
      "Teams growing their release cadence"
    ],
    "outcomes": [
      {
        "title": "Remove release bottlenecks",
        "problem": "Deployments depend on a person and a long checklist.",
        "solution": "Repeatable pipelines and clear approvals turn release steps into an auditable workflow."
      },
      {
        "title": "See the system clearly",
        "problem": "Logs, metrics and alerts tell disconnected stories.",
        "solution": "A connected observability setup helps teams investigate issues with useful context."
      },
      {
        "title": "Recover with confidence",
        "problem": "A failed deployment becomes an improvised response.",
        "solution": "Release controls, rollback procedures and runbooks make recovery part of the delivery design."
      }
    ],
    "capabilities": [
      {
        "title": "CI/CD pipelines",
        "copy": "Build a repeatable path from a code change to a reviewed release.",
        "points": [
          "Build and test automation",
          "Deployment approvals",
          "Artifact and secret handling"
        ]
      },
      {
        "title": "Developer environments",
        "copy": "Reduce the gap between local development, review and production.",
        "points": [
          "Containerised workloads",
          "Preview environments",
          "Repeatable environment setup"
        ]
      },
      {
        "title": "Observability & response",
        "copy": "Help your team distinguish useful signals from noise.",
        "points": [
          "Logs, metrics and traces",
          "Actionable dashboards & alerts",
          "Incident and recovery runbooks"
        ]
      },
      {
        "title": "Platform practices",
        "copy": "Make safe delivery easier to repeat across teams.",
        "points": [
          "GitOps workflows",
          "Policy and configuration checks",
          "Delivery metrics and improvement backlog"
        ]
      }
    ],
    "useCases": [
      {
        "title": "Replace manual deployments",
        "copy": "Automate recurring release steps for a team currently deploying by hand."
      },
      {
        "title": "Support multiple teams",
        "copy": "Standardise environments and deployment patterns as repositories and teams grow."
      },
      {
        "title": "Improve production visibility",
        "copy": "Connect dashboards, alert ownership and incident response for critical services."
      }
    ],
    "process": [
      {
        "title": "Baseline delivery",
        "copy": "Map the current pipeline, failure points and release responsibilities."
      },
      {
        "title": "Design the workflow",
        "copy": "Agree environments, checks, approvals and the recovery path."
      },
      {
        "title": "Automate and exercise",
        "copy": "Implement the pipeline and validate it with representative changes and failures."
      },
      {
        "title": "Enable the team",
        "copy": "Document ownership, train maintainers and establish a delivery metrics baseline."
      }
    ],
    "faqs": [
      {
        "question": "Do we need Kubernetes?",
        "answer": "Not necessarily. We choose the deployment approach around the application and the team’s ability to operate it. Simpler platforms are often sufficient."
      },
      {
        "question": "Can you improve our current pipeline?",
        "answer": "Yes. We can audit and incrementally improve an existing setup instead of replacing the whole toolchain."
      },
      {
        "question": "Will automation remove approval controls?",
        "answer": "No. Automated testing and deployment can still include manual approvals, protected environments and a clear audit trail."
      },
      {
        "question": "How do you measure improvement?",
        "answer": "We agree a baseline and relevant delivery measures, such as deployment frequency, change lead time and recovery time. Improvement is evaluated against your own context."
      }
    ],
    "related": [
      "cloud-solutions",
      "cybersecurity",
      "web-development"
    ]
  },
  "cybersecurity": {
    visual: { image: u("1558494949-ef010cbdcc31"), alt: "Server infrastructure within a data centre" },
    "headline": "Know your exposure.",
    "highlight": "Strengthen what matters.",
    "intro": "Understand your risks and build a practical path to address them. We help teams assess applications and cloud environments, prioritise remediation and prepare for security reviews.",
    "audience": [
      "SaaS businesses",
      "Security and IT teams",
      "Teams preparing for customer audits"
    ],
    "outcomes": [
      {
        "title": "Prioritise the real risks",
        "problem": "A long list of findings makes it difficult to act.",
        "solution": "A risk-led assessment connects technical weaknesses to business impact and remediation priorities."
      },
      {
        "title": "Make improvements actionable",
        "problem": "A report arrives without a path to resolution.",
        "solution": "Clear reproduction details and remediation guidance help engineering teams work through the findings."
      },
      {
        "title": "Prepare for scrutiny",
        "problem": "Evidence and responsibilities are scattered across teams.",
        "solution": "Readiness work organises controls, ownership and evidence for customer or auditor conversations."
      }
    ],
    "capabilities": [
      {
        "title": "Application security assessment",
        "copy": "Review the agreed application scope for weaknesses and risky assumptions.",
        "points": [
          "Threat modelling",
          "Authorised penetration testing",
          "Authentication and access review"
        ]
      },
      {
        "title": "Cloud security hardening",
        "copy": "Examine identity, configuration and exposure across cloud environments.",
        "points": [
          "Access and privilege review",
          "Configuration and exposure checks",
          "Prioritised hardening guidance"
        ]
      },
      {
        "title": "Compliance readiness",
        "copy": "Prepare your team and evidence for a structured assessment.",
        "points": [
          "Control and gap mapping",
          "Evidence collection guidance",
          "SOC 2 / ISO 27001 readiness support"
        ]
      },
      {
        "title": "Incident preparedness",
        "copy": "Clarify how your team will respond when something goes wrong.",
        "points": [
          "Response roles and escalation",
          "Incident playbooks",
          "Tabletop exercises and follow-up actions"
        ]
      }
    ],
    "useCases": [
      {
        "title": "Review a product before launch",
        "copy": "Assess an agreed release scope and resolve prioritised findings before wider exposure."
      },
      {
        "title": "Prepare for enterprise customers",
        "copy": "Organise security controls and evidence needed for procurement conversations."
      },
      {
        "title": "Strengthen cloud access",
        "copy": "Review permissions and exposed services as your infrastructure and team grow."
      }
    ],
    "process": [
      {
        "title": "Agree scope and rules",
        "copy": "Define authorised targets, testing windows, access and escalation contacts."
      },
      {
        "title": "Assess the environment",
        "copy": "Review the agreed controls and investigate weaknesses within the approved scope."
      },
      {
        "title": "Prioritise and remediate",
        "copy": "Present findings with impact, evidence and practical remediation steps."
      },
      {
        "title": "Retest and hand over",
        "copy": "Validate agreed fixes and deliver the final report and next-step recommendations."
      }
    ],
    "faqs": [
      {
        "question": "Will testing affect our production systems?",
        "answer": "Testing rules, environments and acceptable techniques are agreed before work begins. Where appropriate, we use staging and carefully scheduled production checks."
      },
      {
        "question": "Does readiness support include certification?",
        "answer": "No. Readiness support helps prepare controls and evidence. Certification or attestation is performed by the relevant independent assessor."
      },
      {
        "question": "Will you help our engineers fix findings?",
        "answer": "Remediation guidance is part of the assessment handover. Hands-on implementation support and retesting are defined in the engagement scope."
      },
      {
        "question": "What access do you need?",
        "answer": "Access depends on the assessment. We agree the minimum necessary accounts, documentation and target permissions during scoping."
      }
    ],
    "related": [
      "cloud-solutions",
      "devops-automation",
      "web-development"
    ]
  },
  "ai-ml": {
    visual: { image: u("1551288049-bebda4e38f71"), alt: "Data visualisations and analytics dashboards" },
    "headline": "Useful intelligence.",
    "highlight": "Built around your data.",
    "intro": "Move from an AI idea to a feature you can evaluate. We build focused copilots, document workflows and predictive models with attention to data quality, user control and operating cost.",
    "audience": [
      "Product teams",
      "Operations leaders",
      "Data-rich businesses"
    ],
    "outcomes": [
      {
        "title": "Start with a useful problem",
        "problem": "AI experiments run without a clear success criterion.",
        "solution": "A focused use case and evaluation plan connect the pilot to a task people actually need to complete."
      },
      {
        "title": "Make quality measurable",
        "problem": "An impressive demo does not reveal its failure cases.",
        "solution": "Representative test sets and error analysis help you assess quality before wider rollout."
      },
      {
        "title": "Control the operating model",
        "problem": "Latency, privacy and cost emerge late in development.",
        "solution": "We consider data access, human review and inference costs from the beginning of the design."
      }
    ],
    "capabilities": [
      {
        "title": "Knowledge copilots",
        "copy": "Help users find and work with information in approved sources.",
        "points": [
          "Retrieval and indexing pipelines",
          "Source-aware answers",
          "Permission-aware access design"
        ]
      },
      {
        "title": "Document intelligence",
        "copy": "Turn repeated document tasks into a reviewable workflow.",
        "points": [
          "Extraction and classification",
          "Validation and review queues",
          "Integration with existing systems"
        ]
      },
      {
        "title": "Predictive models",
        "copy": "Use available historical data to explore useful forecasts and signals.",
        "points": [
          "Data quality assessment",
          "Forecasting or churn pilots",
          "Baseline and model comparison"
        ]
      },
      {
        "title": "Evaluation & operations",
        "copy": "Make quality and operational trade-offs visible.",
        "points": [
          "Evaluation datasets and metrics",
          "Monitoring and human feedback",
          "Cost modelling and deployment guidance"
        ]
      }
    ],
    "useCases": [
      {
        "title": "Find internal knowledge",
        "copy": "Prototype a copilot that retrieves relevant information from approved company documents."
      },
      {
        "title": "Reduce document handling",
        "copy": "Extract structured fields and route uncertain results to a human reviewer."
      },
      {
        "title": "Plan with better signals",
        "copy": "Explore demand or retention forecasts against a simple, measurable baseline."
      }
    ],
    "process": [
      {
        "title": "Frame the opportunity",
        "copy": "Agree the task, data sources, constraints and what success would look like."
      },
      {
        "title": "Build a focused pilot",
        "copy": "Create a representative end-to-end workflow using a limited scope."
      },
      {
        "title": "Evaluate the trade-offs",
        "copy": "Review quality, failure cases, latency and cost against agreed criteria."
      },
      {
        "title": "Integrate and monitor",
        "copy": "Connect the validated workflow with access controls, feedback and operating guidance."
      }
    ],
    "faqs": [
      {
        "question": "Do we need a large dataset?",
        "answer": "It depends on the use case. Retrieval-based applications can start with a useful document collection, while predictive models need appropriate historical examples."
      },
      {
        "question": "How do you handle incorrect outputs?",
        "answer": "We evaluate representative tasks, surface sources where appropriate and design review or fallback paths. No generative system can promise error-free outputs."
      },
      {
        "question": "What about private company data?",
        "answer": "We scope data permissions, retention and hosting requirements before selecting the approach. Access controls and permitted data flows are part of the architecture."
      },
      {
        "question": "Can we start small?",
        "answer": "Yes. A bounded pilot with a clear evaluation plan helps you decide whether to improve, expand or stop before a larger investment."
      }
    ],
    "related": [
      "cloud-solutions",
      "web-development",
      "cybersecurity"
    ]
  },
  "digital-marketing": {
    visual: { image: u("1441986300917-64674bd600d8"), alt: "A retail setting representing a customer-facing business" },
    "headline": "Turn attention",
    "highlight": "into meaningful growth.",
    "intro": "Connect your search visibility, campaigns and customer journeys to business goals. We help you build a measurable marketing programme with clear priorities and a regular improvement cycle.",
    "audience": [
      "Growing brands",
      "B2B businesses",
      "E-commerce teams"
    ],
    "outcomes": [
      {
        "title": "Bring measurement together",
        "problem": "Channels report activity without a shared view of value.",
        "solution": "Tracking and reporting connect campaign decisions to enquiries, sales and the outcomes you care about."
      },
      {
        "title": "Improve the whole journey",
        "problem": "More traffic arrives, but the landing experience loses it.",
        "solution": "Campaign messaging and on-site improvements work together to address conversion friction."
      },
      {
        "title": "Build a learning cycle",
        "problem": "Marketing becomes a series of disconnected launches.",
        "solution": "A prioritised experiment backlog and recurring reviews help your team learn what to improve next."
      }
    ],
    "capabilities": [
      {
        "title": "Search & content foundations",
        "copy": "Make your site easier to discover and its content more useful.",
        "points": [
          "Technical SEO review",
          "Search intent and content planning",
          "On-page improvements"
        ]
      },
      {
        "title": "Paid acquisition",
        "copy": "Build campaigns around a clear audience, message and destination.",
        "points": [
          "Search and social campaign setup",
          "Creative and landing-page alignment",
          "Budget and performance reviews"
        ]
      },
      {
        "title": "Lifecycle marketing",
        "copy": "Support customers beyond the first click or purchase.",
        "points": [
          "Email and CRM journeys",
          "Audience segmentation",
          "Lead nurture and retention flows"
        ]
      },
      {
        "title": "Measurement & optimisation",
        "copy": "Turn channel reporting into practical next steps.",
        "points": [
          "Analytics and conversion tracking",
          "Attribution-aware reporting",
          "Experiment planning and reviews"
        ]
      }
    ],
    "useCases": [
      {
        "title": "Build a qualified pipeline",
        "copy": "Connect content, campaigns and lead nurturing around the customers your sales team needs."
      },
      {
        "title": "Improve store conversion",
        "copy": "Align ads, landing pages and lifecycle communication across the buying journey."
      },
      {
        "title": "Make marketing measurable",
        "copy": "Clean up tracking and agree the metrics that will guide channel and budget decisions."
      }
    ],
    "process": [
      {
        "title": "Audit the funnel",
        "copy": "Review audiences, channels, tracking and the current customer journey."
      },
      {
        "title": "Prioritise the plan",
        "copy": "Agree goals, channel focus, budgets and the first set of experiments."
      },
      {
        "title": "Launch and measure",
        "copy": "Implement the agreed campaigns, content and tracking improvements."
      },
      {
        "title": "Learn and iterate",
        "copy": "Review results, explain trade-offs and refine the next cycle of work."
      }
    ],
    "faqs": [
      {
        "question": "Is advertising spend included in the fee?",
        "answer": "Media spend, platform subscriptions and creative production costs are agreed separately unless explicitly included in the proposal."
      },
      {
        "question": "How quickly will we see results?",
        "answer": "Timing depends on the channel, baseline and buying cycle. Paid campaigns can generate early signals; organic visibility and retention programmes usually need longer to evaluate."
      },
      {
        "question": "Can you guarantee rankings or revenue?",
        "answer": "No. Results depend on competition, demand, your offer and other factors. We agree measurable goals and report performance transparently."
      },
      {
        "question": "Will we own our marketing accounts?",
        "answer": "Your business should retain ownership of advertising, analytics and CRM accounts. Access, reporting and handover responsibilities are defined when we start."
      }
    ],
    "related": [
      "web-development",
      "ui-ux-design",
      "ai-ml"
    ]
  }
};

export const getServiceContent = (slug: string): ServiceContent | undefined =>
  Object.hasOwn(serviceContent, slug) ? serviceContent[slug] : undefined;
