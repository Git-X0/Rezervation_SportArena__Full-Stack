export const API_PREFIX = "/api/v1";

export const API_ROUTES = {
    RESERVATIONS: `${API_PREFIX}/reservations`,
    SPORTS: `${API_PREFIX}/sports`,
    LOCATIONS: `${API_PREFIX}/locations`,
    CLIENTS: `${API_PREFIX}/clients`,
} as const;

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// API Error types
export enum ApiErrorType {
    VALIDATION_ERROR = "VALIDATION_ERROR",
    NOT_FOUND = "NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    INTERNAL_ERROR = "INTERNAL_ERROR",
}

export interface ApiError {
    type: ApiErrorType;
    message: string;
    details?: any;
}
