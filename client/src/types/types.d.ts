export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface IUrl {
    id: string;
    shortCode: string;
    originalUrl: string;
    userId: string;
    createdAt: Date;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}