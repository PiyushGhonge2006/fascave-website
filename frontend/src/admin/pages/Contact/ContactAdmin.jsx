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

import "./ContactAdmin.css";


const ENDPOINT = "/api/content/contact";

const emptyContent = {
    eyebrow: "",
    heading: "",
    description: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    hoursLabel: "",
    hours: "",
    socials: [],
};


const ContactAdmin = () => {

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
                    "Could not load contact content."
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

    const patchSocial = (index, key, value) => {

        setContent((prev) => {

            const socials = [...prev.socials];

            socials[index] = { ...socials[index], [key]: value };

            return { ...prev, socials };

        });

    };

    const addSocial = () => {

        setContent((prev) => ({
            ...prev,
            socials: [...prev.socials, { network: "", label: "", url: "" }],
        }));

    };

    const removeSocial = (index) => {

        setContent((prev) => ({
            ...prev,
            socials: prev.socials.filter((_, i) => i !== index),
        }));

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setFormError("");

        try {

            await api.put(ENDPOINT, content);

            showToast("Contact details saved.");

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
                title="Contact"
                description="Company contact details and social links. Enquiries themselves are under Messages."
            />

            <Alert message={error} />

            <div className="admin-card">

                {loading ? (
                    <LoadingState label="Loading contact content" />
                ) : content ? (
                    <form onSubmit={handleSubmit}>

                        <Alert message={formError} />

                        <h3 className="admin-subset-title">Page heading</h3>

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
                                style={{ minHeight: "100px" }}
                                value={content.description}
                                onChange={(e) => set("description", e.target.value)}
                            />
                        </Field>

                        <h3 className="admin-subset-title">Contact details</h3>

                        <div className="admin-field-row">
                            <Field label="Email">
                                <input
                                    type="email"
                                    className="admin-input"
                                    value={content.email}
                                    onChange={(e) => set("email", e.target.value)}
                                />
                            </Field>

                            <Field label="Phone">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.phone}
                                    onChange={(e) => set("phone", e.target.value)}
                                />
                            </Field>
                        </div>

                        <div className="admin-field-row">
                            <Field label="Location">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.location}
                                    onChange={(e) => set("location", e.target.value)}
                                />
                            </Field>

                            <Field label="Address">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.address}
                                    onChange={(e) => set("address", e.target.value)}
                                />
                            </Field>
                        </div>

                        <div className="admin-field-row">
                            <Field label="Hours label">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.hoursLabel}
                                    onChange={(e) => set("hoursLabel", e.target.value)}
                                />
                            </Field>

                            <Field label="Hours">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.hours}
                                    onChange={(e) => set("hours", e.target.value)}
                                />
                            </Field>
                        </div>

                        {/* ---------- SOCIALS ---------- */}

                        <div className="admin-subset">
                            <div className="admin-subset-header">
                                <h3>Social links</h3>
                                <button
                                    type="button"
                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                    onClick={addSocial}
                                >
                                    + Add link
                                </button>
                            </div>

                            <p>Shown in the footer.</p>

                            {content.socials.length === 0 && (
                                <p className="admin-field-hint">
                                    No social links yet.
                                </p>
                            )}

                            {content.socials.map((social, index) => (
                                <div
                                    className="admin-subset-item"
                                    key={index}
                                >
                                    <div className="admin-subset-item-header">
                                        <strong>
                                            {social.network ||
                                                `Link ${index + 1}`}
                                        </strong>

                                        <button
                                            type="button"
                                            className="admin-btn admin-btn-ghost admin-btn-sm"
                                            onClick={() => removeSocial(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="admin-field-row">
                                        <Field label="Network">
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={social.network || ""}
                                                onChange={(e) =>
                                                    patchSocial(index, "network", e.target.value)
                                                }
                                            />
                                        </Field>

                                        <Field label="Label">
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={social.label || ""}
                                                onChange={(e) =>
                                                    patchSocial(index, "label", e.target.value)
                                                }
                                            />
                                        </Field>
                                    </div>

                                    <Field label="URL">
                                        <input
                                            type="text"
                                            className="admin-input"
                                            value={social.url || ""}
                                            placeholder="https://"
                                            onChange={(e) =>
                                                patchSocial(index, "url", e.target.value)
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
                                {saving ? "Saving…" : "Save contact details"}
                            </button>
                        </div>

                    </form>
                ) : null}

            </div>

            <Toast toast={toast} onClose={closeToast} />

        </div>
    );

};


export default ContactAdmin;
