export interface User {

    id: string;

    firstName: string;

    lastName: string;

    email: string;

    role: "CUSTOMER" | "SELLER" | "ADMIN";

    avatar?: string;

}

export interface AuthState {

    isAuthenticated: boolean;

    user: User | null;

}

export interface LoginCredentials {

    email: string;

    password: string;

}

export interface RegisterCredentials {

    firstName: string;

    lastName: string;

    email: string;

    password: string;

    confirmPassword: string;

}