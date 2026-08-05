import apiClient from "../api/apiClient";
import tokenService from "./tokenService";
import type { LoginRequest, LoginResponse, UserRequest, UserResponse } from "../../types/api";

export const authService = {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
        if (response.data.accessToken) {
            tokenService.setToken(response.data.accessToken);
        }
        return response.data;
    },

    async register(userData: UserRequest): Promise<UserResponse> {
        const response = await apiClient.post<UserResponse>("/auth/register", userData);
        return response.data;
    },

    logout(): void {
        tokenService.removeToken();
    },
};

export default authService;
