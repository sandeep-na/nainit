import { u } from "@/lib/images";

export interface IndustryProject {
  title: string;
  client: string;
  summary: string;
  problem: string;
  image: string;
  results: { label: string; value: string }[];
  stack: string[];
  year: string;
}

export interface IndustryContent {
  slug: string;
  hero: { headline: string; highlight: string; accent: string; imageLabel: string };
  overview: string[];
  badges: string[];
  capabilities: { title: string; copy: string }[];
  offerings: { title: string; points: string[] }[];
  banner1Title: string;
  banner1Copy: string;
  banner1Points: string[];
  projects: IndustryProject[];
  workflow: { title: string; before: string; after: string }[];
  process: { title: string; copy: string }[];
  testimonial: { quote: string; name: string; role: string };
  banner2Title: string;
  banner2Copy: string;
  faqs: { q: string; a: string }[];
}

export const industryContent: Record<string, IndustryContent> = {
  healthcare: {
    slug: "healthcare",
    workflow: [
      { title: "Appointments", before: "Staff chase confirmations and missed visits.", after: "Scheduling and reminders keep patients connected to their next appointment." },
      { title: "Patient records", before: "Records sit across clinical systems and separate reports.", after: "Patient portals and EHR integrations bring care information into the workflow." },
      { title: "Follow-up care", before: "Patients rely on calls to check reports and next steps.", after: "Digital prescriptions, report delivery and follow-up journeys make next steps accessible." },
    ],
    hero: {"headline": "Better care.", "highlight": "Beautifully connected.", "accent": "#5eead4", "imageLabel": "Technology with a human touch"},
    overview: [
      "Clinics, labs aur digital-health startups ke liye hum HIPAA-aware portals, telehealth aur EHR integrations banate hain — bina clinic workflow tode.",
      "Appointment scheduling, e-prescriptions, lab reports aur patient engagement — sab kuch ek secure, fast aur clinician-friendly platform me.",
    ],
    badges: ["HIPAA-aware", "FHIR / HL7", "ABDM Ready", "99.99% Uptime SLA"],
    capabilities: [
      { title: "Patient Portals", copy: "Appointments, reports, prescriptions aur payments — ek clean portal me." },
      { title: "Telehealth & E-Rx", copy: "Video consults, digital prescriptions aur follow-up reminders." },
      { title: "EHR / FHIR Integrations", copy: "Legacy EHR, labs aur pharmacy systems se interoperable sync." },
      { title: "Smart Scheduling", copy: "No-show prediction, SMS/WhatsApp reminders aur waitlist automation." },
      { title: "Clinical Analytics", copy: "Doctor load, patient flow aur outcome dashboards for management." },
      { title: "Data Privacy & Security", copy: "Role-based access, audit logs, encryption aur data residency." },
    ],
    offerings: [
      {
        title: "For Clinics & Hospitals",
        points: ["Multi-doctor scheduling & token system", "OPD / IPD workflows + billing", "WhatsApp reminders — no-show −38%", "Doctor & receptionist dashboards"],
      },
      {
        title: "For Digital Health Startups",
        points: ["Telehealth MVP in 6–8 weeks", "FHIR APIs + health-record vault", "Subscription & insurance billing", "App Store-ready patient apps"],
      },
    ],
    banner1Title: "Clinical workflows, without the chaos",
    banner1Copy:
      "40+ clinics par live hamara patient platform — doctors ko kam clicks, patients ko kam waiting, management ko full visibility.",
    banner1Points: ["210k monthly active patients", "4.9★ patient rating", "Zero clinic-day downtime during migration"],
    projects: [
      {
        title: "MediCare+ Patient Portal",
        problem: "Missed appointments and disconnected patient records made it harder to coordinate care across clinics.",
        client: "MediCare+ Group",
        summary: "FHIR-powered portal with telehealth, prescriptions and smart reminders across 40 clinics.",
        image: u("1576091160550-2173dba999ef"),
        results: [
          { label: "No-shows", value: "-38%" },
          { label: "Portal MAU", value: "210k" },
          { label: "Rating", value: "4.9★" },
        ],
        stack: ["Next.js", "Node.js", "PostgreSQL", "FHIR"],
        year: "2025",
      },
      {
        title: "CareLoop Telehealth Suite",
        problem: "Patients needed an easier way to complete remote consultations and follow-ups, with less time spent waiting.",
        client: "CareLoop Clinics",
        summary: "Video OPD, e-prescriptions aur Hindi/English follow-up bots — tier-2 cities ke liye optimized.",
        image: u("1638202993928-7267aad84c31"),
        results: [
          { label: "Consult completion", value: "+52%" },
          { label: "Avg. wait time", value: "-41%" },
          { label: "Repeat visits", value: "+29%" },
        ],
        stack: ["React", "WebRTC", "Node.js", "Redis"],
        year: "2024",
      },
      {
        title: "LabSync Reports Engine",
        problem: "Coordinating samples and report delivery across collection centres created delays and repeated support enquiries.",
        client: "NovaPath Labs",
        summary: "80+ collection centres se real-time sample tracking, auto-report delivery aur doctor alerts.",
        image: u("1579154204601-01588f351e67"),
        results: [
          { label: "Report TAT", value: "-46%" },
          { label: "Support calls", value: "-57%" },
          { label: "Centres live", value: "80+" },
        ],
        stack: ["Next.js", "Python", "PostgreSQL", "AWS"],
        year: "2024",
      },
    ],
    process: [
      { title: "Clinical discovery", copy: "Doctors, staff aur patients se shadowing — real workflow mapping." },
      { title: "Compliance-first design", copy: "Privacy, consent aur audit trails day-one architecture me." },
      { title: "Pilot in 1 clinic", copy: "Single-location pilot, feedback loops, phir multi-clinic rollout." },
      { title: "Scale & support", copy: "Monitoring, backups aur clinician training with SLAs." },
    ],
    testimonial: {
      quote: "NainIT rebuilt our patient platform without disrupting a single clinic day. No-shows dropped 38% in one quarter.",
      name: "Dr. Elena Ruiz",
      role: "COO, MediCare+ Group",
    },
    banner2Title: "4.2x portal adoption in 90 days",
    banner2Copy: "Reminder automation + simple UX — patients actually use it, staff actually loves it.",
    faqs: [
      { q: "Kya aap existing EHR ke saath integrate karte ho?", a: "Haan — FHIR/HL7 APIs, custom connectors aur CSV/HL7 migrations. Pehle EHR audit karte hain, phir phased integration." },
      { q: "HIPAA / data privacy ka kya?", a: "Encryption at rest + in transit, role-based access, audit logs aur India region hosting options. BAA-ready architecture." },
      { q: "Timeline aur cost kya hogi?", a: "Clinic portal MVP 6–10 weeks. Fixed-scope proposal 48 hours me — features, timeline aur honest pricing ke saath." },
      { q: "Doctor aur staff training milti hai?", a: "Haan — on-site/remote training, Hindi/English manuals aur go-live ke baad 30-day hypercare." },
    ],
  },

  fintech: {
    slug: "fintech",
    workflow: [
      { title: "Reconciliation", before: "Finance teams investigate disconnected payment and settlement records.", after: "Event-sourced ledgers and reconciliation reports make transaction history traceable." },
      { title: "Onboarding", before: "Applicants move through separate verification and approval steps.", after: "Connected KYC and lending flows keep verification and decisions in one journey." },
      { title: "Risk review", before: "Teams react to suspicious transactions after a problem surfaces.", after: "Fraud rules and review queues bring risk checks into the transaction flow." },
    ],
    hero: {"headline": "Move money.", "highlight": "Build trust.", "accent": "#c4b5fd", "imageLabel": "Infrastructure for financial confidence"},
    overview: [
      "Payments, lending aur wealth platforms ke liye hum ledger-grade backends banate hain — real-time settlement, fraud controls aur audit-ready reporting ke saath.",
      "KYC se lekar reconciliation tak — risk kam, conversion zyada, aur regulators ke liye full traceability.",
    ],
    badges: ["PCI-DSS Conscious", "RBI Guidelines Aware", "Event-Sourced Ledgers", "<2s Settlement"],
    capabilities: [
      { title: "Realtime Ledgers", copy: "Double-entry, event-sourced ledgers — har paisa traceable." },
      { title: "Payments & Payouts", copy: "UPI, cards, netbanking + instant vendor payouts & refunds." },
      { title: "KYC / KYB Flows", copy: "Aadhaar, PAN, CKYC + video-KYC — high-conversion onboarding." },
      { title: "Fraud & Risk Engine", copy: "Velocity checks, device scoring aur custom block rules." },
      { title: "Lending Workflows", copy: "LOS/LMS, repayments, NACH/e-mandate aur collections." },
      { title: "Audit & Reconciliation", copy: "Auto-recon, settlement reports aur regulator-ready exports." },
    ],
    offerings: [
      {
        title: "For Payments & Wallets",
        points: ["UPI/collect + payout rails", "Refund & dispute workflows", "Fraud loss −61% with rules engine", "48k transactions per minute ready"],
      },
      {
        title: "For Lending & Wealth",
        points: ["Digital onboarding + e-sign", "Credit decisioning hooks", "SIP/portfolio dashboards", "NACH, mandate & reminder automation"],
      },
    ],
    banner1Title: "Every rupee reconciled, in real time",
    banner1Copy: "PayNest ka ledger humne zero-downtime migrate kiya — settlement ab seconds me, fraud rules minute me update.",
    banner1Points: ["<2s settlement latency", "−61% fraud losses", "100% audit-trail coverage"],
    projects: [
      {
        title: "PayNest Realtime Ledger",
        problem: "Payment operations needed faster settlement and stronger fraud controls, with a traceable record of every transaction.",
        client: "PayNest",
        summary: "Event-sourced ledger with instant settlement, KYC orchestration and fraud rules engine.",
        image: u("1556742049-0cfed4f6a45d"),
        results: [
          { label: "Fraud loss", value: "-61%" },
          { label: "Settlement", value: "<2s" },
          { label: "TPM", value: "48k" },
        ],
        stack: ["Node.js", "Kafka", "Redis", "AWS"],
        year: "2025",
      },
      {
        title: "LoanSetu LOS Platform",
        problem: "A lengthy loan application journey made it difficult for applicants to complete verification and reach approval.",
        client: "LoanSetu NBFC",
        summary: "End-to-end loan origination — KYC, bureau pulls, e-sign aur disbursal in under 20 minutes.",
        image: u("1554224155-6726b3ff858f"),
        results: [
          { label: "Onboarding conv.", value: "+44%" },
          { label: "Approval time", value: "-72%" },
          { label: "Drop-offs", value: "-35%" },
        ],
        stack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
        year: "2024",
      },
      {
        title: "WealthRails Dashboard",
        problem: "Investors needed a clearer view of their holdings and support to stay consistent with recurring investments.",
        client: "WealthRails",
        summary: "Mutual fund + stocks portfolio tracking with SIP nudges aur family-level reporting.",
        image: u("1590283603385-17ffb3a7f29f"),
        results: [
          { label: "User retention", value: "+38%" },
          { label: "SIP starts", value: "+51%" },
          { label: "App rating", value: "4.8★" },
        ],
        stack: ["React Native", "Node.js", "Redis", "GCP"],
        year: "2024",
      },
    ],
    process: [
      { title: "Risk & compliance mapping", copy: "Flows, limits, audit needs — pehle regulators ka lens." },
      { title: "Ledger architecture", copy: "Event-sourced core with idempotency aur replay safety." },
      { title: "Sandbox + UAT", copy: "Payment sandboxes, chaos tests aur finance-team UAT." },
      { title: "Go-live & monitoring", copy: "Real-time alerts, recon jobs aur incident runbooks." },
    ],
    testimonial: {
      quote: "Ledger-grade engineering with startup speed. Their fraud rules paid for the whole engagement in month two.",
      name: "Daniel Osei",
      role: "Founder, PayNest",
    },
    banner2Title: "+44% onboarding conversion",
    banner2Copy: "KYC jo convert kare — smart retries, vernacular help aur drop-off recovery built-in.",
    faqs: [
      { q: "Kya aap UPI / payment gateway integrate karte ho?", a: "Haan — Razorpay, Cashfree, Stripe plus direct UPI/bank rails. Idempotent webhooks aur auto-recon ke saath." },
      { q: "Security aur compliance?", a: "Tokenised PII, encrypted vaults, audit logs, maker-checker aur PCI-DSS-conscious infra patterns." },
      { q: "Fraud prevention kaise?", a: "Velocity limits, device fingerprinting, blocklists aur manual-review queues — rules dashboard ke saath." },
      { q: "Existing system migrate ho sakta hai?", a: "Haan — dual-run migration with reconciliation diffs, zero balance-mismatch guarantee approach." },
    ],
  },

  ecommerce: {
    slug: "ecommerce",
    workflow: [
      { title: "Product discovery", before: "Slow mobile pages and difficult search interrupt shopping.", after: "Fast storefronts and relevant search help shoppers reach the right products." },
      { title: "Checkout", before: "Payment friction and disconnected inventory create abandoned carts.", after: "Streamlined checkout connects payment options, stock and delivery choices." },
      { title: "Repeat purchases", before: "Customer communication stops after the first order.", after: "Loyalty and lifecycle journeys support abandoned-cart recovery and repeat orders." },
    ],
    hero: {"headline": "Beyond the cart.", "highlight": "Built for growth.", "accent": "#fda4af", "imageLabel": "Experiences that turn browsers into buyers"},
    overview: [
      "D2C brands aur retailers ke liye hum sub-second headless storefronts banate hain — smart search, one-click checkout aur retention automation ke saath.",
      "Traffic to revenue: speed, UX aur lifecycle marketing — teeno ek system me.",
    ],
    badges: ["Headless Commerce", "1.1s Mobile LCP", "AI Search", "+52% Conversion"],
    capabilities: [
      { title: "Headless Storefronts", copy: "Next.js storefronts — 1.1s LCP, SEO-ready, app-like feel." },
      { title: "AI Search & Recommendations", copy: "Typo-tolerant search, bundles aur 'you may like' rails." },
      { title: "One-Page Checkout", copy: "UPI, COD, EMI — address autofill aur zero-friction pay." },
      { title: "Inventory & OMS", copy: "Multi-warehouse stock, shiprocket-style dispatch flows." },
      { title: "Loyalty & Retention", copy: "Points, referrals, WhatsApp abandons + winback journeys." },
      { title: "Analytics & CRO", copy: "Funnel heatmaps, A/B tests aur weekly growth experiments." },
    ],
    offerings: [
      {
        title: "For D2C Brands",
        points: ["Shopify headless ya custom build", "Instagram + marketplace sync", "COD confirmation via WhatsApp", "Repeat purchase +33% playbooks"],
      },
      {
        title: "For Retail & B2B",
        points: ["Bulk ordering + credit limits", "Dealer portals & price lists", "GST invoicing automation", "Multi-store inventory sync"],
      },
    ],
    banner1Title: "From 4.2s to 1.1s — conversion followed",
    banner1Copy: "VelvetKart ka storefront rebuild — mobile speed, search aur checkout teeno fix, revenue compounded.",
    banner1Points: ["+52% conversion lift", "1.1s mobile LCP", "+19% average order value"],
    projects: [
      {
        title: "VelvetKart Headless Commerce",
        problem: "Slow mobile pages, difficult product discovery and checkout friction were holding back storefront conversion.",
        client: "VelvetKart",
        summary: "Sub-second headless storefront with AI search, one-page checkout and loyalty automation.",
        image: u("1441986300917-64674bd600d8"),
        results: [
          { label: "Conversion", value: "+52%" },
          { label: "Mobile LCP", value: "1.1s" },
          { label: "AOV", value: "+19%" },
        ],
        stack: ["Next.js", "Shopify", "Algolia", "Klaviyo"],
        year: "2024",
      },
      {
        title: "FreshMandee Grocery Express",
        problem: "Grocery ordering needed to bring delivery slots, available stock and rider updates into one checkout journey.",
        client: "FreshMandee",
        summary: "15-min delivery storefront — live slot booking, dark-store inventory aur rider tracking.",
        image: u("1542838132-92c53300491e"),
        results: [
          { label: "Checkout drop-off", value: "-42%" },
          { label: "Repeat orders", value: "+47%" },
          { label: "Peak orders/hr", value: "2.4k" },
        ],
        stack: ["Next.js", "Node.js", "Redis", "GCP"],
        year: "2025",
      },
      {
        title: "KraftKart Artisan Marketplace",
        problem: "Growing a multi-seller marketplace required simpler seller onboarding and consistent commission and payout workflows.",
        client: "KraftKart",
        summary: "Multi-seller marketplace — seller onboarding, commissions, payouts aur Hindi seller app.",
        image: u("1483985988355-763728e1935b"),
        results: [
          { label: "Sellers live", value: "1,200+" },
          { label: "GMV growth", value: "3.1x" },
          { label: "Payout TAT", value: "T+1" },
        ],
        stack: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
        year: "2024",
      },
    ],
    process: [
      { title: "Store audit", copy: "Speed, funnel leaks aur search quality — data-first teardown." },
      { title: "Design that sells", copy: "Mobile-first PDPs, trust badges aur urgency — without spam." },
      { title: "Build + migrate", copy: "Zero-downtime catalog, orders aur SEO redirect migration." },
      { title: "Grow loops", copy: "Abandons, loyalty aur CRO sprints every 2 weeks." },
    ],
    testimonial: {
      quote: "Our storefront went from 4.2s to 1.1s LCP — and conversion followed. The most ROI-positive agency call I've made.",
      name: "Priya Sharma",
      role: "CMO, VelvetKart",
    },
    banner2Title: "+33% repeat purchases",
    banner2Copy: "Loyalty + WhatsApp lifecycle — one-time buyers ko brand loyalists me badlo.",
    faqs: [
      { q: "Shopify ya custom — kya choose karu?", a: "Fast launch chahiye to headless Shopify; unique flows/B2B chahiye to custom. Audit ke baad recommend karte hain." },
      { q: "Mera existing catalog migrate hoga?", a: "Haan — products, customers, orders aur SEO URLs 301 redirects ke saath. Zero ranking-loss process." },
      { q: "COD aur returns handle hote hain?", a: "COD confirmation bots, fake-order filter, easy returns + refund workflows — RTO kam karne ke liye." },
      { q: "Speed guarantee?", a: "Target <1.5s mobile LCP on 4G. Image CDN, caching aur code budgets ke saath ship karte hain." },
    ],
  },

  education: {
    slug: "education",
    workflow: [
      { title: "Learning delivery", before: "Live sessions, recordings and assignments live in separate tools.", after: "Cohort learning brings live classes, recorded content and assignments together." },
      { title: "Assessments", before: "Manual evaluation delays feedback after tests.", after: "Auto-graded assessments return results and help learners identify gaps." },
      { title: "Student support", before: "Teachers find out about struggling learners too late.", after: "Progress analytics flag learners who need attention so educators can intervene." },
    ],
    hero: {"headline": "Spark curiosity.", "highlight": "Scale possibility.", "accent": "#fcd34d", "imageLabel": "A better way to teach, learn and grow"},
    overview: [
      "Coaching institutes, schools aur edtech startups ke liye hum LMS, cohort aur assessment platforms banate hain — jise learners actually complete karein.",
      "Live + recorded classes, secure tests aur early-warning analytics — teachers ke liye superpowers.",
    ],
    badges: ["Cohort LMS", "Live + Async", "Proctored Tests", "+47% Completion"],
    capabilities: [
      { title: "Cohort LMS", copy: "Batches, drips, assignments aur certificates — full academic ops." },
      { title: "Live Classrooms", copy: "Low-bandwidth live rooms, chat, polls aur auto-recordings." },
      { title: "Secure Assessments", copy: "Timer, shuffling, tab-switch alerts + auto-grading." },
      { title: "Video Delivery", copy: "Adaptive streaming, downloads control, −40% bandwidth cost." },
      { title: "Parent & Admin Apps", copy: "Fees, attendance, progress — multi-branch dashboards." },
      { title: "Learning Analytics", copy: "At-risk learners flagged early — intervention built-in." },
    ],
    offerings: [
      {
        title: "For Coachings & Schools",
        points: ["Batch + fee management", "Hindi/English test engine", "Parent WhatsApp updates", "Topper & attendance leaderboards"],
      },
      {
        title: "For Edtech Startups",
        points: ["Creator-led course funnels", "Community + doubt rooms", "Subscription & EMI billing", "120k learners scale-ready"],
      },
    ],
    banner1Title: "Courses learners actually finish",
    banner1Copy: "LearnLoop cohort LMS — live energy + async flexibility, teachers ko real-time signals.",
    banner1Points: ["+47% completion rate", "120k active learners", "68 learner NPS"],
    projects: [
      {
        title: "LearnLoop Cohort LMS",
        problem: "Low course completion and limited progress visibility made it difficult for teachers to identify learners who needed help.",
        client: "LearnLoop",
        summary: "Cohort LMS with live rooms, auto-graded assessments and early-warning analytics.",
        image: u("1522202176988-66273c2fd55f"),
        results: [
          { label: "Completion", value: "+47%" },
          { label: "Learners", value: "120k" },
          { label: "NPS", value: "68" },
        ],
        stack: ["React", "WebRTC", "Python", "GCP"],
        year: "2024",
      },
      {
        title: "RankUp Test Series",
        problem: "High-volume exam sessions needed reliable concurrent access and quick evaluation so learners could act on their results.",
        client: "RankUp Academy",
        summary: "NEET/JEE test platform — 40k concurrent test-takers, instant rank prediction aur video solutions.",
        image: u("1434030216411-0b793f4b4173"),
        results: [
          { label: "Concurrent users", value: "40k" },
          { label: "Eval time", value: "<3s" },
          { label: "Paid conversions", value: "+36%" },
        ],
        stack: ["Next.js", "Node.js", "Redis", "AWS"],
        year: "2025",
      },
      {
        title: "VidyaSetu School OS",
        problem: "School teams needed one view of attendance, fees and parent communication across multiple campuses.",
        client: "VidyaSetu Group",
        summary: "12 schools, one dashboard — attendance, fees, transport aur parent communication unified.",
        image: u("1509062522246-3755977927d7"),
        results: [
          { label: "Fee collection", value: "+58%" },
          { label: "Admin hours", value: "-34%" },
          { label: "Schools live", value: "12" },
        ],
        stack: ["React", "Node.js", "PostgreSQL", "GCP"],
        year: "2024",
      },
    ],
    process: [
      { title: "Academic mapping", copy: "Batches, subjects, test patterns — institute ka OS samajhte hain." },
      { title: "Pilot batch", copy: "Ek batch par launch, teacher feedback, phir full rollout." },
      { title: "Content migration", copy: "Videos, PDFs, question banks — structured import." },
      { title: "Outcomes loop", copy: "Completion analytics + parent reports every month." },
    ],
    testimonial: {
      quote: "Completion rates doubled. Teachers finally see which student needs help — before the exam, not after.",
      name: "Ananya Iyer",
      role: "Director, LearnLoop",
    },
    banner2Title: "−40% streaming cost, zero buffering",
    banner2Copy: "Smart CDN + offline downloads — tier-2/3 learners ke liye bhi smooth classes.",
    faqs: [
      { q: "Live classes ke liye kya chahiye?", a: "Browser-based rooms — no installs. 500kbps par bhi stable, auto-recording aur attendance ke saath." },
      { q: "Cheating kaise rokte ho?", a: "Shuffle, timers, tab alerts, IP checks aur optional webcam proctoring — exam-grade settings." },
      { q: "Existing videos/questions migrate honge?", a: "Haan — YouTube/drive links, PDFs aur Excel question banks bulk-import karte hain." },
      { q: "Fees collection bhi?", a: "UPI, EMI, reminders aur defaulter lists — full fee automation included." },
    ],
  },

  "real-estate": {
    slug: "real-estate",
    workflow: [
      { title: "Property discovery", before: "Buyers browse stale listings with limited ways to evaluate a property.", after: "Search, maps and virtual tours make properties easier to discover and compare." },
      { title: "Lead handoff", before: "Enquiries wait for manual assignment and follow-up.", after: "Instant routing and CRM workflows connect enquiries to the right agent." },
      { title: "Deal coordination", before: "Documents and follow-ups are spread across offline handoffs.", after: "Deal rooms and e-sign workflows keep closing steps organised and accessible." },
    ],
    hero: {"headline": "Open doors.", "highlight": "Create possibilities.", "accent": "#7dd3fc", "imageLabel": "From first discovery to the right address"},
    overview: [
      "Builders aur brokerages ke liye hum listing portals, virtual tours aur CRM pipelines banate hain — lead se lekar deal-close tak.",
      "Stale listings khatm, slow follow-ups khatm — sirf qualified site visits aur faster closings.",
    ],
    badges: ["MLS / IDX Ready", "3D Tours", "<60s Lead Routing", "E-sign Deals"],
    capabilities: [
      { title: "Portal-Grade Search", copy: "Map + filters — budget, BHK, possession, commute — instant." },
      { title: "3D Tours & Media", copy: "Virtual walkthroughs, drone galleries, floor-plan viewers." },
      { title: "Instant Lead Routing", copy: "<60s me right agent ko lead — WhatsApp + call automation." },
      { title: "Agent CRM", copy: "Follow-ups, site-visit tracking, broker commission splits." },
      { title: "Deal Rooms + E-sign", copy: "Token, agreements aur payments — paperless closing." },
      { title: "Builder Analytics", copy: "Source ROI, inventory velocity, price-heatmaps." },
    ],
    offerings: [
      {
        title: "For Builders",
        points: ["Project microsites in days", "Inventory + payment-plan engine", "Channel-partner portals", "Site-visit → booking funnel"],
      },
      {
        title: "For Brokerages",
        points: ["Multi-city listings sync", "Agent performance leaderboards", "Rental + resale workflows", "Owner/tenant verification"],
      },
    ],
    banner1Title: "From lead to site-visit in minutes",
    banner1Copy: "Ek 120-agent brokerage ka Cue — instant routing + tour scheduling ne qualified visits 58% badha diye.",
    banner1Points: ["<60s lead response", "+58% qualified tours", "−22% time-to-close"],
    projects: [
      {
        title: "UrbanNest Listings Portal",
        problem: "Property enquiries needed faster agent handoff and better discovery to turn interest into qualified site visits.",
        client: "UrbanNest Realty",
        summary: "Portal-grade search with map discovery, 3D tours and instant agent handoff across 3 cities.",
        image: u("1600596542815-ffad4c1539a9"),
        results: [
          { label: "Qualified tours", value: "+58%" },
          { label: "Lead response", value: "<60s" },
          { label: "Time to close", value: "-22%" },
        ],
        stack: ["Next.js", "Node.js", "PostgreSQL", "Mapbox"],
        year: "2025",
      },
      {
        title: "BuilderOne Microsites",
        problem: "Buyers and channel partners needed easier access to project inventory, cost sheets and payment plans.",
        client: "BuilderOne Group",
        summary: "8 project microsites — inventory pickers, cost sheets, payment plans aur CP tracking.",
        image: u("1541888946425-d81bb19240f5"),
        results: [
          { label: "Site visits", value: "+64%" },
          { label: "CP activations", value: "340+" },
          { label: "Cost/lead", value: "-31%" },
        ],
        stack: ["Next.js", "Strapi", "PostgreSQL", "AWS"],
        year: "2024",
      },
      {
        title: "RentEase Owner App",
        problem: "Owners needed to connect listings, tenant checks, rent collection and maintenance without losing track of tasks.",
        client: "RentEase",
        summary: "Rental listings, tenant verification, rent collection aur maintenance tickets — one app.",
        image: u("1560448204-e02f11c3d0e2"),
        results: [
          { label: "Listings live", value: "18k" },
          { label: "Rent on-time", value: "+41%" },
          { label: "Vacancy days", value: "-27%" },
        ],
        stack: ["React Native", "Node.js", "MongoDB", "GCP"],
        year: "2024",
      },
    ],
    process: [
      { title: "Inventory audit", copy: "Listings, sources aur leakage points — full funnel map." },
      { title: "Search + CRM build", copy: "Buyer-facing portal parallel with agent CRM." },
      { title: "Launch with brokers", copy: "Agent onboarding, scripts aur tour scheduling live." },
      { title: "Close-rate sprints", copy: "Source ROI + follow-up discipline, monthly." },
    ],
    testimonial: {
      quote: "Leads stopped leaking. Every enquiry reaches an agent in under a minute — closings followed.",
      name: "Vikram Malhotra",
      role: "Director, UrbanNest Realty",
    },
    banner2Title: "Paperless deal rooms",
    banner2Copy: "Token to registry — e-sign, payments aur documents, buyers aur CPs ke liye transparent.",
    faqs: [
      { q: "99acres/MagicBricks se leads integrate honge?", a: "Haan — portal APIs + IVR/call tracking se auto-capture, dedupe aur instant routing." },
      { q: "Fake/broker leads ka kya?", a: "OTP verification, scoring aur dedupe — agents ko sirf genuine, high-intent leads." },
      { q: "Agent adoption kaise ensure karte ho?", a: "Simple mobile-first CRM, Hindi support, 1-day training aur WhatsApp-based updates — no heavy software." },
      { q: "RERA compliance?", a: "RERA numbers, disclaimers aur carpet-area standards — designs me built-in." },
    ],
  },

  manufacturing: {
    slug: "manufacturing",
    workflow: [
      { title: "Production visibility", before: "Machine, shift and production records remain disconnected.", after: "IoT ingestion and MES dashboards give teams a shared view of the floor." },
      { title: "Maintenance", before: "Teams discover equipment problems when production stops.", after: "Machine telemetry and predictive alerts support earlier maintenance decisions." },
      { title: "Spares planning", before: "Reactive ordering creates stockouts or unnecessary inventory.", after: "Consumption forecasts and reorder levels help align spares with demand." },
    ],
    hero: {"headline": "Smarter floors.", "highlight": "Stronger outcomes.", "accent": "#fdba74", "imageLabel": "Connect your machines. Empower your people."},
    overview: [
      "Factories aur industrial groups ke liye hum IoT, MES aur predictive-maintenance platforms banate hain — downtime kam, quality up.",
      "OT + IT data ek dashboard par — machines, shifts aur spares, sab visible.",
    ],
    badges: ["IoT Ingestion", "Digital Twins", "Predictive Maintenance", "−45% Downtime"],
    capabilities: [
      { title: "IoT Ingestion", copy: "PLC/SCADA / sensors se secure pipelines — real-time telemetry." },
      { title: "Digital Twins", copy: "Line-level twins — throughput, OEE aur bottlenecks live." },
      { title: "Predictive Maintenance", copy: "Vibration/temperature models — breakdown se pehle alert." },
      { title: "Quality Vision", copy: "Camera-based defect checks — escapes −31%." },
      { title: "MES & Complaints", copy: "Work orders, shift logs, downtime reasons — paperless floor." },
      { title: "Spares & Inventory", copy: "Consumption forecasting — stockouts khatm, capital free." },
    ],
    offerings: [
      {
        title: "For Plant Heads",
        points: ["OEE + downtime war-rooms", "Shift-wise production tracking", "Energy & utilities monitoring", "WhatsApp breakdown alerts"],
      },
      {
        title: "For Industrial Groups",
        points: ["Multi-plant rollups", "Vendor & spares portals", "ISO/audit-ready logs", "SAP/Tally integrations"],
      },
    ],
    banner1Title: "Downtime you can predict",
    banner1Copy: "Auto-component plant me vibration models ne unplanned stoppages 45% kam kar diye — same machines, smarter ops.",
    banner1Points: ["−45% unplanned downtime", "−31% scrap rate", "+18pts OEE lift"],
    projects: [
      {
        title: "ForgeTrack MES",
        problem: "Unplanned stoppages and disconnected machine data limited visibility into production and maintenance needs.",
        client: "ForgeTrack Auto Parts",
        summary: "Shop-floor MES with machine telemetry, digital twins and predictive maintenance alerts.",
        image: u("1504328345606-18bbc8c9d7d1"),
        results: [
          { label: "Downtime", value: "-45%" },
          { label: "Scrap rate", value: "-31%" },
          { label: "OEE lift", value: "+18pts" },
        ],
        stack: ["Next.js", "Python", "MQTT", "AWS IoT"],
        year: "2025",
      },
      {
        title: "QVision Defect Guard",
        problem: "Production teams needed to catch quality defects earlier and keep image evidence of rejected items.",
        client: "QVision Plastics",
        summary: "Vision-based quality gates on 6 lines — real-time rejects with image evidence.",
        image: u("1581091226825-a6a2a5aee158"),
        results: [
          { label: "Escapes", value: "-63%" },
          { label: "Inspection cost", value: "-38%" },
          { label: "Lines live", value: "6" },
        ],
        stack: ["Python", "OpenCV", "Edge GPU", "GCP"],
        year: "2024",
      },
      {
        title: "SparesIQ Inventory",
        problem: "Multi-plant teams needed to reduce spare-part stockouts while avoiding excess inventory tied up on shelves.",
        client: "SparesIQ Group",
        summary: "Multi-plant spares optimisation — consumption forecasts aur auto-reorder levels.",
        image: u("1553413077-190dd305871c"),
        results: [
          { label: "Stockouts", value: "-52%" },
          { label: "Inventory value", value: "-24%" },
          { label: "Plants", value: "9" },
        ],
        stack: ["React", "Node.js", "PostgreSQL", "AWS"],
        year: "2024",
      },
    ],
    process: [
      { title: "Floor walkthrough", copy: "Machines, shifts, breakdown history — gemba-style discovery." },
      { title: "Pilot line", copy: "One line instrumented, ROI proven in 4–6 weeks." },
      { title: "Plant rollout", copy: "All lines + training for operators and maintenance." },
      { title: "Continuous OEE", copy: "Monthly reliability reviews + model retraining." },
    ],
    testimonial: {
      quote: "We finally see the floor in real time. Breakdowns are predicted, not discovered at 2am.",
      name: "Rajesh Khanna",
      role: "Plant Head, ForgeTrack",
    },
    banner2Title: "OEE +18 points in 2 quarters",
    banner2Copy: "Availability × Performance × Quality — har shift, har line, ek number me.",
    faqs: [
      { q: "Old machines (non-IoT) connect honge?", a: "Haan — retrofit sensors + gateways. PLC/SCADA ho ya manual logbooks, phased digitisation karte hain." },
      { q: "Internet shutdown par kya?", a: "Edge buffering — data local store, reconnect par sync. Floor kabhi blind nahi hota." },
      { q: "Operator training?", a: "Hindi/English tablet UI, 2-day floor training aur shift-wise champions program." },
      { q: "SAP/Tally integration?", a: "Production, spares aur dispatch data — SAP/Baan/Tally connectors available." },
    ],
  },
};

export const getIndustryContent = (slug: string): IndustryContent | undefined =>
  industryContent[slug];
