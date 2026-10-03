import { useMemo } from "react";

import { useCollection } from "./useContent";
import { imageUrl } from "../utils/apiBase";

/* ======================================================
   BLOG POSTS
   ======================================================

   Shared by the blog list and the article page so both
   read the same list and agree on the URL slug.

   The CMS sorts newest first on the backend and the
   fallback below keeps its original order. The fallback
   is used whenever the CMS has nothing to return, so the
   blog is never blank.
====================================================== */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* "September 2026" is the format the design already uses. */
const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

const fallbackPosts = [
  {
    id: "how-modern-web-development-helps-businesses-grow",
    category: "Web Development",
    date: "September 2026",
    title: "How Modern Web Development Helps Businesses Grow",
    description:
      "Discover how modern web technologies can help businesses build faster, scalable and engaging digital experiences.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "the-role-of-ai-in-modern-business-solutions",
    category: "Artificial Intelligence",
    date: "September 2026",
    title: "The Role of AI in Modern Business Solutions",
    description:
      "Explore how artificial intelligence is transforming workflows, customer experiences and business decision-making.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "building-a-strong-digital-presence-for-your-brand",
    category: "Digital Marketing",
    date: "August 2026",
    title: "Building a Strong Digital Presence for Your Brand",
    description:
      "Learn how a strong digital strategy can improve visibility, engagement and long-term brand growth.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "why-cloud-solutions-matter-for-growing-businesses",
    category: "Cloud & Data",
    date: "August 2026",
    title: "Why Cloud Solutions Matter for Growing Businesses",
    description:
      "Understand how cloud technologies can improve scalability, flexibility and data-driven business operations.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "creating-better-experiences-through-mobile-apps",
    category: "Mobile App Development",
    date: "July 2026",
    title: "Creating Better Experiences Through Mobile Apps",
    description:
      "A look at how thoughtful mobile application development can create useful and engaging customer experiences.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "technology-trends-shaping-the-digital-future",
    category: "Technology",
    date: "July 2026",
    title: "Technology Trends Shaping the Digital Future",
    description:
      "Explore some of the technologies helping businesses adapt to an increasingly digital world.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
];

const toPost = (post) => ({
  id: post.slug || post._id,
  category: post.category || "",
  date: formatDate(post.publishedAt) || formatDate(post.createdAt),
  title: post.title,
  description: post.excerpt || "",
  image: imageUrl(post.coverImage),
  content: post.content || post.excerpt || "",
  author: post.author || "",
  readMinutes: post.readMinutes || 3,
});

export const usePosts = () => {
  const { items } = useCollection("/api/content/blog");

  return useMemo(() => {
    if (!items.length) {
      return fallbackPosts;
    }

    return items.map(toPost);
  }, [items]);
};
