/* The admin panel shares the single API base used by the rest of
   the app, so there is only one place VITE_API_URL is read. With no
   value set, requests stay relative and the Vite dev proxy forwards
   them to the backend. */
import { apiUrl } from "../../utils/apiBase";

const TOKEN_KEY = "fascave_admin_token";


export const getToken = () => {

    try {

        return localStorage.getItem(
            TOKEN_KEY
        );

    } catch {

        return null;

    }

};


export const setToken = (token) => {

    try {

        if (token) {

            localStorage.setItem(
                TOKEN_KEY,
                token
            );

        } else {

            localStorage.removeItem(
                TOKEN_KEY
            );

        }

    } catch {

        /* storage unavailable */

    }

};


class ApiError extends Error {

    constructor(
        message,
        status,
        payload
    ) {

        super(message);

        this.name = "ApiError";
        this.status = status;
        this.payload = payload;

    }

}


const parseError = async (res) => {

    let payload = null;

    try {

        payload = await res.json();

    } catch {

        payload = null;

    }

    const message =
        payload?.message ||
        `Request failed with status ${res.status}`;

    return new ApiError(
        message,
        res.status,
        payload
    );

};


const request = async (
    path,
    { method = "GET", body, auth = true } = {}
) => {

    const headers = {};

    const token =
        getToken();

    if (auth && token) {

        headers.Authorization =
            `Bearer ${token}`;

    }

    const isFormData =
        body instanceof FormData;

    if (
        body &&
        !isFormData
    ) {

        headers["Content-Type"] =
            "application/json";

    }

    let response;

    try {

        response = await fetch(
            apiUrl(path),
            {
                method,
                headers,
                body: isFormData
                    ? body
                    : body
                        ? JSON.stringify(body)
                        : undefined,
            }
        );

    } catch {

        throw new ApiError(
            "Cannot reach the server. Check that the backend is running.",
            0,
            null
        );

    }

    if (!response.ok) {

        throw await parseError(response);

    }

    if (response.status === 204) {

        return null;

    }

    const data = await response
        .json()
        .catch(() => null);

    return data?.data !== undefined
        ? data.data
        : data;

};


const withQuery = (path, params) => {

    if (!params) {

        return path;

    }

    const search =
        new URLSearchParams();

    Object.entries(params).forEach(
        ([key, value]) => {

            if (
                value !== undefined &&
                value !== null &&
                value !== ""
            ) {

                search.append(
                    key,
                    value
                );

            }

        }
    );

    const qs =
        search.toString();

    return qs
        ? `${path}?${qs}`
        : path;

};


export const api = {
    get: (path, params) =>
        request(
            withQuery(path, params),
            { method: "GET" }
        ),

    post: (path, body) =>
        request(path, {
            method: "POST",
            body,
        }),

    put: (path, body) =>
        request(path, {
            method: "PUT",
            body,
        }),

    patch: (path, body) =>
        request(path, {
            method: "PATCH",
            body,
        }),

    del: (path) =>
        request(path, {
            method: "DELETE",
        }),

    upload: (path, file) => {

        const form = new FormData();

        form.append("image", file);

        return request(path, {
            method: "POST",
            body: form,
        });

    },

    apiUrl,
};


export { ApiError };
