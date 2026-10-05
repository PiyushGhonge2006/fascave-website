import { useState } from "react";

import Field from "../Field/Field";


const TextListInput = ({
    label,
    hint,
    values = [],
    onChange,
    placeholder = "Add an item",
    addLabel = "Add",
}) => {

    const [draft, setDraft] = useState("");

    const addItem = () => {

        const value = draft.trim();

        if (!value) {
            return;
        }

        onChange([...values, value]);
        setDraft("");

    };

    const removeAt = (index) => {

        onChange(
            values.filter(
                (_, i) => i !== index
            )
        );

    };

    return (
        <Field label={label} hint={hint}>

            {values.length > 0 && (
                <div className="admin-tag-list">

                    {values.map((item, index) => (
                        <span
                            className="admin-tag"
                            key={`${item}-${index}`}
                        >
                            {item}

                            <button
                                type="button"
                                onClick={() =>
                                    removeAt(index)
                                }
                                aria-label={`Remove ${item}`}
                            >
                                ×
                            </button>
                        </span>
                    ))}

                </div>
            )}

            <div className="admin-inline-add">

                <input
                    type="text"
                    className="admin-input"
                    value={draft}
                    placeholder={placeholder}
                    onChange={(event) =>
                        setDraft(event.target.value)
                    }
                    onKeyDown={(event) => {

                        if (event.key === "Enter") {

                            event.preventDefault();
                            addItem();

                        }

                    }}
                />

                <button
                    type="button"
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={addItem}
                >
                    {addLabel}
                </button>

            </div>

        </Field>
    );

};


export default TextListInput;
