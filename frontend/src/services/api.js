import axios from "axios";

const API_URL = "https://eventbook-xosk.onrender.com";

 
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
