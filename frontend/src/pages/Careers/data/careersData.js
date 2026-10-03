import {
    BarChart3,
    Blocks,
    Bot,
    Box,
    Boxes,
    Braces,
    BriefcaseBusiness,
    ChartBar,
    Clapperboard,
    Cloud,
    Code,
    Code2,
    CodeXml,
    Compass,
    Cpu,
    Database,
    Feather,
    Flame,
    Gauge,
    Globe,
    GraduationCap,
    Handshake,
    HeartHandshake,
    KeyRound,
    Layers,
    Lightbulb,
    Megaphone,
    MessagesSquare,
    Network,
    Palette,
    PenTool,
    Rocket,
    Server,
    Smartphone,
    Sparkles,
    SquareTerminal,
    Target,
    Timer,
    Users,
    Workflow,
    Wrench,
    Zap,
} from "lucide-react";

/* =========================================================
   CMS ICONS
   ------------------------------------------------------------
   The CMS stores a Lucide icon name as a string. This is the
   only place that turns a name into a component, so an admin
   can retag any icon from the admin panel without a deploy.
   Unknown names fall back to `DEFAULT_ICON` rather than
   rendering nothing.
   ========================================================= */

export const CAREER_ICONS = {
    BarChart3,
    Blocks,
    Bot,
    Box,
    Boxes,
    Braces,
    BriefcaseBusiness,
    ChartBar,
    Clapperboard,
    Cloud,
    Code,
    Code2,
    CodeXml,
    Compass,
    Cpu,
    Database,
    Feather,
    Flame,
    Gauge,
    Globe,
    GraduationCap,
    Handshake,
    HeartHandshake,
    KeyRound,
    Layers,
    Lightbulb,
    Megaphone,
    MessagesSquare,
    Network,
    Palette,
    PenTool,
    Rocket,
    Server,
    Smartphone,
    Sparkles,
    SquareTerminal,
    Target,
    Timer,
    Users,
    Workflow,
    Wrench,
    Zap,
};

const DEFAULT_ICON = BriefcaseBusiness;

export const careerIcon = (name, fallback = DEFAULT_ICON) =>
    CAREER_ICONS[name] || CAREER_ICONS[fallback] || DEFAULT_ICON;


/* =========================================================
   PAGE COPY — FALLBACKS
   ------------------------------------------------------------
   Rendered until `GET /api/content/careers` responds, and kept
   if it fails, so the page is never blank. These mirror
   `careerDefaults` in backend/routes/careerRoutes.js — keep the
   two in step when the defaults change.
   ========================================================= */

export const careersFallback = {
    hero: {
        eyebrow: "CAREERS",
        heading: "Build What",
        highlightText: "Comes Next.",
        description:
            "Join a team where technology, creativity, and ambition move together.",
        ctaLabel: "Explore Open Roles",
        ctaHref: "#careers-roles",
    },

    intro: {
        eyebrow: "OPEN POSITIONS",
        heading: "Find Your Place",
        description:
            "Explore opportunities across technology, design, and creative innovation.",
    },

    highlights: [
        { value: "25+", label: "Team Members" },
        { value: "15+", label: "Technologies" },
        { value: "20+", label: "Projects Delivered" },
        { value: "8+", label: "Countries Reached" },
    ],

    culture: {
        eyebrow: "WHY FASCAVE",
        heading: "Why Build Your Career With Us?",
        description:
            "We believe great work happens when curious people are given the freedom to experiment, collaborate, and build.",
        items: [
            {
                title: "Learn & Grow",
                description:
                    "Structured learning budgets, mentor reviews and real ownership of hard problems.",
                icon: "GraduationCap",
            },
            {
                title: "Work With Smart People",
                description:
                    "A small, senior team that shares craft, reviews honestly and raises the bar.",
                icon: "Users",
            },
            {
                title: "Build Real Products",
                description:
                    "Work ships to real users — not decks, mockups or shelf-ware prototypes.",
                icon: "Rocket",
            },
            {
                title: "Creative Freedom",
                description:
                    "Room to explore, experiment and find the approach that actually works.",
                icon: "Compass",
            },
            {
                title: "Flexible Work",
                description:
                    "Hybrid rhythms, async-first communication and trust over attendance.",
                icon: "Timer",
            },
            {
                title: "Make An Impact",
                description:
                    "Your work reaches businesses and people across multiple countries.",
                icon: "Target",
            },
        ],
    },

    cta: {
        eyebrow: "JOIN THE TEAM",
        heading: "Ready to Build the Future?",
        description: "Your next opportunity could start here.",
        buttonLabel: "Send Your Resume",
        buttonHref: "/contact",
    },
};


/* =========================================================
   JOB OPENINGS — FALLBACKS
   ------------------------------------------------------------
   Job-shaped, so it can be handed straight to `useCollection`
   as its fallback. Once the admin saves real roles these are
   simply not used.
   ========================================================= */

export const jobsFallback = [
    {
        title: "Frontend Developer",
        summary: "Build high-performance interfaces and experiences.",
        location: "Remote",
        type: "Full Time",
        icon: "Code2",
    },
    {
        title: "Backend Developer",
        summary: "Craft reliable APIs, services and data layers at scale.",
        location: "Pune",
        type: "Full Time",
        icon: "Server",
    },
    {
        title: "Full Stack Developer",
        summary: "Own complete products from database to deployment.",
        location: "Hybrid",
        type: "Full Time",
        icon: "Layers",
    },
    {
        title: "UI/UX Designer",
        summary: "Design intuitive systems, flows and brand experiences.",
        location: "Remote",
        type: "Full Time",
        icon: "Palette",
    },
    {
        title: "3D Artist",
        summary: "Create immersive visuals, models and real-time scenes.",
        location: "Studio",
        type: "Project",
        icon: "Box",
    },
    {
        title: "Motion Graphics Designer",
        summary: "Animate product stories with crisp, premium motion.",
        location: "Remote",
        type: "Contract",
        icon: "Clapperboard",
    },
    {
        title: "Video Editor",
        summary: "Shape raw footage into stories people remember.",
        location: "Remote",
        type: "Contract",
        icon: "Feather",
    },
    {
        title: "Digital Marketing Specialist",
        summary: "Drive growth through campaigns, SEO and performance.",
        location: "Hybrid",
        type: "Full Time",
        icon: "Megaphone",
    },
    {
        title: "Cloud Engineer",
        summary: "Build secure, resilient infrastructure that scales.",
        location: "Remote",
        type: "Full Time",
        icon: "Cloud",
    },
    {
        title: "AI/ML Engineer",
        summary: "Turn intelligent models into useful product features.",
        location: "Hybrid",
        type: "Full Time",
        icon: "Bot",
    },
];


/* =========================================================
   DECORATION
   ------------------------------------------------------------
   Purely visual, and not editable from the admin panel: the
   floating chips and particles in the hero, the drifting
   culture tags, and the journey timeline.
   ========================================================= */

export const HERO_CHIPS = [
    { icon: Code, label: "Frontend Engineer", pos: "2% -4%", delay: "0s" },
    { icon: Palette, label: "UI/UX Designer", pos: "4% auto", delay: "0.35s" },
    { icon: Server, label: "Backend Developer", pos: "50% -14%", delay: "0.7s" },
    { icon: Box, label: "3D Artist", pos: "94% 6%", delay: "1.05s" },
    { icon: Megaphone, label: "Digital Marketing", pos: "86% auto", delay: "1.4s" },
];

export const HERO_PARTICLES = [
    { left: "8%", top: "22%", size: 3, delay: "0s", dur: "13s", drift: 26 },
    { left: "18%", top: "68%", size: 2, delay: "1.4s", dur: "16s", drift: -20 },
    { left: "31%", top: "14%", size: 4, delay: "2.6s", dur: "18s", drift: 32 },
    { left: "44%", top: "82%", size: 2, delay: "0.8s", dur: "15s", drift: -28 },
    { left: "56%", top: "34%", size: 3, delay: "3.2s", dur: "14s", drift: 24 },
    { left: "67%", top: "76%", size: 2, delay: "1.9s", dur: "17s", drift: -22 },
    { left: "76%", top: "18%", size: 3, delay: "2.2s", dur: "12s", drift: 30 },
    { left: "88%", top: "56%", size: 2, delay: "3.8s", dur: "19s", drift: -18 },
    { left: "94%", top: "34%", size: 4, delay: "1.1s", dur: "20s", drift: 26 },
    { left: "12%", top: "48%", size: 2, delay: "4.4s", dur: "16s", drift: -24 },
];

export const CULTURE_TAGS = [
    { label: "Innovation", x: 8, y: 26, dur: "9s", delay: "0s", tone: 0 },
    { label: "Ownership", x: 26, y: 68, dur: "11s", delay: "0.9s", tone: 1 },
    { label: "Learning", x: 47, y: 18, dur: "10s", delay: "1.8s", tone: 2 },
    { label: "Creativity", x: 63, y: 74, dur: "12s", delay: "0.4s", tone: 1 },
    { label: "Collaboration", x: 78, y: 32, dur: "10.5s", delay: "2.2s", tone: 0 },
    { label: "Growth", x: 16, y: 84, dur: "11.5s", delay: "1.3s", tone: 2 },
];

export const TIMELINE = [
    {
        icon: Compass,
        stage: "Discover",
        description: "We align on the problem, the user and the outcome that matters.",
    },
    {
        icon: Lightbulb,
        stage: "Create",
        description: "We explore, prototype and build the strongest version of the idea.",
    },
    {
        icon: Handshake,
        stage: "Collaborate",
        description: "Designers, engineers and strategists build side by side.",
    },
    {
        icon: Rocket,
        stage: "Launch",
        description: "We ship with care, measure honestly and iterate fast.",
    },
    {
        icon: Zap,
        stage: "Grow",
        description: "We keep raising the bar — together, role by role.",
    },
];

export const CULTURE_POINTS = [
    "Small teams, big ownership",
    "Direct access to decision makers",
    "Craft reviews that make you better",
];

export const HERO_FACTS = [
    { icon: Globe, label: "Remote friendly" },
    { icon: Blocks, label: "15+ technologies" },
    { icon: Zap, label: "Fast-moving team" },
];

export const CONSOLE_LABEL = "CAREER COMMAND CENTER";
export const CONSOLE_SUB = "Engineering · Design · Creative";
export const CONSOLE_BADGE = "HIRING NOW";
