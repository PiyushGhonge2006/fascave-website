import { useCallback, useEffect, useState } from "react";

import { api } from "../../lib/apiClient";

import {
    Alert,
    Field,
    ImageInput,
    LoadingState,
    PageHeader,
    SectionVisibilityCard,
    Toast,
    useToast,
} from "../../components";

import "./ClientsAdmin.css";


const ENDPOINT = "/api/content/home";

const emptyClient = {
    name: "",
    logo: "",
    link: "",
    isActive: true,
};


const ClientsAdmin = () => {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const { toast, showToast, closeToast } =
        useToast();


    const load = useCallback(async () => {

        setLoading(true);
        setError("");

        try {

            const data = await api.get(ENDPOINT);

            setClients(
                Array.isArray(data?.clients)
                    ? data.clients
                    : []
            );

        } catch (loadError) {

            setError(
                loadError.message ||
                    "Could not load clients."
            );

        } finally {

            setLoading(false);

        }

    }, []);


    useEffect(() => {

        load();

    }, [load]);


    const updateClient = (index, key, value) => {

        setClients((prev) =>
            prev.map((client, itemIndex) =>
                itemIndex === index
                    ? { ...client, [key]: value }
                    : client
            )
        );

    };


    const addClient = () => {

        setClients((prev) => [
            ...prev,
            { ...emptyClient },
        ]);

    };


    const removeClient = (index) => {

        setClients((prev) =>
            prev.filter((_, itemIndex) => itemIndex !== index)
        );

    };


    const moveClient = (index, delta) => {

        setClients((prev) => {

            const target = index + delta;

            if (target < 0 || target >= prev.length) {
                return prev;
            }

            const next = [...prev];
            const [client] = next.splice(index, 1);

            next.splice(target, 0, client);

            return next;

        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setError("");

        try {

            const saved = await api.put(
                ENDPOINT,
                { clients }
            );

            if (Array.isArray(saved?.clients)) {
                setClients(saved.clients);
            }

            showToast("Client logos saved.");

        } catch (saveError) {

            const message =
                saveError.message ||
                "Could not save clients.";

            setError(message);
            showToast(message, "error");

        } finally {

            setSaving(false);

        }

    };


    return (
        <div className="admin-page">

            <PageHeader
                title="Our Clients"
                description="Manage the client logos shown on the home page, their order and their individual visibility."
            />

            <Alert message={error} />

            <SectionVisibilityCard
                field="clientsSectionVisible"
                title="Our Clients section"
                description="Show or hide the complete client logo strip on the home page. Individual logos can be hidden below."
            />

            <form onSubmit={handleSubmit}>

                <div className="admin-card clients-admin-panel">

                    <div className="admin-card-header">

                        <div>
                            <h2>Client logos</h2>
                            <p>
                                {clients.length === 0
                                    ? "No clients have been added yet."
                                    : `${clients.length} client${
                                          clients.length === 1
                                              ? ""
                                              : "s"
                                      } in display order.`}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="admin-btn admin-btn-primary admin-btn-sm"
                            onClick={addClient}
                        >
                            + Add client
                        </button>

                    </div>

                    {loading ? (
                        <div className="admin-card-body">
                            <LoadingState label="Loading clients" />
                        </div>
                    ) : clients.length === 0 ? (
                        <div className="clients-admin-empty">

                            <span className="clients-admin-empty-mark">
                                C
                            </span>

                            <h3>No clients yet</h3>
                            <p>
                                Add a client name, logo and
                                optional website to start the
                                logo strip.
                            </p>

                            <button
                                type="button"
                                className="admin-btn admin-btn-primary"
                                onClick={addClient}
                            >
                                + Add first client
                            </button>

                        </div>
                    ) : (
                        <div className="clients-admin-grid">

                            {clients.map((client, index) => {

                                const visible =
                                    client.isActive !== false;

                                return (
                                    <article
                                        className={`client-admin-card ${
                                            visible
                                                ? ""
                                                : "is-hidden"
                                        }`}
                                        key={
                                            client._id ||
                                            `client-${index}`
                                        }
                                    >

                                        <div className="client-admin-card-head">

                                            <div>

                                                <span className="client-admin-index">
                                                    {String(
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>

                                                <span
                                                    className={`admin-badge ${
                                                        visible
                                                            ? "admin-badge-success"
                                                            : "admin-badge-neutral"
                                                    }`}
                                                >
                                                    {visible
                                                        ? "Visible"
                                                        : "Hidden"}
                                                </span>

                                            </div>

                                            <div className="client-admin-actions">

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-ghost admin-btn-sm"
                                                    onClick={() =>
                                                        moveClient(
                                                            index,
                                                            -1
                                                        )
                                                    }
                                                    disabled={
                                                        index ===
                                                        0
                                                    }
                                                    aria-label="Move client up"
                                                >
                                                    ↑
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-ghost admin-btn-sm"
                                                    onClick={() =>
                                                        moveClient(
                                                            index,
                                                            1
                                                        )
                                                    }
                                                    disabled={
                                                        index ===
                                                        clients.length -
                                                            1
                                                    }
                                                    aria-label="Move client down"
                                                >
                                                    ↓
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-ghost admin-btn-sm"
                                                    onClick={() =>
                                                        updateClient(
                                                            index,
                                                            "isActive",
                                                            !visible
                                                        )
                                                    }
                                                >
                                                    {visible
                                                        ? "Hide"
                                                        : "Show"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-ghost admin-btn-sm client-admin-remove"
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

                                        <div className="client-admin-fields">

                                            <Field label="Client name">
                                                <input
                                                    type="text"
                                                    className="admin-input"
                                                    value={
                                                        client.name ||
                                                        ""
                                                    }
                                                    placeholder="Company name"
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

                                            <Field
                                                label="Website"
                                                hint="Optional"
                                            >
                                                <input
                                                    type="text"
                                                    className="admin-input"
                                                    value={
                                                        client.link ||
                                                        ""
                                                    }
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
                                            value={
                                                client.logo || ""
                                            }
                                            onChange={(value) =>
                                                updateClient(
                                                    index,
                                                    "logo",
                                                    value
                                                )
                                            }
                                        />

                                    </article>
                                );

                            })}

                        </div>
                    )}

                </div>

                <div className="admin-save-bar">

                    <span className="admin-form-note">
                        Hidden clients stay saved but do not
                        appear on the website.
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
                        disabled={saving || loading}
                    >
                        {saving
                            ? "Saving..."
                            : "Save clients"}
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


export default ClientsAdmin;
