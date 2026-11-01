
import { useEffect, useState } from "react";

import { api } from "../../lib/apiClient";

import {
    Alert,
    Field,
    LoadingState,
    PageHeader,
    SectionVisibilityCard,
    Toast,
    useToast,
    ImageInput,
} from "../../components";

import "./HomeAdmin.css";

const emptyForm = {
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    seoAuthor: "FasCave",
    seoRobots: "index, follow",
    seoCanonicalUrl: "https://fascave.com/",

    ogType: "website",
    ogSiteName: "FasCave",
    ogTitle: "",
    ogDescription: "",
    ogUrl: "https://fascave.com/",
    ogImage: "",
    ogImageAlt: "FasCave IT Solutions",

    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    twitterImageAlt: "FasCave IT Solutions",

    themeColor: "#061b33",
    favicon: "/favicon.svg",
};

const SECTIONS = [
    {
        field: "servicesSectionVisible",
        title: "Our Services",
        description: "The service cards and the path to individual service pages.",
    },
    {
        field: "whyChooseUsSectionVisible",
        title: "Why Choose Us",
        description: "The statistics and benefit boxes that explain your differentiators.",
    },
    {
        field: "clientsSectionVisible",
        title: "Our Clients",
        description: "The client logo strip beneath the Why Choose Us section.",
    },
    {
        field: "portfolioSectionVisible",
        title: "Portfolio",
        description: "The selected case studies shown on the home page.",
    },
    {
        field: "gtmPartnersSectionVisible",
        title: "GTM Partners",
        description: "The partner and technology logo strip.",
    },
    {
        field: "faqSectionVisible",
        title: "FAQ",
        description: "The frequently asked questions block at the bottom of the page.",
    },
];

const HomeAdmin = () => {
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const { toast, showToast, closeToast } = useToast();

    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await api.get("/api/content/home");

            setForm({
                ...emptyForm,
                ...data,
                seoTitle: data?.seoTitle || "",
                seoDescription: data?.seoDescription || "",
            });
        } catch (loadError) {
            setError(
                loadError.message || "Could not load home content."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const set = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSaving(true);
        setError("");

        try {
            await api.put("/api/content/home", form);
            showToast("Homepage SEO settings saved successfully.");
        } catch (saveError) {
            const message = saveError.message || "Save failed.";
            setError(message);
            showToast(message, "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-page">
                <LoadingState label="Loading homepage settings" />
            </div>
        );
    }

    return (
        <div className="admin-page home-admin-page">
            <PageHeader
                title="Home Page"
                description="Manage homepage visibility, SEO metadata and website appearance."
            />

            <Alert message={error} />

            <div className="home-admin-note">
                <span className="home-admin-note-mark">H</span>
                <div>
                    <h2>Hero is hardcoded</h2>
                    <p>
                        The hero carousel is part of the website design.
                        Settings below control homepage sections and SEO metadata.
                    </p>
                </div>
            </div>

            <div className="home-visibility-heading">
                <h2>Homepage sections</h2>
                <p>
                    Hide a section without deleting its content.
                    Changes take effect on the public website immediately.
                </p>
            </div>

            <div className="home-visibility-grid">
                {SECTIONS.map((section) => (
                    <SectionVisibilityCard
                        key={section.field}
                        field={section.field}
                        title={section.title}
                        description={section.description}
                    />
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {/* BASIC SEO */}
                <div className="admin-card home-card">
                    <div className="admin-card-header">
                        <div>
                            <h2>Basic SEO Metadata</h2>
                            <p>
                                Main search engine information for your homepage.
                            </p>
                        </div>
                    </div>

                    <div className="admin-card-body home-seo-grid">
                        <Field label="Meta Title">
                            <input
                                className="admin-input"
                                value={form.seoTitle}
                                onChange={(e) => set("seoTitle", e.target.value)}
                                placeholder="FasCave | Software & Website Development"
                            />
                        </Field>

                        <Field label="Meta Description">
                            <textarea
                                className="admin-textarea"
                                value={form.seoDescription}
                                onChange={(e) => set("seoDescription", e.target.value)}
                                placeholder="Describe your website for search engines..."
                            />
                        </Field>

                        <Field label="Meta Keywords">
                            <textarea
                                className="admin-textarea"
                                value={form.seoKeywords}
                                onChange={(e) => set("seoKeywords", e.target.value)}
                                placeholder="website development, software company, app development"
                            />
                        </Field>

                        <Field label="Meta Author">
                            <input
                                className="admin-input"
                                value={form.seoAuthor}
                                onChange={(e) => set("seoAuthor", e.target.value)}
                                placeholder="FasCave"
                            />
                        </Field>

                        <Field label="Robots">
                            <select
                                className="admin-input"
                                value={form.seoRobots}
                                onChange={(e) => set("seoRobots", e.target.value)}
                            >
                                <option value="index, follow">Index, Follow</option>
                                <option value="noindex, follow">Noindex, Follow</option>
                                <option value="index, nofollow">Index, Nofollow</option>
                                <option value="noindex, nofollow">Noindex, Nofollow</option>
                                <option value="none">None</option>
                            </select>
                        </Field>

                        <Field label="Canonical URL">
                            <input
                                className="admin-input"
                                value={form.seoCanonicalUrl}
                                onChange={(e) => set("seoCanonicalUrl", e.target.value)}
                                placeholder="https://fascave.com/"
                            />
                        </Field>
                    </div>
                </div>

                {/* OPEN GRAPH */}
                <div className="admin-card home-card">
                    <div className="admin-card-header">
                        <div>
                            <h2>Open Graph Metadata</h2>
                            <p>
                                Controls how your website link appears on
                                WhatsApp, Facebook and LinkedIn.
                            </p>
                        </div>
                    </div>

                    <div className="admin-card-body home-seo-grid">
                        <Field label="OG Type">
                            <select
                                className="admin-input"
                                value={form.ogType}
                                onChange={(e) => set("ogType", e.target.value)}
                            >
                                <option value="website">Website</option>
                                <option value="article">Article</option>
                            </select>
                        </Field>

                        <Field label="OG Site Name">
                            <input
                                className="admin-input"
                                value={form.ogSiteName}
                                onChange={(e) => set("ogSiteName", e.target.value)}
                                placeholder="FasCave"
                            />
                        </Field>

                        <Field label="OG Title">
                            <input
                                className="admin-input"
                                value={form.ogTitle}
                                onChange={(e) => set("ogTitle", e.target.value)}
                                placeholder="FasCave | Software Development"
                            />
                        </Field>

                        <Field label="OG Description">
                            <textarea
                                className="admin-textarea"
                                value={form.ogDescription}
                                onChange={(e) => set("ogDescription", e.target.value)}
                                placeholder="Description shown in social previews..."
                            />
                        </Field>

                        <Field label="OG URL">
                            <input
                                className="admin-input"
                                value={form.ogUrl}
                                onChange={(e) => set("ogUrl", e.target.value)}
                                placeholder="https://fascave.com/"
                            />
                        </Field>

                        <ImageInput
                            label="OG Image"
                            value={form.ogImage}
                            onChange={(value) => set("ogImage", value)}
                            hint="Recommended: 1200 × 630 pixels. Use a publicly accessible image."
                        />

                        <Field label="OG Image Alt Text">
                            <input
                                className="admin-input"
                                value={form.ogImageAlt}
                                onChange={(e) => set("ogImageAlt", e.target.value)}
                                placeholder="FasCave IT Solutions logo"
                            />
                        </Field>
                    </div>
                </div>

                {/* TWITTER / X */}
                <div className="admin-card home-card">
                    <div className="admin-card-header">
                        <div>
                            <h2>Twitter / X Metadata</h2>
                            <p>
                                Controls the link card preview when shared on X.
                            </p>
                        </div>
                    </div>

                    <div className="admin-card-body home-seo-grid">
                        <Field label="Twitter Card Type">
                            <select
                                className="admin-input"
                                value={form.twitterCard}
                                onChange={(e) => set("twitterCard", e.target.value)}
                            >
                                <option value="summary">Summary</option>
                                <option value="summary_large_image">
                                    Summary Large Image
                                </option>
                            </select>
                        </Field>

                        <Field label="Twitter Title">
                            <input
                                className="admin-input"
                                value={form.twitterTitle}
                                onChange={(e) => set("twitterTitle", e.target.value)}
                                placeholder="FasCave | Software Development"
                            />
                        </Field>

                        <Field label="Twitter Description">
                            <textarea
                                className="admin-textarea"
                                value={form.twitterDescription}
                                onChange={(e) => set("twitterDescription", e.target.value)}
                                placeholder="Description for X card..."
                            />
                        </Field>

                        <ImageInput
                            label="Twitter Image"
                            value={form.twitterImage}
                            onChange={(value) => set("twitterImage", value)}
                            hint="Use a publicly accessible image. Large image cards work best with landscape images."
                        />

                        <Field label="Twitter Image Alt Text">
                            <input
                                className="admin-input"
                                value={form.twitterImageAlt}
                                onChange={(e) => set("twitterImageAlt", e.target.value)}
                                placeholder="FasCave IT Solutions logo"
                            />
                        </Field>
                    </div>
                </div>

                {/* WEBSITE APPEARANCE */}
                <div className="admin-card home-card">
                    <div className="admin-card-header">
                        <div>
                            <h2>Website Appearance</h2>
                            <p>
                                Manage browser theme color and website favicon.
                            </p>
                        </div>
                    </div>

                    <div className="admin-card-body home-seo-grid">
                        <Field label="Theme Color">
                            <div className="home-color-control">
                                <input
                                    type="color"
                                    value={/^#[0-9A-Fa-f]{6}$/.test(form.themeColor)
                                        ? form.themeColor
                                        : "#061b33"}
                                    onChange={(e) => set("themeColor", e.target.value)}
                                />
                                <input
                                    className="admin-input"
                                    value={form.themeColor}
                                    onChange={(e) => set("themeColor", e.target.value)}
                                    placeholder="#061b33"
                                />
                            </div>
                        </Field>

                        <ImageInput
                            label="Favicon"
                            value={form.favicon}
                            onChange={(value) => set("favicon", value)}
                            hint="Upload a square PNG, SVG or ICO favicon. A 32 × 32 or 48 × 48 icon is suitable."
                        />
                    </div>
                </div>

                <div className="admin-save-bar">
                    <span className="admin-form-note">
                        Homepage section visibility is saved separately.
                    </span>

                    <button
                        type="button"
                        className="admin-btn admin-btn-secondary"
                        onClick={load}
                        disabled={saving}
                    >
                        Discard
                    </button>

                    <button
                        type="submit"
                        className="admin-btn admin-btn-primary"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save SEO settings"}
                    </button>
                </div>
            </form>

            <Toast toast={toast} onClose={closeToast} />
        </div>
    );
};

export default HomeAdmin;
