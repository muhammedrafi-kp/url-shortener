import { publicApiClient } from "./axiosInstance";
import type { IUser, ApiResponse, FormData, LoginFormData } from "../types/types";

export const loginUser = async (userData: LoginFormData): Promise<ApiResponse<IUser>> => {
    const res = await publicApiClient.post("/auth/login", userData);
    return res.data;
}

export const signupUser = async (userData: FormData): Promise<ApiResponse<IUser>> => {
    const res = await publicApiClient.post("/auth/signup", userData);
    return res.data;
}

export const logoutUser = async (): Promise<ApiResponse<void>> => {
    const res = await publicApiClient.post("/auth/logout");
    return res.data;
}

export const googleAuthCallback = async (credential: string): Promise<ApiResponse<IUser>> => {
    const res = await publicApiClient.post("/auth/google/callback", { credential });
    return res.data;
}

