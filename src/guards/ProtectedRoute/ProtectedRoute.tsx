import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function ProtectedRoute() {

    const { auth } = useAuth();

    const location = useLocation();

    if (!auth.isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />
        );

    }

    return <Outlet />;

}

export default ProtectedRoute;