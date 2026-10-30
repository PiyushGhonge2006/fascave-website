import { useCallback, useEffect, useState } from "react";

import { api } from "../../lib/apiClient";

import Alert from "../Alert/Alert";
import LoadingState from "../LoadingState/LoadingState";

import "./SectionVisibilityCard.css";


const HOME_ENDPOINT = "/api/content/home";


const SectionVisibilityCard = ({
    field,
    title,
    description,
    endpoint = HOME_ENDPOINT,
}) => {

    const [visible, setVisible] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    const load = useCallback(async () => {

        setLoading(true);
        setError("");

        try {

            const data = await api.get(endpoint);

            setVisible(
                data?.[field] !== false
            );

        } catch (loadError) {

            setError(
                loadError.message ||
                    "Could not load visibility settings."
            );

        } finally {

            setLoading(false);

        }

    }, [endpoint, field]);


    useEffect(() => {

        load();

    }, [load]);


    const toggle = async () => {

        const previous = visible;
        const next = !visible;

        setVisible(next);
        setSaving(true);
        setError("");

        try {

            const saved = await api.put(
                endpoint,
                { [field]: next }
            );

            setVisible(
                saved?.[field] !== false
            );

        } catch (saveError) {

            setVisible(previous);
            setError(
                saveError.message ||
                    "Could not update visibility."
            );

        } finally {

            setSaving(false);

        }

    };


    return (
        <section className="admin-card section-visibility-card">

            <div className="section-visibility-main">

                <div className="section-visibility-copy">

                    <span className="section-visibility-kicker">
                        Homepage visibility
                    </span>

                    <h2>{title}</h2>

                    <p>{description}</p>

                </div>

                {loading ? (
                    <LoadingState label="Checking visibility" />
                ) : (
                    <button
                        type="button"
                        role="switch"
                        aria-checked={visible === true}
                        aria-label={`${title} visibility`}
                        className={`section-visibility-switch ${
                            visible ? "is-on" : "is-off"
                        }`}
                        onClick={toggle}
                        disabled={saving}
                    >

                        <span className="section-visibility-track">
                            <span className="section-visibility-thumb" />
                        </span>

                        <span className="section-visibility-state">
                            {saving
                                ? "Saving"
                                : visible
                                    ? "Visible"
                                    : "Hidden"}
                        </span>

                    </button>
                )}

            </div>

            <Alert message={error} />

        </section>
    );

};


export default SectionVisibilityCard;
