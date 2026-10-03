import {
  BrainCircuit,
  Building2,
  Clock,
  Code2,
  Cloud,
  Compass,
  Gauge,
  Globe,
  Handshake,
  Lightbulb,
  Mail,
  MapPin,
  Palette,
  Phone,
  Rocket,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";

/* =========================================================
   CONTACT PAGE — STATIC DATA
   ------------------------------------------------------------
   Every static value the page renders lives here so the
   components stay purely presentational and copy / contact
   details can be updated in one place.

   ⚠️  `contactChannels` holds clearly marked PLACEHOLDER values.
       Replace them with the real company details before launch.
   ========================================================= */

/** Id of the enquiry section — shared by the hero, final CTA and the form. */
export const CONTACT_FORM_ANCHOR_ID = "contact-form";

/* ------------------------------------------------------------
   PAGE COPY
   ------------------------------------------------------------ */

export const contactCopy = {
  hero: {
    eyebrow: "Let's build something great",
    titleLead: "Have an Idea?",
    titlePrefix: "Let's",
    titleAccent: "Turn It",
    titleSuffix: "Into Reality.",
    lead: "Whether you're launching a new product, transforming an existing business, or exploring what's possible with technology, we're ready to help.",
  },
  info: {
    eyebrow: "Get in touch",
    title: "Reach Us Directly",
    subtitle:
      "Pick whichever channel suits you. Every enquiry is read by a real person, usually within one business day.",
  },
  why: {
    eyebrow: "Why reach out",
    title: "Why Start a Conversation?",
    subtitle:
      "A short first message is enough to get a clear point of view, an honest estimate and a clear next step.",
  },
  process: {
    eyebrow: "How we work",
    title: "How We Work",
    subtitle:
      "A predictable path from a rough idea to something live — with a review point at every stage.",
  },
  cta: {
    eyebrow: "Ready when you are",
    title: "Let's Build What's Next.",
    text: "Have a project in mind? Let's turn your idea into something people can use, love, and remember.",
  },
};

/* ------------------------------------------------------------
   HERO
   ------------------------------------------------------------ */

export const heroMeta = [
  { id: "reply", icon: Timer, label: "Replies within a day" },
  { id: "nda", icon: ShieldCheck, label: "NDA friendly" },
  { id: "remote", icon: Globe, label: "Remote, worldwide" },
];

/** Availability card shown beside the hero copy. */
export const heroPanel = {
  status: "Available for new projects",
  label: "Next step",
  title: "A free 30-minute discovery call",
  text: "Bring the rough idea. We will help you shape the scope, the stack and the timeline.",
  rows: [
    { id: "reply", label: "Reply time", value: "Under 1 day" },
    { id: "engagement", label: "Engagement", value: "Project or Retainer" },
    { id: "format", label: "Format", value: "Call, Email or Chat" },
  ],
};

/** Decorative floating labels around the hero panel. */
export const heroChips = [
  { id: "ai", icon: BrainCircuit, label: "AI / ML", top: "4%", left: "-14%", delay: "0s" },
  { id: "design", icon: Palette, label: "UI/UX", top: "46%", left: "-16%", delay: "0.4s" },
  { id: "cloud", icon: Cloud, label: "Cloud", top: "86%", left: "-10%", delay: "0.8s" },
];

/** Background particles — decorative only, positions are percentages. */
export const heroParticles = [
  { id: "p01", left: "6%", top: "18%", size: 3, delay: "0s", duration: "14s", drift: 24 },
  { id: "p02", left: "16%", top: "62%", size: 2, delay: "1.2s", duration: "17s", drift: -19 },
  { id: "p03", left: "27%", top: "12%", size: 4, delay: "2.4s", duration: "19s", drift: 28 },
  { id: "p04", left: "38%", top: "78%", size: 2, delay: "0.7s", duration: "15s", drift: -24 },
  { id: "p05", left: "49%", top: "30%", size: 3, delay: "3.1s", duration: "16s", drift: 21 },
  { id: "p06", left: "61%", top: "72%", size: 2, duration: "18s", delay: "1.8s", drift: -22 },
  { id: "p07", left: "72%", top: "16%", size: 3, delay: "2.1s", duration: "13s", drift: 26 },
  { id: "p08", left: "84%", top: "54%", size: 2, delay: "3.6s", duration: "20s", drift: -17 },
  { id: "p09", left: "93%", top: "28%", size: 4, delay: "1s", duration: "21s", drift: 23 },
  { id: "p10", left: "10%", top: "44%", size: 2, delay: "4.1s", duration: "18s", drift: -20 },
  { id: "p11", left: "90%", top: "82%", size: 2, delay: "2.7s", duration: "17s", drift: 18 },
  { id: "p12", left: "45%", top: "8%", size: 2, delay: "5.2s", duration: "22s", drift: -16 },
];

/** Thin animated connection lines drawn behind the hero. */
export const heroLinePaths = [
  { id: "l01", d: "M-60 470 C 240 380, 420 300, 700 210 S 1120 70, 1280 30" },
  { id: "l02", d: "M-60 300 C 300 260, 560 320, 840 250 S 1140 140, 1280 120" },
  { id: "l03", d: "M-60 130 C 260 180, 480 120, 760 190 S 1080 300, 1280 260" },
];

/* ------------------------------------------------------------
   CONTACT CHANNELS
   ------------------------------------------------------------ */

export const contactChannels = [
  {
    id: "email",
    icon: Mail,
    title: "Email",
    // PLACEHOLDER — kept in step with the CMS default in
    // backend/routes/contactContentRoutes.js.
    value: "hello@fascave.com",
    href: "mailto:hello@fascave.com",
    note: "Best for briefs, files and follow-ups.",
  },
  {
    id: "phone",
    icon: Phone,
    title: "Phone",
    // PLACEHOLDER — replace with the real number.
    value: "+91 XXXXX XXXXX",
    // Add `href: "tel:+91XXXXXXXXXX"` once a real number is available.
    href: null,
    note: "Quick questions, scheduling and walkthroughs.",
  },
  {
    id: "location",
    icon: MapPin,
    title: "Location",
    // PLACEHOLDER — replace with the real location.
    value: "India",
    href: null,
    note: "Working remotely with clients across time zones.",
  },
  {
    id: "hours",
    icon: Clock,
    title: "Working Hours",
    value: "Mon – Fri",
    detail: "9:00 AM – 6:00 PM",
    href: null,
    note: "Messages sent outside these hours are answered next day.",
  },
];

/* ------------------------------------------------------------
   ENQUIRY FORM
   ------------------------------------------------------------ */

export const projectTypes = [
  "Web Development",
  "App Development",
  "AI / ML",
  "UI/UX Design",
  "3D / Animation",
  "Digital Marketing",
  "Cloud / DevOps",
  "Custom Solution",
];

export const budgetOptions = [
  "Under ₹50K",
  "₹50K – ₹1L",
  "₹1L – ₹5L",
  "₹5L+",
  "Let's Discuss",
];

/**
 * Step definitions drive the whole wizard: the progress indicator, the
 * field rendering and the per-step validation all read from here.
 */
export const formSteps = [
  {
    id: "identity",
    shortTitle: "You",
    title: "Who are you?",
    description: "Just the basics, so we know who we're replying to.",
    fields: [
      {
        name: "name",
        type: "text",
        label: "Name",
        required: true,
        autoComplete: "name",
        maxLength: 80,
      },
      {
        name: "email",
        type: "email",
        label: "Email",
        required: true,
        autoComplete: "email",
        inputMode: "email",
        maxLength: 120,
      },
    ],
  },
  {
    id: "project",
    shortTitle: "Project",
    title: "What are you building?",
    description: "A little context helps us bring the right people in.",
    fields: [
      {
        name: "company",
        type: "text",
        label: "Company",
        autoComplete: "organization",
        maxLength: 100,
      },
      {
        name: "phone",
        type: "tel",
        label: "Phone",
        inputMode: "tel",
        autoComplete: "tel",
        maxLength: 20,
      },
      {
        name: "projectType",
        type: "select",
        label: "Project Type",
        required: true,
        options: projectTypes,
      },
    ],
  },
  {
    id: "details",
    shortTitle: "Details",
    title: "Tell us more",
    description: "Context, goals and anything you already know about the build.",
    fields: [
      {
        name: "budget",
        type: "select",
        label: "Budget",
        required: true,
        options: budgetOptions,
      },
      {
        name: "message",
        type: "textarea",
        label: "Message",
        required: true,
        rows: 5,
        maxLength: 2000,
        hint: "A few sentences is plenty — goals, deadlines, links.",
      },
    ],
  },
  {
    id: "review",
    shortTitle: "Review",
    type: "review",
    title: "Ready to connect?",
    description: "Check the details below, then send it across.",
  },
];

/**
 * Derived from `formSteps` so field names are defined in exactly one place.
 *
 * `trap` is the honeypot. It is not part of any step — it is rendered
 * outside the wizard flow and never validated — so it is added here
 * rather than to a step, which keeps it out of `validateForm` and the
 * review list.
 */
export const initialContactValues = Object.freeze({
  ...formSteps.reduce(
    (values, step) => ({
      ...values,
      ...(step.fields ?? []).reduce(
        (fields, field) => ({ ...fields, [field.name]: "" }),
        {},
      ),
    }),
    {},
  ),
  trap: "",
});

/** Field order used by the final review step. */
export const reviewRows = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "company", label: "Company" },
  { name: "phone", label: "Phone" },
  { name: "projectType", label: "Project Type" },
  { name: "budget", label: "Budget" },
  { name: "message", label: "Message", wide: true },
];

/* ------------------------------------------------------------
   IDEA → LAUNCH VISUAL
   Nodes sit on a 3 x 3 grid; the connecting lines are drawn in
   the same coordinate space, so the two always line up.
   ------------------------------------------------------------ */

export const ideaFlowCenter = {
  id: "idea",
  label: "Your Idea",
  icon: Lightbulb,
  column: 2,
  row: 2,
};

export const ideaFlowNodes = [
  { id: "strategy", label: "Strategy", icon: Compass, column: 2, row: 1 },
  { id: "design", label: "Design", icon: Palette, column: 3, row: 2 },
  { id: "development", label: "Development", icon: Code2, column: 3, row: 3 },
  { id: "ai", label: "AI", icon: BrainCircuit, column: 2, row: 3 },
  { id: "cloud", label: "Cloud", icon: Cloud, column: 1, row: 3 },
  { id: "launch", label: "Launch", icon: Rocket, column: 1, row: 2 },
];

/* ------------------------------------------------------------
   WHY CONTACT US
   ------------------------------------------------------------ */

export const benefits = [
  {
    id: "fast",
    number: "01",
    icon: Zap,
    title: "Fast Communication",
    description:
      "A direct line to the people doing the work — no account-manager relay, no waiting on a ticket queue.",
  },
  {
    id: "transparent",
    number: "02",
    icon: ScanSearch,
    title: "Transparent Process",
    description:
      "Clear scope, clear cost and a visible plan at every stage. You always know what happens next and why.",
  },
  {
    id: "expertise",
    number: "03",
    icon: Gauge,
    title: "Technical Expertise",
    description:
      "Product engineering, AI and design under one roof, so the recommendation fits your problem instead of our toolset.",
  },
  {
    id: "partnership",
    number: "04",
    icon: Handshake,
    title: "Long-Term Partnership",
    description:
      "We stay for the launch, the iteration and the growth — measured by outcomes long after go-live.",
  },
];

/* ------------------------------------------------------------
   PROCESS
   ------------------------------------------------------------ */

export const processSteps = [
  {
    id: "discover",
    number: "01",
    icon: Compass,
    title: "Discover",
    text: "We listen, ask the awkward questions and agree on the outcome worth building.",
  },
  {
    id: "understand",
    number: "02",
    icon: Building2,
    title: "Understand",
    text: "Requirements, constraints and success metrics turn into a scope everyone signs off on.",
  },
  {
    id: "design",
    number: "03",
    icon: Sparkles,
    title: "Design",
    text: "Flows, prototypes and a visual language are explored before a line of code is written.",
  },
  {
    id: "build",
    number: "04",
    icon: Code2,
    title: "Build",
    text: "Short cycles, visible previews and reviews on real devices — not status slides.",
  },
  {
    id: "launch",
    number: "05",
    icon: Rocket,
    title: "Launch",
    text: "We ship, watch the metrics and keep improving with you after release.",
  },
];
