import { useRef, useState } from "react";

import { api } from "../../lib/apiClient";


const ImageInput = ({
    label,
    hint,
    value = "",
    onChange,
    placeholder = "Paste an image URL",
}) => {

    const fileRef = useRef(null);

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const handleFile = async (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setError("");
        setUploading(true);

        try {

            const data = await api.upload(
                "/api/uploads",
                file
            );

            onChange(data.url);

        } catch (uploadError) {

            setError(
                uploadError.message ||
                    "Upload failed"
            );

        } finally {

            setUploading(false);

            if (fileRef.current) {

                fileRef.current.value = "";

            }

        }

    };

    return (
        <div className="admin-field">

            {label && (
                <label>{label}</label>
            )}

            <div className="admin-image-input">

                <div className="admin-image-preview">

                    {value ? (
                        <img
                            src={value}
                            alt="Preview"
                            onError={(event) => {

                                event.currentTarget.style.display =
                                    "none";

                            }}
                        />
                    ) : (
                        <span>No image</span>
                    )}

                </div>

                <div className="admin-image-controls">

                    <input
                        type="text"
                        className="admin-input"
                        value={value}
                        placeholder={placeholder}
                        onChange={(event) =>
                            onChange(event.target.value)
                        }
                        disabled={uploading}
                    />

                    <div className="admin-image-actions">

                        <button
                            type="button"
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            onClick={() =>
                                fileRef.current?.click()
                            }
                            disabled={uploading}
                        >
                            {uploading
                                ? "Uploading…"
                                : "Choose file"}
                        </button>

                        {value && (
                            <button
                                type="button"
                                className="admin-btn admin-btn-ghost admin-btn-sm"
                                onClick={() =>
                                    onChange("")
                                }
                                disabled={uploading}
                            >
                                Clear
                            </button>
                        )}

                    </div>

                    <p
                        className="admin-image-note"
                        style={{ marginTop: "8px" }}
                    >
                        {error ||
                            "Upload a file (max 5 MB) or paste an external URL."}
                    </p>

                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        style={{ display: "none" }}
                    />

                </div>

            </div>

            {hint && (
                <span className="admin-field-hint">
                    {hint}
                </span>
            )}

        </div>
    );

};


export default ImageInput;
