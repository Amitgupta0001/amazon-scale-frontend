import { createContext } from "react";

import type {
    AuthState,
    LoginCredentials,
    RegisterCredentials,
} from "../../types/auth";
import type { UserResponse } from "../../types/api";

export interface AuthContextType {
    auth: AuthState;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<UserResponse>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);