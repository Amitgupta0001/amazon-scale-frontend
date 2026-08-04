import { Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import ProtectedRoute from "../guards/ProtectedRoute";
import GuestRoute from "../guards/GuestRoute";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

function AppRoutes() {
    return (
        <Routes>

            {/* Public Application */}

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/products/:productId"
                    element={<ProductDetails />}
                />

            </Route>

            {/* Protected Routes */}

            <Route element={<ProtectedRoute />}>

                <Route element={<MainLayout />}>

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                    <Route
                        path="/wishlist"
                        element={<Wishlist />}
                    />

                    <Route
                        path="/orders"
                        element={<Orders />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                </Route>

            </Route>

            {/* Guest Routes */}

            <Route element={<GuestRoute />}>

                <Route element={<AuthLayout />}>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                </Route>

            </Route>

            {/* 404 */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default AppRoutes;