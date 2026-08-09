 import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {

    const token = localStorage.getItem("token");

    let user;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        return <Navigate to="/login" replace />;
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
