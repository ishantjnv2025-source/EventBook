  import { Navigate, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoutes";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import MyEvents from "./pages/MyEvents";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminEvents from "./pages/AdminEvents";
import AdminBookings from "./pages/AdminBookings";

function DashboardRoute() {
    let user = null;

    try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            user = JSON.parse(storedUser);
        }
    } catch (error) {
        console.error("Invalid user data:", error);
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Dashboard />;
}

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Events */}
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />

                {/* Organizer */}
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/edit-event/:id" element={<EditEvent />} />
                <Route path="/my-events" element={<MyEvents />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/profile" element={<Profile />} />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={<DashboardRoute />}
                />

                {/* Admin */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <AdminUsers />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/events"
                    element={
                        <AdminRoute>
                            <AdminEvents />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/bookings"
                    element={
                        <AdminRoute>
                            <AdminBookings />
                        </AdminRoute>
                    }
                />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;