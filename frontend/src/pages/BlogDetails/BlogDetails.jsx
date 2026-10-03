import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import { usePosts } from "../../hooks/usePosts";
import "./BlogDetails.css";


const BlogDetails = () => {
    const { id } = useParams();

    const [pageRef] = useRevealOnScroll();

    const posts = usePosts();

    const post = posts.find((item) => item.id === id);

    /* The browser tab follows the article title. */
    useEffect(() => {

        if (!post?.title) {
            return;
        }

        const previous = document.title;
        document.title = post.title;

        return () => {
            document.title = previous;
        };

    }, [post?.title]);


    if (!post) {
        return (
            <main className="blog-details-page">

                <div
                    className="blog-details-container"
                    data-reveal="blur"
                >

                    <Link
                        to="/blog"
                        className="blog-back-link"
                    >
                        ← Back to Blog
                    </Link>

                    <h1>Article not found</h1>

                    <p>
                        This article may have been unpublished or its link may
                        have changed.
                    </p>

                    <Link
                        to="/blog"
                        className="blog-read-button"
                    >
                        Read other articles <span>→</span>
                    </Link>

                </div>

            </main>
        );
    }


    /* The body is plain text from the CMS, so paragraphs are
       split on blank lines rather than injected as HTML. */
    const paragraphs = post.content
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean);


    return (
        <main className="blog-details-page" ref={pageRef}>

            <div
                className="blog-details-container"
                data-reveal="blur"
            >

                <Link
                    to="/blog"
                    className="blog-back-link"
                >
                    ← Back to Blog
                </Link>

                {post.category && (
                    <p className="blog-details-category">
                        {post.category}
                    </p>
                )}

                <h1>
                    {post.title}
                </h1>

                <p className="blog-details-meta">
                    {[
                        post.date,
                        post.author,
                        `${post.readMinutes} min read`,
                    ]
                        .filter(Boolean)
                        .join(" · ")}
                </p>

                {post.image && (
                    <div className="blog-details-image">
                        <img
                            src={post.image}
                            alt={post.title}
                        />
                    </div>
                )}

                <article className="blog-details-content">

                    {paragraphs.map((paragraph, index) => (
                        <p key={`${index}-${paragraph.slice(0, 12)}`}>
                            {paragraph}
                        </p>
                    ))}

                </article>

            </div>

        </main>
    );
};

export default BlogDetails;
