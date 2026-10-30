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
} from "../../components";

import "./HomeAdmin.css";


const emptyForm = {
    seoTitle: "",
    seoDescription: "",
};


const SECTIONS = [
    {
        field: "servicesSectionVisible",
        title: "Our Services",
        description:
            "The service cards and the path to individual service pages.",
    },
    {
        field: "whyChooseUsSectionVisible",
        title: "Why Choose Us",
        description:
            "The statistics and benefit boxes that explain your differentiators.",
    },
    {
        field: "clientsSectionVisible",
        title: "Our Clients",
        description:
            "The client logo strip beneath the Why Choose Us section.",
    },
    {
        field: "portfolioSectionVisible",
        title: "Portfolio",
        description:
            "The selected case studies shown on the home page.",
    },
    {
        field: "gtmPartnersSectionVisible",
        title: "GTM Partners",
        description:
            "The partner and technology logo strip.",
    },
    {
        field: "faqSectionVisible",
        title: "FAQ",
        description:
            "The frequently asked questions block at the bottom of the page.",
    },
];


const HomeAdmin = () => {

    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const { toast, showToast, closeToast } =
        useToast();


    const load = async () => {

        setLoading(true);
        setError("");

        try {

            const data = await api.get(
                "/api/content/home"
            );

            setForm({
                seoTitle: data?.seoTitle || "",
                seoDescription:
                    data?.seoDescription || "",
            });

        } catch (loadError) {

            setError(
                loadError.message ||
                    "Could not load home content."
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

            await api.put(
                "/api/content/home",
                form
            );

            showToast("Homepage settings saved.");

        } catch (saveError) {

            const message =
                saveError.message ||
                "Save failed.";

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
        <div className="admin-page">

            <PageHeader
                title="Home Page"
                description="Control homepage section visibility and search metadata. The hero is fixed in the website design."
            />

            <Alert message={error} />

            <div className="home-admin-note">

                <span className="home-admin-note-mark">
                    H
                </span>

                <div>
                    <h2>Hero is hardcoded</h2>
                    <p>
                        The hero carousel is part of the
                        website design and is no longer
                        edited from the CMS. The settings
                        below control the sections beneath
                        it.
                    </p>
                </div>

            </div>

            <div className="home-visibility-heading">
                <h2>Homepage sections</h2>
                <p>
                    Hide a section without deleting its
                    content. Changes take effect on the
                    public website immediately.
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

                <div className="admin-card home-card">

                    <div className="admin-card-header">
                        <div>
                            <h2>Search metadata</h2>
                            <p>
                                Title and description used by
                                search engines.
                            </p>
                        </div>
                    </div>

                    <div className="admin-card-body">

                        <Field label="Meta title">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.seoTitle}
                                onChange={(e) =>
                                    set(
                                        "seoTitle",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field label="Meta description">
                            <textarea
                                className="admin-textarea"
                                value={form.seoDescription}
                                onChange={(e) =>
                                    set(
                                        "seoDescription",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                    </div>

                </div>

                <div className="admin-save-bar">

                    <span className="admin-form-note">
                        Section visibility is saved
                        separately and updates instantly.
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
                        {saving
                            ? "Saving..."
                            : "Save SEO settings"}
                    </button>

                </div>

            </form>

            <Toast
                toast={toast}
                onClose={closeToast}
            />

        </div>
    );

};


export default HomeAdmin;
