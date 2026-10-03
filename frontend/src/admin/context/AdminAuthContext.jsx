import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

import { api, getToken, setToken } from "../lib/apiClient";

const AdminAuthContext = createContext(null);


export const AdminAuthProvider = ({ children }) => {

    const [admin, setAdmin] = useState(null);
    const [checking, setChecking] = useState(true);


    // Validate a stored token on first mount
    useEffect(() => {

        let active = true;

        const verify = async () => {

            if (!getToken()) {

                if (active) {
                    setChecking(false);
                }

                return;

            }

            try {

                const data = await api.get(
                    "/api/auth/me"
                );

                if (active && data?.admin) {
                    setAdmin(data.admin);
                }

            } catch {

                setToken(null);

            } finally {

                if (active) {
                    setChecking(false);
                }

            }

        };

        verify();

        return () => {
            active = false;
        };

    }, []);


    const login = useCallback(
        async (email, password) => {

            const data = await api.post(
                "/api/auth/login",
                { email, password }
            );

            setToken(data.token);
            setAdmin(data.admin);

            return data.admin;

        },
        []
    );


    const logout = useCallback(() => {

        setToken(null);
        setAdmin(null);

    }, []);


    const value = useMemo(
        () => ({
            admin,
            checking,
            isAuthenticated: Boolean(admin),
            login,
            logout,
        }),
        [admin, checking, login, logout]
    );

    return (
        <AdminAuthContext.Provider value={value}>
            {children}
        </AdminAuthContext.Provider>
    );

};


export const useAdminAuth = () => {

    const context =
        useContext(AdminAuthContext);

    if (!context) {

        throw new Error(
            "useAdminAuth must be used inside AdminAuthProvider"
        );

    }

    return context;

};
