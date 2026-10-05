import React from "react";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import { usePosts } from "../../hooks/usePosts";
import "./Blog.css";
import { Link } from "react-router-dom";



const Blog = () => {
    const [pageRef] = useRevealOnScroll({ stagger: 110 });

    const blogPosts = usePosts();

    return (
        <main className="blog-page" ref={pageRef}>

            {/* =========================
          BLOG HERO
      ========================= */}
            <section className="blog-hero">
                <div className="blog-hero-content">
                    <span className="blog-accent"></span>

                    <p className="blog-eyebrow">OUR BLOG</p>

                    <h1>
                        Insights, Ideas
                        <span>& Innovation</span>
                    </h1>

                    <p className="blog-hero-description">
                        Explore insights, ideas and technology perspectives from FasCave
                        to help businesses navigate the digital world.
                    </p>
                </div>
            </section>

            {/* =========================
          FEATURED ARTICLE
      ========================= */}
            <section className="blog-featured-section">
                <div className="blog-section-heading" data-reveal>
                    <p className="blog-small-label">FEATURED</p>
                    <h2>Featured Article</h2>
                </div>

                <article className="blog-featured-card" data-reveal="scale">
                    <div className="blog-featured-image">
                        <img
                            src={blogPosts[0].image}
                            alt={blogPosts[0].title}
                        />
                    </div>

                    <div className="blog-featured-content">
                        <div className="blog-post-meta">
                            <span>{blogPosts[0].category}</span>
                            <span>{blogPosts[0].date}</span>
                        </div>

                        <h3>{blogPosts[0].title}</h3>

                        <p>{blogPosts[0].description}</p>

                        <Link to={`/blog/${blogPosts[0].id}`} className="blog-read-button">
                            Read Article <span>→</span>
                        </Link>
                    </div>
                </article>
            </section>

            {/* =========================
          LATEST ARTICLES
      ========================= */}
            <section className="blog-latest-section">
                <div className="blog-section-heading blog-latest-heading" data-reveal>
                    <p className="blog-small-label">LATEST INSIGHTS</p>
                    <h2>Latest Articles</h2>

                    <p>
                        Stay updated with ideas, insights and perspectives across
                        technology and digital business.
                    </p>
                </div>

                <div className="blog-grid">
                    {blogPosts.slice(1).map((post) => (
                        <article className="blog-card" key={post.id} data-reveal="scale">

                            <div className="blog-card-image">
                                <img src={post.image} alt={post.title} />
                            </div>

                            <div className="blog-card-content">

                                <div className="blog-post-meta">
                                    <span>{post.category}</span>
                                    <span>{post.date}</span>
                                </div>

                                <h3>{post.title}</h3>

                                <p>{post.description}</p>

                                <Link
                                    to={`/blog/${post.id}`}
                                    className="blog-card-button"
                                >
                                    Read More <span>→</span>
                                </Link>

                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* =========================
          CATEGORIES
      ========================= */}
            <section className="blog-category-section">

                <div className="blog-section-heading" data-reveal>
                    <p className="blog-small-label">EXPLORE</p>
                    <h2>Browse by Category</h2>
                </div>

                <div className="blog-category-list" data-reveal="scale">
                    <button>Web Development</button>
                    <button>Mobile Apps</button>
                    <button>Artificial Intelligence</button>
                    <button>Digital Marketing</button>
                    <button>Cloud & Data</button>
                    <button>Technology</button>
                </div>

            </section>

            {/* =========================
          CTA
      ========================= */}
            <section className="blog-cta">

                <div className="blog-cta-content" data-reveal="scale">

                    <p className="blog-small-label">LET'S BUILD TOGETHER</p>

                    <h2>
                        Have an idea?
                        <span> Let's make it happen.</span>
                    </h2>

                    <p>
                        Talk to our team about your next digital project and discover
                        how technology can help your business move forward.
                    </p>

                    <button className="blog-cta-button">
                        Contact Us <span>→</span>
                    </button>

                </div>

            </section>

        </main>
    );
};

export default Blog;
