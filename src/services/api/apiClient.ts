import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import tokenService from "../auth/tokenService";
import type { ApiErrorResponse, ValidationErrorMap } from "../../types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenService.getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export class ApiError extends Error {
    public status: number;
    public error: string;
    public path?: string;
    public validationErrors?: ValidationErrorMap;

    constructor(
        message: string,
        status: number,
        error: string = "API Error",
        path?: string,
        validationErrors?: ValidationErrorMap
    ) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.error = error;
        this.path = path;
        this.validationErrors = validationErrors;
    }
}

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data as ApiErrorResponse | ValidationErrorMap | Record<string, string>;

            if (status === 401) {
                tokenService.removeToken();
            }

            if (status === 400 && data && typeof data === "object" && !("status" in data)) {
                return Promise.reject(
                    new ApiError(
                        "Validation failed",
                        status,
                        "Bad Request",
                        undefined,
                        data as ValidationErrorMap
                    )
                );
            }

            if (data && typeof data === "object" && "message" in data) {
                const apiErr = data as ApiErrorResponse;
                return Promise.reject(
                    new ApiError(
                        apiErr.message || "An error occurred",
                        apiErr.status || status,
                        apiErr.error || "Error",
                        apiErr.path
                    )
                );
            }

            return Promise.reject(
                new ApiError(
                    error.message || `HTTP ${status} Error`,
                    status,
                    "Http Error"
                )
            );
        } else if (error.request) {
            return Promise.reject(
                new ApiError(
                    "Network error. Please check backend connection.",
                    0,
                    "Network Error"
                )
            );
        }

        return Promise.reject(
            new ApiError(error.message || "Unknown error occurred", 500, "Unknown Error")
        );
    }
);

export default apiClient;
