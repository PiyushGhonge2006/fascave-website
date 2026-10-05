import { useState } from "react";

import { useAdminAuth } from "../../context/AdminAuthContext";

import Alert from "../../components/Alert/Alert";
import Field from "../../components/Field/Field";

import "./Login.css";


const Login = () => {

    const { login } = useAdminAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!email.trim() || !password) {

            setError(
                "Please enter your email and password."
            );

            return;

        }

        setBusy(true);

        try {

            await login(
                email.trim(),
                password
            );

        } catch (loginError) {

            setError(
                loginError.message ||
                    "Sign in failed"
            );

        } finally {

            setBusy(false);

        }

    };

    return (
        <div className="admin-login">

            <div className="admin-login-card">

                <div className="admin-login-brand">

                    <div className="admin-login-logo">
                        F
                    </div>

                    <h1>FasCave</h1>
                    <span>ADMIN PANEL</span>

                </div>

                <h2>Sign in</h2>
                <p className="admin-login-sub">
                    Manage your website content from
                    one place.
                </p>

                <Alert message={error} />

                <form onSubmit={handleSubmit}>

                    <Field label="Email address" required>

                        <input
                            type="email"
                            className="admin-input"
                            value={email}
                            placeholder="admin@fascave.com"
                            autoComplete="username"
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                        />

                    </Field>

                    <Field label="Password" required>

                        <div
                            style={{
                                position: "relative",
                            }}
                        >

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                className="admin-input"
                                value={password}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                style={{
                                    paddingRight: "62px",
                                }}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                style={{
                                    position: "absolute",
                                    right: "6px",
                                    top: "50%",
                                    transform:
                                        "translateY(-50%)",
                                    border: "none",
                                    background:
                                        "transparent",
                                    color: "#66666f",
                                    fontSize: "12px",
                                    fontWeight: 650,
                                    cursor: "pointer",
                                    padding: "6px 8px",
                                }}
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </Field>

                    <button
                        type="submit"
                        className="admin-btn admin-btn-primary admin-btn-block"
                        disabled={busy}
                        style={{ marginTop: "6px" }}
                    >
                        {busy
                            ? "Signing in…"
                            : "Sign in"}
                    </button>

                </form>

            </div>

        </div>
    );

};


export default Login;
