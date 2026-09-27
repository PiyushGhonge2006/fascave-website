import React from "react";
import "./Blog.css";
import { Link } from "react-router-dom";

const blogPosts = [
    {
        id: 1,
        category: "Web Development",
        date: "September 2026",
        title: "How Modern Web Development Helps Businesses Grow",
        description:
            "Discover how modern web technologies can help businesses build faster, scalable and engaging digital experiences.",
        image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 2,
        category: "Artificial Intelligence",
        date: "September 2026",
        title: "The Role of AI in Modern Business Solutions",
        description:
            "Explore how artificial intelligence is transforming workflows, customer experiences and business decision-making.",
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 3,
        category: "Digital Marketing",
        date: "August 2026",
        title: "Building a Strong Digital Presence for Your Brand",
        description:
            "Learn how a strong digital strategy can improve visibility, engagement and long-term brand growth.",
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 4,
        category: "Cloud & Data",
        date: "August 2026",
        title: "Why Cloud Solutions Matter for Growing Businesses",
        description:
            "Understand how cloud technologies can improve scalability, flexibility and data-driven business operations.",
        image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 5,
        category: "Mobile App Development",
        date: "July 2026",
        title: "Creating Better Experiences Through Mobile Apps",
        description:
            "A look at how thoughtful mobile application development can create useful and engaging customer experiences.",
        image:
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 6,
        category: "Technology",
        date: "July 2026",
        title: "Technology Trends Shaping the Digital Future",
        description:
            "Explore some of the technologies helping businesses adapt to an increasingly digital world.",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    },
];

const Blog = () => {
    return (
        <main className="blog-page">

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
                <div className="blog-section-heading">
                    <p className="blog-small-label">FEATURED</p>
                    <h2>Featured Article</h2>
                </div>

                <article className="blog-featured-card">
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
                <div className="blog-section-heading blog-latest-heading">
                    <p className="blog-small-label">LATEST INSIGHTS</p>
                    <h2>Latest Articles</h2>

                    <p>
                        Stay updated with ideas, insights and perspectives across
                        technology and digital business.
                    </p>
                </div>

                <div className="blog-grid">
                    {blogPosts.slice(1).map((post) => (
                        <article className="blog-card" key={post.id}>

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

                <div className="blog-section-heading">
                    <p className="blog-small-label">EXPLORE</p>
                    <h2>Browse by Category</h2>
                </div>

                <div className="blog-category-list">
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

                <div className="blog-cta-content">

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