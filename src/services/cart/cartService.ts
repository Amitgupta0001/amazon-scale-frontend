import apiClient from "../api/apiClient";
import type { AddToCartRequest, CartResponse, UpdateCartItemRequest } from "../../types/api";

export const cartService = {
    async getCart(): Promise<CartResponse> {
        const response = await apiClient.get<CartResponse>("/cart");
        return response.data;
    },

    async addItemToCart(request: AddToCartRequest): Promise<CartResponse> {
        const response = await apiClient.post<CartResponse>("/cart/items", request);
        return response.data;
    },

    async updateCartItem(productId: number | string, request: UpdateCartItemRequest): Promise<CartResponse> {
        const response = await apiClient.put<CartResponse>(`/cart/items/${productId}`, request);
        return response.data;
    },

    async removeCartItem(productId: number | string): Promise<void> {
        await apiClient.delete(`/cart/items/${productId}`);
    },

    async clearCart(): Promise<void> {
        await apiClient.delete("/cart");
    },
};

export default cartService;
