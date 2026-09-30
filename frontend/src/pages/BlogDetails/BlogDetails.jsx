import React from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetails.css";

const BlogDetails = () => {
    const { id } = useParams();

    return (
        <main className="blog-details-page">

            <div className="blog-details-container">

                <Link to="/blog" className="blog-back-link">
                    ← Back to Blog
                </Link>

                <p className="blog-details-category">
                    Technology
                </p>

                <h1>
                    Blog Article
                </h1>

                <p className="blog-details-meta">
                    September 2026
                </p>

                <div className="blog-details-image">
                    <div>
                        Article {id}
                    </div>
                </div>

                <article className="blog-details-content">
                    <p>
                        This is the detailed article page. Later, when we connect the
                        backend and MongoDB, the title, image, content, category and
                        other information will come dynamically from the database.
                    </p>

                    <h2>Introduction</h2>

                    <p>
                        Technology continues to transform the way businesses operate,
                        communicate and create experiences for their customers.
                    </p>

                    <h2>Why It Matters</h2>

                    <p>
                        Modern digital solutions can help organizations improve their
                        workflows, reach their customers and build scalable products.
                    </p>

                    <h2>Conclusion</h2>

                    <p>
                        The right technology strategy can help businesses adapt to a
                        rapidly changing digital environment.
                    </p>
                </article>

            </div>

        </main>
    );
};

export default BlogDetails;