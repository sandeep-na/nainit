import type { Industry } from "@/types";
import { u } from "@/lib/images";

export const industries: Industry[] = [
  {
    slug: "healthcare",
    title: "Healthcare",
    tagline: "HIPAA-aware platforms for clinics, labs & digital health.",
    description:
      "Patient portals, telehealth and interoperable EHR integrations — engineered for uptime, privacy and clinical workflows.",
    image: u("1576091160399-112ba8d25d1d"),
    challenges: ["Legacy EHR integrations", "HIPAA & data residency", "Appointment no-shows", "Clinician burnout from tooling"],
    solutions: ["FHIR/HL7 integrations", "Telehealth + e-prescriptions", "Smart scheduling & reminders", "Clinician-first UX"],
    kpis: [
      { label: "No-show reduction", value: "-38%" },
      { label: "Portal adoption", value: "4.2x" },
      { label: "Uptime SLA", value: "99.99%" },
    ],
  },
  {
    slug: "fintech",
    title: "Fintech",
    tagline: "Ledger-grade backends for payments, lending & wealth.",
    description:
      "PCI-DSS-conscious architectures, real-time ledgers and KYC flows that convert without leaking risk.",
    image: u("1611974789855-9c2a0a7236a3"),
    challenges: ["Regulatory scrutiny", "Fraud & chargebacks", "Reconciliation pain", "Scaling transaction spikes"],
    solutions: ["Event-sourced ledgers", "KYC/KYB + risk rules", "Real-time settlement rails", "Audit-ready reporting"],
    kpis: [
      { label: "Fraud loss cut", value: "-61%" },
      { label: "Onboarding conversion", value: "+44%" },
      { label: "Settlement latency", value: "<2s" },
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    tagline: "Headless storefronts that turn traffic into revenue.",
    description:
      "Sub-second storefronts, smart search and one-click checkout — plus retention automation that compounds.",
    image: u("1472851294608-062f824d29cc"),
    challenges: ["Slow mobile pages", "Cart abandonment", "Fragmented inventory", "Rising CAC"],
    solutions: ["Headless Next.js storefronts", "AI search & recommendations", "One-page checkout", "Loyalty + lifecycle CRM"],
    kpis: [
      { label: "Conversion lift", value: "+52%" },
      { label: "LCP on mobile", value: "1.1s" },
      { label: "Repeat purchase", value: "+33%" },
    ],
  },
  {
    slug: "education",
    title: "Education",
    tagline: "LMS, cohort & assessment platforms learners finish.",
    description:
      "Video-first learning, proctored assessments and analytics that help educators intervene early.",
    image: u("1503676260728-1c00da094a0b"),
    challenges: ["Low course completion", "Video delivery costs", "Cheating in assessments", "Multi-tenant schools"],
    solutions: ["Adaptive learning paths", "Live + async classrooms", "Secure assessments", "Institution dashboards"],
    kpis: [
      { label: "Completion rate", value: "+47%" },
      { label: "Streaming cost", value: "-40%" },
      { label: "Learner NPS", value: "68" },
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    tagline: "Listings, tours & CRM pipelines for modern brokerages.",
    description:
      "Portal-grade search, virtual tours and agent workflows that shorten time-to-close.",
    image: u("1560518883-ce09059eeffa"),
    challenges: ["Stale listings data", "Lead response time", "Offline paperwork", "Agent adoption"],
    solutions: ["MLS/IDX integrations", "3D tours + maps search", "Instant lead routing", "E-sign deal rooms"],
    kpis: [
      { label: "Lead response", value: "<60s" },
      { label: "Qualified tours", value: "+58%" },
      { label: "Time to close", value: "-22%" },
    ],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    tagline: "IoT, MES & predictive maintenance for the shop floor.",
    description:
      "Sensor pipelines, digital twins and maintenance models that cut downtime and scrap.",
    image: u("1565043666747-69f6646db940"),
    challenges: ["Unplanned downtime", "Siloed OT/IT data", "Quality escapes", "Spare-parts stockouts"],
    solutions: ["IoT ingestion + twins", "Predictive maintenance", "Quality vision checks", "Inventory optimisation"],
    kpis: [
      { label: "Downtime cut", value: "-45%" },
      { label: "Scrap rate", value: "-31%" },
      { label: "OEE lift", value: "+18pts" },
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
