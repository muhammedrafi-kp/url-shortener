export interface ValidationErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface IUrl {
    id: string;
    shortCode: string;
    shortUrl:string
    originalUrl: string;
    userId: string;
    createdAt: Date;
}


export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}