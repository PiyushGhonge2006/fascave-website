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

import "./AboutAdmin.css";


const emptyForm = {
    eyebrow: "",
    heading: "",
    description: "",
    image: "",
    mission: "",
    vision: "",
    values: [],
    seoTitle: "",
    seoDescription: "",
};


const mergeForm = (data) => ({
    ...emptyForm,
    ...(data || {}),
    values: data?.values || [],
});


const AboutAdmin = () => {

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
                "/api/content/about"
            );

            setForm(mergeForm(data));

        } catch (loadError) {

            setError(
                loadError.message ||
                    "Could not load about content."
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


    const addValue = () => {

        setForm((prev) => ({
            ...prev,
            values: [
                ...prev.values,
                {
                    title: "",
                    description: "",
                    icon: "",
                },
            ],
        }));

    };

    const updateValue = (
        index,
        key,
        value
    ) => {

        setForm((prev) => {

            const values = [...prev.values];

            values[index] = {
                ...values[index],
                [key]: value,
            };

            return { ...prev, values };

        });

    };

    const removeValue = (index) => {

        setForm((prev) => ({
            ...prev,
            values: prev.values.filter(
                (_, i) => i !== index
            ),
        }));

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setError("");

        try {

            await api.put(
                "/api/content/about",
                form
            );

            showToast(
                "About content saved."
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
                <LoadingState label="Loading about content" />
            </div>
        );

    }

    return (
        <div className="admin-page">

            <PageHeader
                title="About Us"
                description="Your company story, mission, vision and core values."
            />

            <Alert message={error} />

            <form onSubmit={handleSubmit}>

                <div className="admin-card about-card">

                    <div className="admin-card-header">
                        <div>
                            <h2>Page content</h2>
                            <p>
                                Intro section shown
                                at the top of the
                                page.
                            </p>
                        </div>
                    </div>

                    <div className="admin-card-body">

                        <Field label="Eyebrow">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.eyebrow}
                                placeholder="About FasCave"
                                onChange={(e) =>
                                    set(
                                        "eyebrow",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field label="Heading">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.heading}
                                onChange={(e) =>
                                    set(
                                        "heading",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field label="Description">
                            <textarea
                                className="admin-textarea"
                                value={form.description}
                                onChange={(e) =>
                                    set(
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <ImageInput
                            label="Hero image"
                            value={form.image}
                            onChange={(value) =>
                                set("image", value)
                            }
                        />

                    </div>
                </div>

                <div className="admin-card about-card">

                    <div className="admin-card-header">
                        <div>
                            <h2>Mission &amp; vision</h2>
                            <p>
                                Your core
                                statements.
                            </p>
                        </div>
                    </div>

                    <div className="admin-card-body">

                        <Field label="Mission">
                            <textarea
                                className="admin-textarea"
                                value={form.mission}
                                onChange={(e) =>
                                    set(
                                        "mission",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field label="Vision">
                            <textarea
                                className="admin-textarea"
                                value={form.vision}
                                onChange={(e) =>
                                    set(
                                        "vision",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                    </div>
                </div>

                <div className="admin-card about-card">

                    <div className="admin-card-header">
                        <div>
                            <h2>Core values</h2>
                            <p>
                                What customers
                                should remember.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            onClick={addValue}
                        >
                            + Add value
                        </button>
                    </div>

                    <div className="admin-card-body">

                        {form.values.length === 0 && (
                            <p className="admin-field-hint">
                                No values yet. Add
                                your first one.
                            </p>
                        )}

                        {form.values.map((item, index) => (
                            <div
                                className="admin-subset-item"
                                key={index}
                            >

                                <div className="admin-subset-item-header">
                                    <strong>
                                        Value {index + 1}
                                    </strong>

                                    <div className="admin-subset-item-actions">
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn-ghost admin-btn-sm"
                                            onClick={() =>
                                                removeValue(
                                                    index
                                                )
                                            }
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
                                            value={item.title || ""}
                                            onChange={(e) =>
                                                updateValue(
                                                    index,
                                                    "title",
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />
                                    </Field>

                                    <Field label="Icon name">
                                        <input
                                            type="text"
                                            className="admin-input"
                                            value={item.icon || ""}
                                            placeholder="Compass"
                                            onChange={(e) =>
                                                updateValue(
                                                    index,
                                                    "icon",
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />
                                    </Field>

                                </div>

                                <Field label="Description">
                                    <textarea
                                        className="admin-textarea"
                                        value={item.description || ""}
                                        onChange={(e) =>
                                            updateValue(
                                                index,
                                                "description",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </Field>

                            </div>
                        ))}

                    </div>
                </div>

                <div className="admin-card about-card">

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

export default AboutAdmin;
