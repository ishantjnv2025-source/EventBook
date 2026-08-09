 import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {

    const token = localStorage.getItem("token");

    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        user = null;
    }

    // Not logged in
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but not admin
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // Admin
    return <Outlet />;
}

export default AdminRoute;