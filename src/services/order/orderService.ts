import apiClient from "../api/apiClient";
import type { CreateOrderRequest, OrderResponse } from "../../types/api";

export const orderService = {
    async placeOrder(userId: number | string, request: CreateOrderRequest): Promise<OrderResponse> {
        const response = await apiClient.post<OrderResponse>("/orders", request, {
            params: { userId },
        });
        return response.data;
    },

    async getOrder(userId: number | string, orderId: number | string): Promise<OrderResponse> {
        const response = await apiClient.get<OrderResponse>(`/orders/${orderId}`, {
            params: { userId },
        });
        return response.data;
    },

    async getOrders(userId: number | string): Promise<OrderResponse[]> {
        const response = await apiClient.get<OrderResponse[]>("/orders", {
            params: { userId },
        });
        return response.data;
    },

    async cancelOrder(userId: number | string, orderId: number | string): Promise<OrderResponse> {
        const response = await apiClient.put<OrderResponse>(`/orders/${orderId}/cancel`, null, {
            params: { userId },
        });
        return response.data;
    },
};

export default orderService;
