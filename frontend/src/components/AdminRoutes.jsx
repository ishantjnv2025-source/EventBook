  import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    let user = null;

    try {
        user = JSON.parse(
            localStorage.getItem("user")
        );
    } catch {
        user = null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;