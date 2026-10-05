import { useCallback, useEffect, useState } from "react";

import { api } from "../../lib/apiClient";

import {
    Alert,
    Field,
    LoadingState,
    PageHeader,
    Toast,
    useToast,
} from "../../components";

import "./WhyChooseUsAdmin.css";


const ENDPOINT = "/api/why-choose-us";

const emptyContent = {
    eyebrow: "",
    heading: "",
    description: "",
    ctaLabel: "",
    ctaHref: "",
    stats: [],
    features: [],
};


const WhyChooseUsAdmin = () => {

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");
    const [saving, setSaving] = useState(false);

    const { toast, showToast, closeToast } = useToast();


    const load = useCallback(async () => {

        setLoading(true);
        setError("");

        try {

            const data = await api.get(ENDPOINT);

            setContent({ ...emptyContent, ...(data || {}) });

        } catch (loadError) {

            setError(
                loadError.message ||
                    "Could not load Why Choose Us content."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        load();

    }, [load]);


    const set = (key, value) => {

        setContent((prev) => ({ ...prev, [key]: value }));

    };

    const patchIn = (listKey, index, key, value) => {

        setContent((prev) => {

            const list = [...prev[listKey]];

            list[index] = { ...list[index], [key]: value };

            return { ...prev, [listKey]: list };

        });

    };

    const addTo = (listKey, blank) => {

        setContent((prev) => ({
            ...prev,
            [listKey]: [...prev[listKey], blank],
        }));

    };

    const removeFrom = (listKey, index) => {

        setContent((prev) => ({
            ...prev,
            [listKey]: prev[listKey].filter((_, i) => i !== index),
        }));

    };

    const move = (listKey, index, delta) => {

        setContent((prev) => {

            const list = [...prev[listKey]];
            const target = index + delta;

            if (target < 0 || target >= list.length) {
                return prev;
            }

            const [row] = list.splice(index, 1);

            list.splice(target, 0, row);

            return { ...prev, [listKey]: list };

        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setFormError("");

        try {

            await api.put(ENDPOINT, content);

            showToast("Why Choose Us content saved.");
            load();

        } catch (saveError) {

            const message = saveError.message || "Save failed.";

            setFormError(message);
            showToast(message, "error");

        } finally {

            setSaving(false);

        }

    };


    return (
        <div className="admin-page">

            <PageHeader
                title="Why Choose Us"
                description="The heading, the five statistics and the four benefit boxes on the home page."
            />

            <Alert message={error} />

            <div className="admin-card">

                {loading ? (
                    <LoadingState label="Loading content" />
                ) : content ? (
                    <form onSubmit={handleSubmit}>

                        <Alert message={formError} />

                        <Field label="Eyebrow">
                            <input
                                type="text"
                                className="admin-input"
                                value={content.eyebrow}
                                onChange={(e) => set("eyebrow", e.target.value)}
                            />
                        </Field>

                        <Field label="Heading">
                            <input
                                type="text"
                                className="admin-input"
                                value={content.heading}
                                onChange={(e) => set("heading", e.target.value)}
                            />
                        </Field>

                        <Field label="Description">
                            <textarea
                                className="admin-textarea"
                                style={{ minHeight: "110px" }}
                                value={content.description}
                                onChange={(e) => set("description", e.target.value)}
                            />
                        </Field>

                        <div className="admin-field-row">
                            <Field label="CTA label">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.ctaLabel}
                                    onChange={(e) => set("ctaLabel", e.target.value)}
                                />
                            </Field>

                            <Field label="CTA link">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.ctaHref}
                                    onChange={(e) => set("ctaHref", e.target.value)}
                                />
                            </Field>
                        </div>

                        {/* ---------- STATISTICS ---------- */}

                        <div className="admin-subset">
                            <div className="admin-subset-header">
                                <h3>Statistics</h3>
                                <button
                                    type="button"
                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                    onClick={() =>
                                        addTo("stats", {
                                            id: content.stats.length + 1,
                                            value: "",
                                            label: "",
                                            icon: "",
                                            color: "",
                                        })
                                    }
                                >
                                    + Add stat
                                </button>
                            </div>

                            <p>
                                Rendered in one row of five. Order
                                here is the order on the page.
                            </p>

                            {content.stats.map((stat, index) => (
                                <div
                                    className="admin-subset-item"
                                    key={index}
                                >
                                    <div className="admin-subset-item-header">
                                        <strong>Stat {index + 1}</strong>

                                        <div className="admin-subset-item-actions">
                                            <button
                                                type="button"
                                                className="admin-btn admin-btn-ghost admin-btn-sm"
                                                onClick={() => move("stats", index, -1)}
                                                aria-label="Move up"
                                            >
                                                ↑
                                            </button>

                                            <button
                                                type="button"
                                                className="admin-btn admin-btn-ghost admin-btn-sm"
                                                onClick={() => move("stats", index, 1)}
                                                aria-label="Move down"
                                            >
                                                ↓
                                            </button>

                                            <button
                                                type="button"
                                                className="admin-btn admin-btn-ghost admin-btn-sm"
                                                onClick={() => removeFrom("stats", index)}
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
                                                onChange={(e) =>
                                                    patchIn("stats", index, "value", e.target.value)
                                                }
                                            />
                                        </Field>

                                        <Field label="Label">
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={stat.label || ""}
                                                onChange={(e) =>
                                                    patchIn("stats", index, "label", e.target.value)
                                                }
                                            />
                                        </Field>

                                        <Field
                                            label="Icon"
                                            hint="Lucide name"
                                        >
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={stat.icon || ""}
                                                placeholder="Trophy"
                                                onChange={(e) =>
                                                    patchIn("stats", index, "icon", e.target.value)
                                                }
                                            />
                                        </Field>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ---------- FEATURES ---------- */}

                        <div className="admin-subset">
                            <div className="admin-subset-header">
                                <h3>Benefit boxes</h3>
                                <button
                                    type="button"
                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                    onClick={() =>
                                        addTo("features", {
                                            title: "",
                                            description: "",
                                            icon: "",
                                        })
                                    }
                                >
                                    + Add box
                                </button>
                            </div>

                            <p>
                                Rendered in one row of four beneath
                                the statistics.
                            </p>

                            {content.features.map((feature, index) => (
                                <div
                                    className="admin-subset-item"
                                    key={index}
                                >
                                    <div className="admin-subset-item-header">
                                        <strong>Box {index + 1}</strong>

                                        <div className="admin-subset-item-actions">
                                            <button
                                                type="button"
                                                className="admin-btn admin-btn-ghost admin-btn-sm"
                                                onClick={() => move("features", index, -1)}
                                                aria-label="Move up"
                                            >
                                                ↑
                                            </button>

                                            <button
                                                type="button"
                                                className="admin-btn admin-btn-ghost admin-btn-sm"
                                                onClick={() => move("features", index, 1)}
                                                aria-label="Move down"
                                            >
                                                ↓
                                            </button>

                                            <button
                                                type="button"
                                                className="admin-btn admin-btn-ghost admin-btn-sm"
                                                onClick={() => removeFrom("features", index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="admin-field-row">
                                        <Field label="Title">
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={feature.title || ""}
                                                onChange={(e) =>
                                                    patchIn("features", index, "title", e.target.value)
                                                }
                                            />
                                        </Field>

                                        <Field
                                            label="Icon"
                                            hint="Lucide name"
                                        >
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={feature.icon || ""}
                                                placeholder="Award"
                                                onChange={(e) =>
                                                    patchIn("features", index, "icon", e.target.value)
                                                }
                                            />
                                        </Field>
                                    </div>

                                    <Field label="Description">
                                        <textarea
                                            className="admin-textarea"
                                            value={feature.description || ""}
                                            onChange={(e) =>
                                                patchIn(
                                                    "features",
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Field>
                                </div>
                            ))}
                        </div>

                        <div className="admin-form-actions">
                            <button
                                type="submit"
                                className="admin-btn admin-btn-primary"
                                disabled={saving}
                            >
                                {saving ? "Saving…" : "Save content"}
                            </button>
                        </div>

                    </form>
                ) : null}

            </div>

            <Toast toast={toast} onClose={closeToast} />

        </div>
    );

};


export default WhyChooseUsAdmin;
