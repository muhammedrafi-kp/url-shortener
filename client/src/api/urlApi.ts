import { apiClient } from "./axiosInstance";
import type { IUrl, ApiResponse, PaginatedResult } from "../types/types";

export const createShortUrl = async (originalUrl: string): Promise<ApiResponse<string>> => {
    const res = await apiClient.post("/url", { originalUrl });
    return res.data;
}

export const getSavedUrls = async (page: number = 1, limit: number = 5): Promise<ApiResponse<PaginatedResult<IUrl>>> => {
    const res = await apiClient.get(`/url/user/list`, { params: { page, limit } });
    return res.data;
}