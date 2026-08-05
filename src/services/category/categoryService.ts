import apiClient from "../api/apiClient";
import type { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from "../../types/api";

export const categoryService = {
    async getAllCategories(): Promise<CategoryResponse[]> {
        const response = await apiClient.get<CategoryResponse[]>("/categories");
        return response.data;
    },

    async getCategoryById(id: number | string): Promise<CategoryResponse> {
        const response = await apiClient.get<CategoryResponse>(`/categories/${id}`);
        return response.data;
    },

    async createCategory(request: CreateCategoryRequest): Promise<CategoryResponse> {
        const response = await apiClient.post<CategoryResponse>("/categories", request);
        return response.data;
    },

    async updateCategory(id: number | string, request: UpdateCategoryRequest): Promise<CategoryResponse> {
        const response = await apiClient.put<CategoryResponse>(`/categories/${id}`, request);
        return response.data;
    },

    async deleteCategory(id: number | string): Promise<void> {
        await apiClient.delete(`/categories/${id}`);
    },
};

export default categoryService;
