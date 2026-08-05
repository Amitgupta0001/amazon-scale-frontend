import apiClient from "../api/apiClient";
import type {
    AddToWishlistRequest,
    CreateWishlistRequest,
    MoveWishlistItemRequest,
    UpdateWishlistRequest,
    WishlistItemResponse,
    WishlistResponse,
    WishlistSummaryResponse,
} from "../../types/api";

export const wishlistService = {
    async getUserWishlists(): Promise<WishlistSummaryResponse[]> {
        const response = await apiClient.get<WishlistSummaryResponse[]>("/wishlists");
        return response.data;
    },

    async getWishlist(wishlistId: number | string, page = 0, size = 10): Promise<WishlistResponse> {
        const response = await apiClient.get<WishlistResponse>(`/wishlists/${wishlistId}`, {
            params: { page, size },
        });
        return response.data;
    },

    async createWishlist(request: CreateWishlistRequest): Promise<WishlistResponse> {
        const response = await apiClient.post<WishlistResponse>("/wishlists", request);
        return response.data;
    },

    async updateWishlist(wishlistId: number | string, request: UpdateWishlistRequest): Promise<WishlistResponse> {
        const response = await apiClient.put<WishlistResponse>(`/wishlists/${wishlistId}`, request);
        return response.data;
    },

    async deleteWishlist(wishlistId: number | string): Promise<void> {
        await apiClient.delete(`/wishlists/${wishlistId}`);
    },

    async addItem(request: AddToWishlistRequest): Promise<WishlistItemResponse> {
        const response = await apiClient.post<WishlistItemResponse>("/wishlists/items", request);
        return response.data;
    },

    async moveItem(request: MoveWishlistItemRequest): Promise<WishlistItemResponse> {
        const response = await apiClient.put<WishlistItemResponse>("/wishlists/items/move", request);
        return response.data;
    },

    async removeItem(wishlistId: number | string, productId: number | string): Promise<void> {
        await apiClient.delete(`/wishlists/${wishlistId}/items/${productId}`);
    },

    async clearWishlist(wishlistId: number | string): Promise<void> {
        await apiClient.delete(`/wishlists/${wishlistId}/items`);
    },
};

export default wishlistService;
