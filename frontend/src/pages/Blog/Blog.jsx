import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import { usePosts } from "../../hooks/usePosts";

import "./Blog.css";

const Blog = () => {
    const [pageRef] = useRevealOnScroll({ stagger: 110 });

    const { posts, status } = usePosts();

    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");

    const categories = useMemo(() => {
        return [
            "All",
            ...new Set(
                posts
                    .map((post) => post.category)
                    .filter(Boolean)
            ),
        ];
    }, [posts]);
    // existing blog will be in main grid 
    const featured =
        posts.find(
            (post) =>
                post.slug ===
                "the-future-of-data-engineering-trends-and-innovations-shaping-the-industry"
        ) || posts[0];

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesCategory =
                activeCategory === "All" ||
                post.category === activeCategory;

            const query = search.trim().toLowerCase();

            const matchesSearch =
                !query ||
                post.title.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                post.category.toLowerCase().includes(query) ||
                post.tags.some((tag) =>
                    tag.toLowerCase().includes(query)
                );

            return matchesCategory && matchesSearch;
        });
    }, [posts, activeCategory, search]);

    const latestPosts = filteredPosts.filter(
        (post) => post.id !== featured?.id
    );

    return (
        <main className="blog-page" ref={pageRef}>

            {/* HERO */}
            <section className="blog-hero">
                <div className="blog-hero-glow blog-glow-one" />
                <div className="blog-hero-glow blog-glow-two" />

                <div className="blog-hero-content">
                    <span className="blog-accent" />

                    <p className="blog-eyebrow">
                        FASCAVE / INSIGHTS
                    </p>

                    <h1>
                        Technology Insights
                        <span>For a Smarter Tomorrow.</span>
                    </h1>

                    <p className="blog-hero-description">
                        Discover ideas, insights and technology trends
                        that inspire innovation and help businesses
                        move forward in a digital world.
                    </p>

                    <a href="#blog-latest" className="blog-explore-button">
                        Explore Articles <span>↓</span>
                    </a>

                    <div className="blog-hero-stats">
                        <div>
                            <strong>{posts.length.toString().padStart(2, "0")}</strong>
                            <span>Articles</span>
                        </div>
                        <div>
                            <strong>{Math.max(categories.length - 1, 0).toString().padStart(2, "0")}</strong>
                            <span>Categories</span>
                        </div>
                        <div>
                            <strong>F</strong>
                            <span>FasCave Insights</span>
                        </div>
                    </div>
                </div>

                <div className="blog-hero-bottom">
                    <span>TECHNOLOGY · INNOVATION · BUSINESS</span>
                    <span>THINK. CREATE. INNOVATE.</span>
                </div>
            </section>

            {/* FEATURED ARTICLE */}
            {featured && (
                <section className="blog-featured-section">
                    <div className="blog-section-heading" data-reveal>
                        <div>
                            <p className="blog-small-label">EDITOR'S PICK</p>
                            <h2>Featured Article</h2>
                        </div>
                        <span className="blog-section-index">
                            01 / FEATURED
                        </span>
                    </div>

                    <article className="blog-featured-card" data-reveal="scale">
                        <Link
                            to={`/blog/${featured.id}`}
                            className="blog-featured-image"
                        >
                            {featured.image ? (
                                <img src={featured.image} alt={featured.title} />
                            ) : (
                                <div className="blog-image-placeholder">
                                    FASCAVE INSIGHTS
                                </div>
                            )}

                            <span className="blog-featured-tag">
                                FEATURED STORY
                            </span>
                        </Link>

                        <div className="blog-featured-content">
                            <div className="blog-post-meta">
                                <span>{featured.category}</span>
                                <span>{featured.date}</span>
                            </div>

                            <h3>{featured.title}</h3>

                            <p>{featured.description}</p>

                            <div className="blog-featured-author">
                                <span className="blog-author-avatar">
                                    {(featured.author || "F").charAt(0).toUpperCase()}
                                </span>
                                <div>
                                    <strong>{featured.author || "FasCave Team"}</strong>
                                    <span>{featured.readMinutes} min read</span>
                                </div>
                            </div>

                            <Link
                                to={`/blog/${featured.id}`}
                                className="blog-read-button"
                            >
                                Read Full Article <span>↗</span>
                            </Link>
                        </div>
                    </article>
                </section>
            )}

            {/* LATEST ARTICLES */}
            <section className="blog-latest-section" id="blog-latest">
                <div className="blog-section-heading blog-latest-heading">
                    <div>
                        <p className="blog-small-label">STAY INFORMED</p>
                        <h2>Latest Insights</h2>
                        <p>
                            Fresh perspectives on technology, innovation
                            and digital business.
                        </p>
                    </div>

                    <div className="blog-search">
                        <span>⌕</span>
                        <input
                            type="search"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search articles"
                        />
                    </div>
                </div>

                {/* CATEGORY FILTER */}
                <div className="blog-category-list">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={
                                activeCategory === category ? "active" : ""
                            }
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {status === "loading" && posts.length === 0 ? (
                    <div className="blog-state">
                        Loading articles...
                    </div>
                ) : latestPosts.length > 0 ? (
                    <div className="blog-grid">
                        {latestPosts.map((post) => (
                            <article
                                className="blog-card"
                                key={post.id}
                            >
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="blog-card-image"
                                >
                                    {post.image ? (
                                        <img src={post.image} alt={post.title} />
                                    ) : (
                                        <div className="blog-image-placeholder">
                                            FASCAVE
                                        </div>
                                    )}

                                    <span className="blog-card-arrow">↗</span>
                                </Link>

                                <div className="blog-card-content">
                                    <div className="blog-post-meta">
                                        <span>{post.category}</span>
                                        <span>{post.readMinutes} min read</span>
                                    </div>

                                    <h3>{post.title}</h3>

                                    <p>{post.description}</p>

                                    <div className="blog-card-footer">
                                        <span>{post.date}</span>
                                        <Link to={`/blog/${post.id}`}>
                                            Read More ↗
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="blog-state">
                        <h3>No articles found</h3>
                        <p>
                            Try another category or search keyword.
                        </p>
                        <button
                            onClick={() => {
                                setSearch("");
                                setActiveCategory("All");
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Blog;