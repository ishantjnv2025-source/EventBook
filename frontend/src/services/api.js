import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const backendUrl = apiUrl.replace(/\/api\/?$/, "");

const api = axios.create({
    baseURL: apiUrl,
});

// Automatically attach the JWT token to every request
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
