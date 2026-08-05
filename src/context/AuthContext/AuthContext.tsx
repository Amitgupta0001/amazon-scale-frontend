import {
    useCallback,
    useMemo,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import authService from "../../services/auth/authService";
import tokenService from "../../services/auth/tokenService";
import profileService from "../../services/profile/profileService";

import type {
    AuthState,
    LoginCredentials,
    RegisterCredentials,
    User,
} from "../../types/auth";
import type { UserResponse } from "../../types/api";

import {
    AuthContext,
    type AuthContextType,
} from "./context";

type AuthProviderProps = {
    children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
    const [auth, setAuth] = useState<AuthState>(() => {
        const token = tokenService.getToken();
        const storedUser = profileService.getStoredProfile();

        if (token && storedUser) {
            return {
                isAuthenticated: true,
                user: storedUser,
            };
        } else if (token) {
            const parsed = tokenService.parseJwt(token);
            const userEmail = typeof parsed?.sub === "string" ? parsed.sub : "user@amazonscale.com";
            const restoredUser: User = {
                id: "1",
                firstName: userEmail.split("@")[0] || "User",
                lastName: "Account",
                email: userEmail,
                role: "CUSTOMER",
            };
            return {
                isAuthenticated: true,
                user: restoredUser,
            };
        }

        return {
            isAuthenticated: false,
            user: null,
        };
    });

    useEffect(() => {
        if (auth.user) {
            profileService.setStoredProfile(auth.user);
        } else {
            profileService.clearStoredProfile();
        }
    }, [auth.user]);

    const login = useCallback(
        async (credentials: LoginCredentials): Promise<void> => {
            const response = await authService.login({
                email: credentials.email,
                password: credentials.password,
            });

            const parsedJwt = response.accessToken ? tokenService.parseJwt(response.accessToken) : null;
            const email = credentials.email;
            const namePart = email.split("@")[0] || "User";

            const user: User = {
                id: parsedJwt?.userId ? String(parsedJwt.userId) : "1",
                firstName: namePart,
                lastName: "Account",
                email: email,
                role: "CUSTOMER",
            };

            setAuth({
                isAuthenticated: true,
                user: user,
            });
        },
        []
    );

    const register = useCallback(
        async (credentials: RegisterCredentials): Promise<UserResponse> => {
            const userResponse = await authService.register({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                email: credentials.email,
                password: credentials.password,
                role: "CUSTOMER",
            });

            return userResponse;
        },
        []
    );

    const logout = useCallback(() => {
        authService.logout();
        profileService.clearStoredProfile();
        setAuth({
            isAuthenticated: false,
            user: null,
        });
    }, []);

    const value = useMemo<AuthContextType>(
        () => ({
            auth,
            login,
            register,
            logout,
        }),
        [auth, login, register, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;