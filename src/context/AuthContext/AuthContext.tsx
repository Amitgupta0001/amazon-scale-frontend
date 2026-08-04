import {
    useCallback,
    useMemo,
    type ReactNode,
} from "react";

import useLocalStorage from "../../hooks/useLocalStorage";

import {
    type AuthState,
    type LoginCredentials,
    type User,
} from "../../types/auth";

import {
    AuthContext,
    type AuthContextType,
} from "./context";

type AuthProviderProps = {
    children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
    const [auth, setAuth] = useLocalStorage<AuthState>("auth", {
        isAuthenticated: false,
        user: null,
    });

    const login = useCallback(
        async (credentials: LoginCredentials): Promise<void> => {
            // Mock login (will be replaced by Spring Boot API later)

            const mockUser: User = {
                id: typeof crypto.randomUUID === "function"
                    ? crypto.randomUUID()
                    : `${Date.now()}`,
                firstName: "John",
                lastName: "Doe",
                email: credentials.email,
                role: "CUSTOMER",
            };

            setAuth({
                isAuthenticated: true,
                user: mockUser,
            });
        },
        [setAuth]
    );

    const logout = useCallback(() => {
        setAuth({
            isAuthenticated: false,
            user: null,
        });
    }, [setAuth]);

    const value = useMemo<AuthContextType>(
        () => ({
            auth,
            login,
            logout,
        }),
        [auth, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;