/* ======================================================
   SEED CONTENT
   ======================================================

   Copies the content that already exists in the public
   frontend (hardcoded arrays) into MongoDB, so the admin
   panel and the CMS APIs have real data to work with.

   The script is safe to run any number of times:
   every write is an upsert on a natural key (slug,
   question, name), so re-running never creates duplicates.

   Run it from the backend folder:

     node seedContent.js

   Images were copied to  backend/uploads/seed-assets/
   and are served by the existing static /uploads mount.
====================================================== */

const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = require("./config/db");

const HomeContent = require("./model/homeContent");
const AboutContent = require("./model/aboutContent");
const Service = require("./model/service");
const PortfolioItem = require("./model/portfolioItem");
const GtmPartner = require("./model/gtmPartner");
const Faq = require("./model/faq");
const BlogPost = require("./model/blogPost");
const WhyChooseUs = require("./model/whyChooseUs");

const asset = (file) => `/uploads/seed-assets/${file}`;


/* ======================================================
   SOURCE DATA
   Mirrors the frontend arrays one to one.
====================================================== */

// frontend/src/component/Home/data/heroslides.js
const heroSlide = {
  eyebrow: "DIGITAL TRANSFORMATION",
  heading: "Fascave",
  highlightText:
    "Building Intelligent Solutions for a Future-Ready Enterprise",
  description:
    "Turning data, AI and technology into business impact.",
  ctaLabel: "CONNECT WITH US",
  ctaHref: "/contact",
  image: "",
};

// frontend/src/component/Home/Ourclient.jsx
const clients = [
  { name: "APVA Association", logo: asset("client-apva.png") },
  { name: "Foodlex", logo: asset("client-foodlex.png") },
  { name: "Hilltop Tuski", logo: asset("client-hilltop-tuski.png") },
  { name: "IkonTech", logo: asset("client-ikontech.png") },
  {
    name: "Piotex Ventures",
    logo: asset("client-piotex-ventures.png"),
  },
  {
    name: "Piotex Industries",
    logo: asset("client-piotex-industries.png"),
  },
  { name: "Shetkari", logo: asset("client-shetkari.png") },
  {
    name: "ShipDart Express",
    logo: asset("client-shipdart-express.png"),
  },
  { name: "Wake UP Water", logo: asset("client-wake-up.jpg") },
];

// frontend/src/component/Home/Hero/Why_choose_us/Why_chooseus.jsx
// PLACEHOLDER NUMBERS - edit these in the admin panel.
const whyStats = [
  { id: 1, value: "150+", label: "Projects Delivered", color: "blue", icon: "Trophy" },
  { id: 2, value: "40+", label: "Happy Clients", color: "lightBlue", icon: "Users" },
  { id: 3, value: "8+", label: "Years of Experience", color: "purple", icon: "UsersRound" },
  { id: 4, value: "100%", label: "Client Satisfaction", color: "pink", icon: "FileText" },
  { id: 5, value: "24/7", label: "Support & Maintenance", color: "yellow", icon: "Headphones" },
];

// frontend/src/pages/About/About.jsx
const about = {
  eyebrow: "About FasCave",
  heading: "About Us",
  description:
    "FasCave is a technology solutions company focused on building modern digital experiences and innovative solutions for businesses.",
  image: "",
  mission:
    "To deliver reliable, scalable and innovative technology solutions that help businesses grow and adapt to the digital world.",
  vision:
    "To become a trusted technology partner by creating impactful digital solutions that connect people, businesses and technology.",
  values: [
    {
      title: "Clarity first",
      description:
        "No vanity metrics. We focus on outcomes that compound.",
      icon: "Compass",
    },
    {
      title: "Craft matters",
      description:
        "Strategy and design are inseparable in our work.",
      icon: "Sparkles",
    },
    {
      title: "Built to last",
      description:
        "Systems and content designed to keep working after launch.",
      icon: "Layers",
    },
  ],
  seoTitle: "About FasCave IT Solutions",
  seoDescription:
    "FasCave is a technology solutions company building modern digital experiences for businesses.",
};

// frontend/src/component/Our_Services/data/features.js
const services = [
  {
    title: "Web Development",
    slug: "web-development",
    shortDescription:
      "We build modern, responsive and high-performance websites tailored to your business needs.",
    description:
      "Our web development services include custom website design, responsive layouts, clean code and scalable solutions using modern technologies.",
    image: asset("service-web-development.png"),
    points: [
      "Modern & Responsive",
      "Scalable Architecture",
      "High Performance",
      "Secure Development",
      "Future Ready",
    ],
    outcome: [
      "A fast and responsive digital experience.",
      "Modern websites optimized for all devices.",
      "Easy content management and updates.",
      "Better performance and user engagement.",
      "A scalable platform ready for future growth.",
    ],
  },
  {
    title: "App Development",
    slug: "app-development",
    shortDescription:
      "We develop powerful and user-friendly mobile applications for Android and iOS platforms.",
    description:
      "From concept to deployment, we create secure, scalable and feature-rich mobile applications designed to deliver great user experiences.",
    image: asset("service-app-development.png"),
    points: ["User Focused", "Cross Platform", "Secure", "Scalable", "Future Ready"],
    outcome: [
      "A dedicated mobile experience for customers.",
      "Easy access to services from anywhere.",
      "Connected and automated workflows.",
      "Faster customer communication.",
      "Real-time access to important information.",
    ],
  },
  {
    title: "SEO Friendly",
    slug: "seo-friendly",
    shortDescription:
      "We make SEO friendly templates with proper breadcrumbs and structured data.",
    description:
      "We structure websites with search-engine-friendly layouts, semantic HTML, metadata, breadcrumbs and structured data.",
    image: asset("service-seo-friendly.png"),
    points: [
      "Search Ready",
      "Structured Data",
      "Technical SEO",
      "Better Visibility",
      "Optimized Content",
    ],
    outcome: [
      "Search-friendly website architecture.",
      "Better structured website content.",
      "Improved search engine understanding.",
      "Clearer organic performance tracking.",
      "A stronger foundation for online visibility.",
    ],
  },
  {
    title: "Cloud & Data Analytics Services",
    slug: "cloud-data-analytics",
    shortDescription:
      "We help businesses leverage cloud technologies and data analytics for smarter decisions.",
    description:
      "Our services include cloud infrastructure, data processing, data visualization and analytics solutions tailored to your business requirements.",
    image: asset("service-cloud-data-analytics.png"),
    points: ["Cloud Ready", "Data Driven", "Scalable", "Secure", "Real-Time Insights"],
    outcome: [
      "Centralized and accessible business data.",
      "Automated reporting and analytics.",
      "Real-time business visibility.",
      "Faster data-driven decisions.",
      "Scalable cloud infrastructure.",
    ],
  },
  {
    title: "Power & BI Visualization Services",
    slug: "power-bi-visualization",
    shortDescription:
      "We create powerful dashboards and visual reports using modern business intelligence tools.",
    description:
      "Transform your data into meaningful insights with interactive dashboards, reports and data visualization solutions.",
    image: asset("service-power-bi.png"),
    points: ["Interactive", "Data Driven", "Real-Time", "Easy to Understand", "Business Focused"],
    outcome: [
      "Interactive business dashboards.",
      "Clear and meaningful data visualization.",
      "Automated reporting workflows.",
      "Real-time business insights.",
      "Better understanding of trends and performance.",
    ],
  },
  {
    title: "Digital Marketing Services",
    slug: "digital-marketing",
    shortDescription:
      "We help you grow your brand with result-driven digital marketing strategies.",
    description:
      "Our digital marketing services include social media marketing, SEO, content marketing, paid advertising and online brand promotion.",
    image: asset("service-digital-marketing.png"),
    points: ["Brand Growth", "Audience Focused", "Data Driven", "Multi Channel", "Performance Based"],
    outcome: [
      "Stronger online brand presence.",
      "Consistent digital communication.",
      "Targeted audience engagement.",
      "Data-driven marketing campaigns.",
      "Clear visibility into campaign performance.",
    ],
  },
];

// frontend/src/component/Portfolio/Portfolio.jsx
const portfolio = [
  {
    title: "Wake UP Water",
    slug: "wake-up-water",
    clientName: "Wake UP Water",
    category: "WATER & FMCG",
    description:
      "Reawakening the world with pure hydration through a modern digital experience.",
    coverImage: asset("portfolio-wake-up-water.png"),
    techStack: ["React", "Node.js", "MongoDB"],
    projectUrl: "https://www.fascave.com/projects",
  },
  {
    title: "Sherekar Jewelers",
    slug: "sherekar-jewelers",
    clientName: "Sherekar Jewelers",
    category: "JEWELLERY",
    description:
      "Illuminating your world with the art of timeless craftsmanship through a premium digital presence.",
    coverImage: asset("portfolio-sherekar-jewelers.png"),
    techStack: ["React", "JavaScript", "CSS"],
    projectUrl: "https://www.fascave.com/projects",
  },
  {
    title: "APVA Association",
    slug: "apva-association",
    clientName: "APVA Association",
    category: "MEDIA & ASSOCIATION",
    description:
      "Capturing moments and empowering visual storytelling through a modern online platform.",
    coverImage: asset("portfolio-apva-association.png"),
    techStack: ["React", "Node.js", "MongoDB"],
    projectUrl: "https://www.fascave.com/projects",
  },
  {
    title: "Hilltop Tuski",
    slug: "hilltop-tuski",
    clientName: "Hilltop Tuski",
    category: "BUSINESS & CONSULTING",
    description:
      "Connecting Japan and India for exceptional business growth through digital solutions.",
    coverImage: asset("portfolio-hilltop-tuski.png"),
    techStack: ["React", "Node.js", "API"],
    projectUrl: "https://www.fascave.com/projects",
  },
];

// frontend/src/component/GTMPartner/GTMPartner.jsx
const gtmPartners = [
  { name: "AWS", logo: asset("gtm-aws.png"), website: "https://aws.amazon.com", category: "Cloud" },
  { name: "Google Cloud", logo: asset("gtm-google-cloud.png"), website: "https://cloud.google.com", category: "Cloud" },
  { name: "Meta", logo: asset("gtm-meta.png"), website: "https://about.fb.com", category: "Technology" },
  { name: "Microsoft Azure", logo: asset("gtm-microsoft-azure.png"), website: "https://azure.microsoft.com", category: "Cloud" },
  { name: "Microsoft", logo: asset("gtm-microsoft.png"), website: "https://www.microsoft.com", category: "Technology" },
];

// frontend/src/component/Home/Hero/FAQ/FAQ.jsx
// The frontend hardcodes a "Q1. " prefix in the question text.
// It is stripped here because the CMS list already numbers items.
const faqs = [
  {
    question: "What services does Fascave IT Solutions provide?",
    answer:
      "Fascave IT Solutions provides web development, mobile app development, digital marketing, cloud and data solutions, UI/UX design, and customized software solutions for businesses.",
  },
  {
    question: "How can Fascave IT Solutions help with digital transformation?",
    answer:
      "We help businesses modernize their processes through custom software, web and mobile applications, cloud solutions, automation, and digital strategies designed around their business requirements.",
  },
  {
    question: "Do you provide customized website development?",
    answer:
      "Yes. We develop fully customized websites based on your business goals, brand identity, functionality requirements, and target audience.",
  },
  {
    question: "What technologies do you use for web and mobile app development?",
    answer:
      "We work with modern technologies such as React, JavaScript, Node.js, Express.js, MongoDB, cloud platforms, and other technologies depending on the project's requirements.",
  },
  {
    question: "How does your SEO service work?",
    answer:
      "Our SEO process includes website analysis, keyword research, on-page optimization, technical SEO, content optimization, and performance monitoring to improve search visibility.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Yes. We work with startups as well as established businesses and provide scalable technology solutions according to their budget, goals, and growth requirements.",
  },
  {
    question: "What is your project development process?",
    answer:
      "Our development process generally includes requirement analysis, planning, UI/UX design, development, testing, deployment, and post-launch support.",
  },
  {
    question: "How much does it cost to develop a website or app?",
    answer:
      "The cost depends on the project's features, complexity, design requirements, technology stack, and development time. Contact us with your requirements for a customized estimate.",
  },
  {
    question: "Do you offer support and maintenance after project completion?",
    answer:
      "Yes. We provide post-launch support and maintenance services to help with updates, bug fixes, performance improvements, security, and future feature enhancements.",
  },
];

// frontend/src/pages/Blog/Blog.jsx
const blogPosts = [
  {
    title: "How Modern Web Development Helps Businesses Grow",
    slug: "how-modern-web-development-helps-businesses-grow",
    category: "Web Development",
    excerpt:
      "Discover how modern web technologies can help businesses build faster, scalable and engaging digital experiences.",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date("2026-09-01"),
  },
  {
    title: "The Role of AI in Modern Business Solutions",
    slug: "the-role-of-ai-in-modern-business-solutions",
    category: "Artificial Intelligence",
    excerpt:
      "Explore how artificial intelligence is transforming workflows, customer experiences and business decision-making.",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date("2026-09-01"),
  },
  {
    title: "Building a Strong Digital Presence for Your Brand",
    slug: "building-a-strong-digital-presence-for-your-brand",
    category: "Digital Marketing",
    excerpt:
      "Learn how a strong digital strategy can improve visibility, engagement and long-term brand growth.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date("2026-08-01"),
  },
  {
    title: "Why Cloud Solutions Matter for Growing Businesses",
    slug: "why-cloud-solutions-matter-for-growing-businesses",
    category: "Cloud & Data",
    excerpt:
      "Understand how cloud technologies can improve scalability, flexibility and data-driven business operations.",
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date("2026-08-01"),
  },
  {
    title: "Creating Better Experiences Through Mobile Apps",
    slug: "creating-better-experiences-through-mobile-apps",
    category: "Mobile App Development",
    excerpt:
      "A look at how thoughtful mobile application development can create useful and engaging customer experiences.",
    coverImage:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date("2026-07-01"),
  },
  {
    title: "Technology Trends Shaping the Digital Future",
    slug: "technology-trends-shaping-the-digital-future",
    category: "Technology",
    excerpt:
      "Explore some of the technologies helping businesses adapt to an increasingly digital world.",
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date("2026-07-01"),
  },
];


/* ======================================================
   WRITERS
   Every writer is an upsert on a natural key, so the
   whole script can be re-run without creating duplicates.
====================================================== */

const upsertSingleton = async (Model, data, label) => {

  const existing = await Model.findOne();

  if (existing) {
    await Model.findOneAndUpdate(
      {},
      { $set: data },
      { returnDocument: "after", runValidators: true }
    );
    console.log(`  ${label}: refreshed`);
    return 0;
  }

  await Model.create(data);
  console.log(`  ${label}: created`);
  return 1;

};


const upsertMany = async (
  Model,
  keyField,
  rows,
  build,
  label
) => {

  let created = 0;
  let updated = 0;

  for (const [index, row] of rows.entries()) {
    const payload = build(row, index);
    const key = payload[keyField];

    const result = await Model.findOneAndUpdate(
      { [keyField]: key },
      { $set: payload },
      { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
    );

    if (result.createdAt?.getTime() === result.updatedAt?.getTime()) {
      created += 1;
    } else {
      updated += 1;
    }
  }

  const total = await Model.countDocuments();

  console.log(
    `  ${label}: ${rows.length} processed (${created} new, ${updated} refreshed), collection now has ${total}`
  );

  return created;

};


/* ======================================================
   RUN
====================================================== */

const seedContent = async () => {

  console.log("\nSeeding content...\n");

  await upsertSingleton(
    HomeContent,
    {
      hero: heroSlide,
      stats: [
        { value: "150+", label: "Projects delivered" },
        { value: "40+", label: "Happy clients" },
        { value: "8+", label: "Years of experience" },
      ],
      clients,
      seoTitle: "FasCave IT Solutions",
      seoDescription:
        "FasCave builds intelligent solutions for a future-ready enterprise.",
    },
    "HomeContent"
  );

  await upsertSingleton(
    AboutContent,
    about,
    "AboutContent"
  );

  await upsertMany(
    Service,
    "slug",
    services,
    (row, index) => ({
      title: row.title,
      slug: row.slug,
      shortDescription: row.shortDescription,
      description: row.description,
      image: row.image,
      icon: "",
      features: row.points.map((point, i) => ({
        title: point,
        description: row.outcome[i] || "",
      })),
      order: index + 1,
      isPublished: true,
    }),
    "Services"
  );

  await upsertMany(
    PortfolioItem,
    "slug",
    portfolio,
    (row, index) => ({
      title: row.title,
      slug: row.slug,
      clientName: row.clientName,
      category: row.category,
      description: row.description,
      coverImage: row.coverImage,
      projectUrl: row.projectUrl,
      techStack: row.techStack,
      gallery: [],
      order: index + 1,
      isPublished: true,
    }),
    "Portfolio"
  );

  await upsertMany(
    GtmPartner,
    "name",
    gtmPartners,
    (row, index) => ({
      name: row.name,
      logo: row.logo,
      website: row.website,
      category: row.category,
      description: "",
      tier: "partner",
      order: index + 1,
      isPublished: true,
    }),
    "GTM Partners"
  );

  await upsertMany(
    Faq,
    "question",
    faqs,
    (row, index) => ({
      question: row.question,
      answer: row.answer,
      category: "general",
      order: index + 1,
      isPublished: true,
    }),
    "FAQ"
  );

  await upsertMany(
    BlogPost,
    "slug",
    blogPosts,
    (row, index) => ({
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.excerpt,
      coverImage: row.coverImage,
      category: row.category,
      author: "FasCave",
      tags: [row.category],
      readMinutes: 3,
      status: "published",
      publishedAt: row.publishedAt,
    }),
    "Blog Posts"
  );

  await upsertSingleton(
    WhyChooseUs,
    { stats: whyStats },
    "WhyChooseUs"
  );

  console.log("\nContent seed finished.\n");

};


if (require.main === module) {

  const run = async () => {

    await connectDB();
    await seedContent();
    process.exit(0);

  };

  run().catch((error) => {
    console.error(
      "Error seeding content:",
      error.message
    );
    process.exit(1);
  });

}


module.exports = seedContent;

