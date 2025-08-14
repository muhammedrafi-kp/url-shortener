import { apiClient } from "./axiosInstance";
import type { IUrl, ApiResponse } from "../types/types";

export const createShortUrl = async (originalUrl: string): Promise<ApiResponse<string>> => {
    const res = await apiClient.post("/auth/signup", { originalUrl });
    return res.data;
}

export const getSavedUrls = async (): Promise<ApiResponse<IUrl[]>> => {
    const res = await apiClient.get("/url/user/list");
    return res.data;
}