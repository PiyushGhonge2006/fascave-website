const JobOpening = require("./model/jobOpening");

const connectDB = require("./config/db");

require("dotenv").config();


// ======================================================
// OPEN ROLES
//
// Matched to the disciplines the Careers page advertises.
// Upserted by slug, so re-running never duplicates a role and
// never overwrites an edit an admin has already made.
// ======================================================

const roles = [
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote / India",
    type: "Full Time",
    icon: "Code2",
    summary:
      "Own features end to end across a modern React and Node stack, from data model to deployed screen.",
    description:
      "You will join a small senior team and take a feature from a rough brief to production. That means modelling the data, building the API, designing the interface with a designer, and shipping it behind a real review process. You are comfortable in all of those steps, or you are hungry enough to learn the ones you are missing.",
    requirements: [
      "Strong JavaScript and React, used in production rather than tutorials",
      "Node.js and Express, or a framework you can defend the trade-offs of",
      "Reliable relational and document data modelling — MongoDB or SQL",
      "Git, code review etiquette and a habit of leaving things better than you found them",
    ],
    benefits: [
      "Remote-friendly with a real overlap window for the team",
      "Learning budget for courses, books and certifications",
      "Direct client contact on your own projects",
      "Short release cycles — no six-month gaps between launches",
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote / India",
    type: "Full Time",
    icon: "Palette",
    summary:
      "Turn messy business problems into interfaces people can use without being taught.",
    description:
      "You will lead discovery with our strategists, own the interface end to end, and stay with the build until it matches the design. We are looking for someone who can defend a design decision in plain language and treat a constraint as a brief, not an excuse.",
    requirements: [
      "A portfolio of shipped product work, not concept pieces",
      "Fluent in Figma, including components, variants and design systems",
      "Comfortable prototyping and testing before handing anything to a developer",
      "Working understanding of accessible contrast, focus states and keyboard flow",
    ],
    benefits: [
      "Named ownership of product areas rather than ticket-by-ticket work",
      "A design system that already exists, so you build on it",
      "Close pairing with engineers instead of a handover gap",
      "Remote-friendly, with the hardware you need",
    ],
  },
  {
    slug: "mobile-app-developer",
    title: "Mobile App Developer",
    department: "Engineering",
    location: "Remote / India",
    type: "Full Time",
    icon: "Smartphone",
    summary:
      "Ship React Native apps that stay fast on the phones our clients actually use.",
    description:
      "You will build and maintain mobile products for clients in retail, logistics and services — the kind with real offline needs, real integrations and real support obligations. Offline-first thinking and honest performance budgets matter more here than novelty.",
    requirements: [
      "Production React Native or Flutter experience, published to both stores",
      "Comfort with native module boundaries when a library is not enough",
      "Practical grasp of app store review, release trains and staged rollouts",
      "Care about profiling and memory behaviour, not just features",
    ],
    benefits: [
      "Real ownership of shipped apps with active users",
      "Time allocated to profiling rather than firefighting",
      "Learning budget and conference support",
      "Small team, so no layers between you and the client",
    ],
  },
  {
    slug: "cloud-devops-engineer",
    title: "Cloud & DevOps Engineer",
    department: "Engineering",
    location: "Remote / India",
    type: "Full Time",
    icon: "Cloud",
    summary:
      "Keep client systems observable, automated and boringly reliable in production.",
    description:
      "You will own infrastructure for a handful of live products: pipelines, environments, monitoring and on-call. The best work here is the work that never becomes an incident, so we value automation and clear runbooks over heroics.",
    requirements: [
      "AWS or Azure in production, including networking and identity",
      "Docker, Kubernetes or an equivalent orchestrator",
      "CI/CD you built and still trust — pipelines as code",
      "Observability: logs, metrics, traces and alerts that a human can read",
    ],
    benefits: [
      "Direct influence on architecture from the first week",
      "Paid on-call with time off in lieu",
      "Certification support for the platforms you already use",
      "Remote-friendly, documented and predictable hours",
    ],
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    department: "Data & AI",
    location: "Remote / India",
    type: "Full Time",
    icon: "BarChart3",
    summary:
      "Turn messy business data into the dashboards and decisions clients actually rely on.",
    description:
      "You will sit with client stakeholders, work out what they should be measuring, then build the pipeline and the reporting that makes it true. Strong SQL and an instinct for when a number is misleading matter more here than exotic tooling.",
    requirements: [
      "Strong SQL and comfortable Python or R for analysis",
      "Experience with Power BI, Looker or a comparable reporting stack",
      "Data modelling and warehouse familiarity — dbt is a plus",
      "The judgement to push back when a requested metric is the wrong one",
    ],
    benefits: [
      "Direct exposure to how real businesses make decisions",
      "Training on the analytics and AI tooling we build with clients",
      "Remote-friendly with sensible hours",
      "A small team, so your work is visible immediately",
    ],
  },
  {
    slug: "business-development-executive",
    title: "Business Development Executive",
    department: "Growth",
    location: "Remote / India",
    type: "Full Time",
    icon: "Handshake",
    summary:
      "Open conversations with businesses that need technology rebuilt properly.",
    description:
      "You will qualify inbound enquiries, run discovery calls with our technical leads, and help scope engagements honestly — including telling a prospect when we are not the right fit. Technical curiosity matters more than a pitch deck.",
    requirements: [
      "2+ years in B2B sales or business development for a technology or services company",
      "A track record of qualified pipeline, not just activity metrics",
      "Comfort explaining technical scope to a non-technical buyer",
      "Honesty about what a project will and will not deliver",
    ],
    benefits: [
      "Warm, credible brand to sell behind",
      "Technical support on every call — you are never selling alone",
      "Performance bonus plus a strong base",
      "Clear, uncapped commission structure",
    ],
  },
];


// ======================================================
// SEED
// ======================================================

const seedCareers = async () => {
  try {
    for (const role of roles) {
      const existing =
        await JobOpening.findOne({
          slug: role.slug,
        });

      if (existing) {
        continue;
      }

      await JobOpening.create({
        ...role,
        isActive: true,
        isPublished: true,
      });
    }

    const total = await JobOpening.countDocuments();

    console.log(
      `Career roles ready (${total} total).`
    );
  } catch (error) {
    console.error(
      "Error seeding career roles:",
      error.message
    );
  }
};


// Standalone runs must open their own connection.
const runAsScript = async () => {
  await connectDB();
  await seedCareers();
  process.exit(0);
};


if (require.main === module) {
  runAsScript().catch((error) => {
    console.error(
      "Error seeding career roles:",
      error.message
    );
    process.exit(1);
  });
}


module.exports = seedCareers;
