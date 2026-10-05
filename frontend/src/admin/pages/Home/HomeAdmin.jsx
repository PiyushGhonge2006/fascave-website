import { useEffect, useState } from "react";

import { api } from "../../lib/apiClient";

import {
    Alert,
    Field,
    ImageInput,
    LoadingState,
    PageHeader,
    Toast,
    useToast,
} from "../../components";

import "./HomeAdmin.css";


const emptyForm = {
    hero: {
        eyebrow: "",
        heading: "",
        highlightText: "",
        description: "",
        ctaLabel: "",
        ctaHref: "/contact",
        image: "",
    },
    stats: [],
    clients: [],
    seoTitle: "",
    seoDescription: "",
};


const mergeForm = (data) => {

    if (!data) {
        return emptyForm;
    }

    return {
        ...emptyForm,
        ...data,
        hero: {
            ...emptyForm.hero,
            ...(data.hero || {}),
        },
        stats: data.stats || [],
        clients: data.clients || [],
    };

};


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

            setForm(mergeForm(data));

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


    const setHero = (key, value) => {

        setForm((prev) => ({
            ...prev,
            hero: {
                ...prev.hero,
                [key]: value,
            },
        }));

    };


    const setTop = (key, value) => {

        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));

    };


    // ---------------- STATS ----------------

    const addStat = () => {

        setForm((prev) => ({
            ...prev,
            stats: [
                ...prev.stats,
                { value: "", label: "" },
            ],
        }));

    };

    const updateStat = (index, key, value) => {

        setForm((prev) => {

            const stats =
                [...prev.stats];

            stats[index] = {
                ...stats[index],
                [key]: value,
            };

            return { ...prev, stats };

        });

    };

    const removeStat = (index) => {

        setForm((prev) => ({
            ...prev,
            stats: prev.stats.filter(
                (_, i) => i !== index
            ),
        }));

    };


    // ---------------- CLIENTS ----------------

    const addClient = () => {

        setForm((prev) => ({
            ...prev,
            clients: [
                ...prev.clients,
                { name: "", logo: "", link: "" },
            ],
        }));

    };

    const updateClient = (
        index,
        key,
        value
    ) => {

        setForm((prev) => {

            const clients =
                [...prev.clients];

            clients[index] = {
                ...clients[index],
                [key]: value,
            };

            return { ...prev, clients };

        });

    };

    const removeClient = (index) => {

        setForm((prev) => ({
            ...prev,
            clients: prev.clients.filter(
                (_, i) => i !== index
            ),
        }));

    };


    // ---------------- SAVE ----------------

    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setError("");

        try {

            await api.put(
                "/api/content/home",
                form
            );

            showToast(
                "Home content saved."
            );

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
                <LoadingState label="Loading home content" />
            </div>
        );

    }

    return (
        <div className="admin-page">

            <PageHeader
                title="Home Page"
                description="Control the hero section, headline stats and client logos shown on your landing page."
            />

            <Alert message={error} />

            <form onSubmit={handleSubmit}>

                {/* HERO */}
                <div className="admin-card home-card">

                    <div className="admin-card-header">
                        <div>
                            <h2>Hero section</h2>
                            <p>
                                The first thing
                                visitors see.
                            </p>
                        </div>
                    </div>

                    <div className="admin-card-body">

                        <div className="admin-field-row">

                            <Field label="Eyebrow">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={form.hero.eyebrow}
                                    placeholder="Digital growth partner"
                                    onChange={(e) =>
                                        setHero(
                                            "eyebrow",
                                            e.target.value
                                        )
                                    }
                                />
                            </Field>

                            <Field label="CTA link">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={form.hero.ctaHref}
                                    placeholder="/contact"
                                    onChange={(e) =>
                                        setHero(
                                            "ctaHref",
                                            e.target.value
                                        )
                                    }
                                />
                            </Field>

                        </div>

                        <Field label="Heading">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.hero.heading}
                                placeholder="We build brands that"
                                onChange={(e) =>
                                    setHero(
                                        "heading",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field
                            label="Highlighted words"
                            hint="Rendered in accent colour, for example: compound"
                        >
                            <input
                                type="text"
                                className="admin-input"
                                value={form.hero.highlightText}
                                onChange={(e) =>
                                    setHero(
                                        "highlightText",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field label="Description">
                            <textarea
                                className="admin-textarea"
                                value={form.hero.description}
                                onChange={(e) =>
                                    setHero(
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <div className="admin-field-row">

                            <Field label="CTA button label">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={form.hero.ctaLabel}
                                    placeholder="Start a project"
                                    onChange={(e) =>
                                        setHero(
                                            "ctaLabel",
                                            e.target.value
                                        )
                                    }
                                />
                            </Field>

                            <div />

                        </div>

                        <ImageInput
                            label="Hero image"
                            value={form.hero.image}
                            onChange={(value) =>
                                setHero("image", value)
                            }
                        />

                    </div>
                </div>

                {/* STATS */}
                <div className="admin-card home-card">

                    <div className="admin-card-header">
                        <div>
                            <h2>Headline stats</h2>
                            <p>
                                Number counters
                                shown near the hero.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            onClick={addStat}
                        >
                            + Add stat
                        </button>
                    </div>

                    <div className="admin-card-body">

                        {form.stats.length === 0 && (
                            <p className="admin-field-hint">
                                No stats yet. Add your
                                first counter.
                            </p>
                        )}

                        {form.stats.map((stat, index) => (
                            <div
                                className="admin-subset-item"
                                key={index}
                            >

                                <div className="admin-subset-item-header">
                                    <strong>
                                        Stat {index + 1}
                                    </strong>

                                    <div className="admin-subset-item-actions">
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn-ghost admin-btn-sm"
                                            onClick={() =>
                                                removeStat(
                                                    index
                                                )
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="admin-field-row">

                                    <Field label="Value">
                                        <input
                                            type="text"
                                            className="admin-input"
                                            value={stat.value || ""}
                                            placeholder="150+"
                                            onChange={(e) =>
                                                updateStat(
                                                    index,
                                                    "value",
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />
                                    </Field>

                                    <Field label="Label">
                                        <input
                                            type="text"
                                            className="admin-input"
                                            value={stat.label || ""}
                                            placeholder="Projects delivered"
                                            onChange={(e) =>
                                                updateStat(
                                                    index,
                                                    "label",
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />
                                    </Field>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>

                {/* CLIENTS */}
                <div className="admin-card home-card">

                    <div className="admin-card-header">
                        <div>
                            <h2>Client logos</h2>
                            <p>
                                Brands shown in the
                                client strip.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            onClick={addClient}
                        >
                            + Add client
                        </button>
                    </div>

                    <div className="admin-card-body">

                        {form.clients.length === 0 && (
                            <p className="admin-field-hint">
                                No clients yet. Add
                                your first logo.
                            </p>
                        )}

                        {form.clients.map(
                            (client, index) => (
                                <div
                                    className="admin-subset-item"
                                    key={index}
                                >

                                    <div className="admin-subset-item-header">
                                        <strong>
                                            Client{" "}
                                            {index + 1}
                                        </strong>

                                        <div className="admin-subset-item-actions">
                                            <button
                                                type="button"
                                                className="admin-btn admin-btn-ghost admin-btn-sm"
                                                onClick={() =>
                                                    removeClient(
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="admin-field-row">

                                        <Field label="Name">
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={client.name || ""}
                                                onChange={(e) =>
                                                    updateClient(
                                                        index,
                                                        "name",
                                                        e.target
                                                            .value
                                                    )
                                                }
                                            />
                                        </Field>

                                        <Field label="Website">
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={client.link || ""}
                                                placeholder="https://"
                                                onChange={(e) =>
                                                    updateClient(
                                                        index,
                                                        "link",
                                                        e.target
                                                            .value
                                                    )
                                                }
                                            />
                                        </Field>

                                    </div>

                                    <ImageInput
                                        label="Logo"
                                        value={client.logo || ""}
                                        onChange={(value) =>
                                            updateClient(
                                                index,
                                                "logo",
                                                value
                                            )
                                        }
                                    />

                                </div>
                            )
                        )}

                    </div>
                </div>

                {/* SEO */}
                <div className="admin-card home-card">

                    <div className="admin-card-header">
                        <div>
                            <h2>SEO</h2>
                            <p>
                                Search snippet
                                metadata.
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
                                    setTop(
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
                                    setTop(
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
                        Changes go live on the
                        website immediately after
                        saving.
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
                            ? "Saving…"
                            : "Save changes"}
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
