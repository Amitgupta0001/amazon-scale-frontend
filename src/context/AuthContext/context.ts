import { createContext } from "react";

import type {
    AuthState,
    LoginCredentials,
} from "../../types/auth";

export interface AuthContextType {
    auth: AuthState;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);