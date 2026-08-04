import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function GuestRoute() {

    const { auth } = useAuth();

    if (auth.isAuthenticated) {

        return (
            <Navigate
                to="/"
                replace
            />
        );

    }

    return <Outlet />;

}

export default GuestRoute;