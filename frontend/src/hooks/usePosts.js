import { useMemo } from "react";
import { useCollection } from "./useContent";
import { imageUrl } from "../utils/apiBase";

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

const fallbackPosts = [
  {
    id: "how-modern-web-development-helps-businesses-grow",
    title: "How Modern Web Development Helps Businesses Grow",
    category: "Web Development",
    description:
      "Discover how modern web technologies help businesses build faster and scalable digital experiences.",
    date: "September 2026",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
    readMinutes: 5,
    author: "FasCave Team",
    content: "",
    tags: [],
  },
  {
    id: "the-role-of-ai-in-modern-business-solutions",
    title: "The Role of AI in Modern Business Solutions",
    category: "Artificial Intelligence",
    description:
      "Explore how artificial intelligence is transforming business workflows.",
    date: "September 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
    readMinutes: 4,
    author: "FasCave Team",
    content: "",
    tags: [],
  },
];

const toPost = (post) => ({
  id: post.slug || post._id,
  _id: post._id,
  slug: post.slug,
  title: post.title || "",
  category: post.category || "Technology",
  date:
    formatDate(post.publishedAt) ||
    formatDate(post.createdAt),
  description: post.excerpt || "",
  image: imageUrl(post.coverImage),
  content: post.content || "",
  author: post.author || "",
  readMinutes: post.readMinutes || 3,
  tags: post.tags || [],
  publishedAt: post.publishedAt,
});

export const usePosts = () => {
  const { items, status } = useCollection("/api/content/blog");

  const posts = useMemo(() => {
    if (items.length > 0) {
      return items.map(toPost);
    }

    return fallbackPosts;
  }, [items]);

  return {
    posts,
    status,
  };
};