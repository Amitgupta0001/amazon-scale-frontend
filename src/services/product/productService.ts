import apiClient from "../api/apiClient";
import type { ProductRequest, ProductResponse } from "../../types/api";

export const productService = {
    async getAllProducts(): Promise<ProductResponse[]> {
        const response = await apiClient.get<ProductResponse[]>("/products");
        return response.data;
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
