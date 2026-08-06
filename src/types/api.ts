export interface ApiErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}

export type ValidationErrorMap = Record<string, string>;

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    tokenType: string;
}

export interface UserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: "CUSTOMER" | "SELLER" | "ADMIN";
}

export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "CUSTOMER" | "SELLER" | "ADMIN";
    enabled: boolean;
    createdAt: string;
}

export interface ProductRequest {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
    brand: string;
}

export interface ProductResponse {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    stock: number;
    brand: string;
    active: boolean;
    originalPrice?: number;
    discountPercentage?: number;
    categoryId?: number;
    categoryName?: string;
    rating?: number;
    reviewCount?: number;
    sku?: string;
    slug?: string;
    status?: string;
    featured?: boolean;
    thumbnail?: string;
    galleryImages?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface SearchSuggestionResponse {
    productNames: string[];
    brands: string[];
    categories: string[];
}

export interface PageResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
}

export interface CreateCategoryRequest {
    name: string;
    description: string;
    imageUrl: string;
    parentCategoryId?: number | null;
}

export interface UpdateCategoryRequest {
    name: string;
    description: string;
    imageUrl: string;
    parentCategoryId?: number | null;
}

export interface CategoryResponse {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    parentCategoryId?: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface AddToCartRequest {
    productId: number;
    quantity: number;
}

export interface UpdateCartItemRequest {
    quantity: number;
}

export interface CartItemResponse {
    id: number;
    productId: number;
    productName: string;
    productPrice: number;
    imageUrl: string;
    quantity: number;
    itemTotal: number;
}

export interface CartResponse {
    id: number;
    userId: number;
    items: CartItemResponse[];
    totalAmount: number;
    totalItems: number;
}

export interface CreateWishlistRequest {
    name: string;
    description?: string;
}

export interface UpdateWishlistRequest {
    name: string;
    description?: string;
}

export interface AddToWishlistRequest {
    wishlistId: number;
    productId: number;
    priority?: "LOW" | "MEDIUM" | "HIGH";
    note?: string;
}

export interface MoveWishlistItemRequest {
    sourceWishlistId: number;
    destinationWishlistId: number;
    productId: number;
}

export interface WishlistItemResponse {
    id: number;
    wishlistId: number;
    productId: number;
    productName: string;
    productPrice: number;
    productImageUrl: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    note?: string;
    createdAt: string;
}

export interface WishlistResponse {
    id: number;
    name: string;
    description?: string;
    type: "DEFAULT" | "CUSTOM";
    isDefault: boolean;
    items: WishlistItemResponse[];
    totalItems: number;
    pageNumber: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface WishlistSummaryResponse {
    id: number;
    name: string;
    description?: string;
    isDefault: boolean;
    totalItems: number;
}

export interface CreateOrderRequest {
    shippingAddress: string;
    paymentMethod: "CREDIT_CARD" | "DEBIT_CARD" | "UPI" | "NET_BANKING" | "CASH_ON_DELIVERY";
}

export interface OrderItemResponse {
    id: number;
    productId: number;
    productName: string;
    productPrice: number;
    quantity: number;
    subtotal: number;
}

export interface OrderResponse {
    id: number;
    userId: number;
    orderStatus: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
    createdAt: string;
    items: OrderItemResponse[];
}
