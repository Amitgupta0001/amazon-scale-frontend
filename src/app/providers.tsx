import { BrowserRouter } from "react-router-dom";
import type { ReactNode } from "react";

import AuthProvider from "../context/AuthContext";

type AppProviderProps = {
    children: ReactNode;
};

function AppProviders({ children }: AppProviderProps) {
    return (
        <BrowserRouter>
            <AuthProvider>
                {children}
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppProviders;