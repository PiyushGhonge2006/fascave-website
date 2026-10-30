
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import { usePosts } from "../../hooks/usePosts";

import "./BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();

  const [pageRef] = useRevealOnScroll();

  const { posts, status } = usePosts();

  const post = posts.find(
    (item) => item.id === id || item.slug === id
  );

  useEffect(() => {
    if (!post?.title) return;

    const previousTitle = document.title;

    document.title = `${post.title} | FasCave`;

    return () => {
      document.title = previousTitle;
    };
  }, [post?.title]);

  if (!post && status === "loading") {
    return (
      <main className="blog-details-page">
        <div className="blog-details-container">
          <p className="blog-details-loading">
            Loading article...
          </p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="blog-details-page">
        <div className="blog-details-container blog-not-found">
          <span className="blog-small-label">
            ARTICLE NOT FOUND
          </span>

          <h1>This article is unavailable.</h1>

          <p>
            This article may have been unpublished,
            deleted or its link may have changed.
          </p>

          <Link to="/blog" className="blog-details-back-button">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-details-page" ref={pageRef}>
      <div className="blog-details-container">

        {/* BACK LINK */}
        <Link to="/blog" className="blog-back-link">
          <span>←</span> Back to Insights
        </Link>

        {/* ARTICLE HEADER */}
        <header className="blog-details-header">
          <span className="blog-details-category">
            {post.category}
          </span>

          <h1>{post.title}</h1>

          {post.description && (
            <p className="blog-details-excerpt">
              {post.description}
            </p>
          )}

          <div className="blog-details-meta">
            <div className="blog-details-author">
              <span className="blog-author-avatar">
                {(post.author || "F").charAt(0).toUpperCase()}
              </span>

              <div>
                <strong>{post.author || "FasCave Team"}</strong>
                <span>Author</span>
              </div>
            </div>

            <span>{post.date}</span>
            <span>{post.readMinutes} min read</span>
          </div>
        </header>

        {/* COVER IMAGE */}
        {post.image && (
          <div className="blog-details-image">
            <img
              src={post.image}
              alt={post.title}
            />
          </div>
        )}

        {/* ARTICLE CONTENT */}
        <article className="blog-details-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content || post.description || ""}
          </ReactMarkdown>
        </article>

        {/* TAGS */}
        {post.tags?.length > 0 && (
          <div className="blog-details-tags">
            <span>TOPICS:</span>

            {post.tags.map((tag) => (
              <span className="blog-details-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ARTICLE FOOTER */}
        <div className="blog-details-footer">
          <div>
            <span>ENJOYED THIS ARTICLE?</span>
            <h3>Explore more insights.</h3>
          </div>

          <Link to="/blog" className="blog-read-button">
            More Articles <span>↗</span>
          </Link>
        </div>

      </div>
    </main>
  );
};

export default BlogDetails;
