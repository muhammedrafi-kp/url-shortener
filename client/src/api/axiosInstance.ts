import axios from "axios";
import type { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import store from "../redux/store";
import { logout } from "../redux/authSlice";

const publicApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            store.dispatch(logout());
        }

        return Promise.reject(error);
    }
);

export { publicApiClient, apiClient };