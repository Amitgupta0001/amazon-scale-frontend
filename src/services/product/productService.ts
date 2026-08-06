import apiClient from "../api/apiClient";
import type { ProductRequest, ProductResponse, SearchSuggestionResponse, PageResponse } from "../../types/api";

export const productService = {
    async getAllProducts(): Promise<ProductResponse[]> {
        try {
            const response = await apiClient.get<any>("/products/all");
            const data = response.data;
            if (Array.isArray(data)) return data;
            if (data && Array.isArray(data.content)) return data.content;
            return [];
        } catch {
            return [];
        }
    },

    async searchProducts(params?: Record<string, any>): Promise<PageResponse<ProductResponse>> {
        const response = await apiClient.get<any>("/products", { params });
        const data = response.data;
        if (data && Array.isArray(data.content)) {
            return data;
        }
        if (Array.isArray(data)) {
            return {
                content: data,
                page: 0,
                size: data.length,
                totalElements: data.length,
                totalPages: 1,
                first: true,
                last: true,
                numberOfElements: data.length,
            };
        }
        return {
            content: [],
            page: 0,
            size: 12,
            totalElements: 0,
            totalPages: 0,
            first: true,
            last: true,
            numberOfElements: 0,
        };
    },

    async getSearchSuggestions(query: string): Promise<SearchSuggestionResponse> {
        try {
            const response = await apiClient.get<SearchSuggestionResponse>("/products/search/suggestions", {
                params: { q: query },
            });
            return response.data || { productNames: [], brands: [], categories: [] };
        } catch {
            return { productNames: [], brands: [], categories: [] };
        }
    },

    async getProductById(id: number | string): Promise<ProductResponse> {
        const response = await apiClient.get<ProductResponse>(`/products/${id}`);
        return response.data;
    },

    async createProduct(request: ProductRequest): Promise<ProductResponse> {
        const response = await apiClient.post<ProductResponse>("/products", request);
        return response.data;
    },

    async updateProduct(id: number | string, request: ProductRequest): Promise<ProductResponse> {
        const response = await apiClient.put<ProductResponse>(`/products/${id}`, request);
        return response.data;
    },

    async deleteProduct(id: number | string): Promise<void> {
        await apiClient.delete(`/products/${id}`);
    },
};

export default productService;
