import { BrowserRouter } from "react-router-dom";
import type { ReactNode } from "react";


type AppProviderProps = {
    children:ReactNode;
};

function AppProviders({children}:AppProviderProps){
    return (
        <BrowserRouter>
        {children}
        </BrowserRouter>
    );
}

export default AppProviders;