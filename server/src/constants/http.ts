// http.enums.ts

export enum HTTP_STATUS {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
}

export enum HTTP_MESSAGE {
    OK = "Success",
    CREATED = "Resource created successfully",
    ACCEPTED = "Request accepted",
    NO_CONTENT = "No content available",
    BAD_REQUEST = "Bad request",
    UNAUTHORIZED = "Unauthorized access",
    FORBIDDEN = "Access forbidden",
    NOT_FOUND = "Resource not found",
    CONFLICT = "Conflict detected",
    INTERNAL_SERVER_ERROR = "Internal server error",
    BAD_GATEWAY = "Bad gateway",
    SERVICE_UNAVAILABLE = "Service unavailable",
    USER_NOT_FOUND = "User not found",
    INCORRECT_PASSWORD = "Incorrect password",
    ALREADY_EXISTS = "User already exists",
    LOGIN_SUCCESS = "Login successfully",
    TOKEN_EXPIRED = "Token expired",
    URL_NOT_FOUND = "Short URL not found",
    GOOGLE_SIGNIN_REQUIRED = "Account linked to Google, Sign in with Google."
}
