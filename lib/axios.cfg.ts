
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import axios from "axios";

export const api = axios.create({
    baseURL: process.env.BASE_SERVER_URL || "http://localhost:5000",
    withCredentials: true,
});

// Окремий інстанс для рефрешу — без інтерцептора
const refreshApi = axios.create({
    baseURL: process.env.BASE_SERVER_URL || "http://localhost:5000",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) return Promise.reject(error);

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const request = await refreshApi.post("/auth/refresh");
                const accessToken = request.data.accessToken;
                useAuthStore.setState((state) => ({ ...state, accessToken }));

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);