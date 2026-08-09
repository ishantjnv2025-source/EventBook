 import { Routes, Route } from "react-router-dom";

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
    let isLoggedIn = false;
    let isAdmin = false;

    try {
        const user = JSON.parse(localStorage.getItem("user"));

        isLoggedIn = Boolean(user);
        isAdmin = user?.role === "admin";

    } catch {
        // Invalid localStorage data
        isLoggedIn = false;
        isAdmin = false;
    }

    if (!isLoggedIn) {
        return null;
    }

    return isAdmin ? (
        <AdminDashboard />
    ) : (
        <Dashboard />
    );
}


function App() {

    return (
        <>
            {/* =========================
                NAVBAR
            ========================== */}

            <Navbar />


            {/* =========================
                ROUTES
            ========================== */}

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================== */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/events"
                    element={<Events />}
                />

                <Route
                    path="/events/:id"
                    element={<EventDetails />}
                />


                {/* =========================
                    USER ROUTES
                ========================== */}

                <Route
                    path="/create-event"
                    element={<CreateEvent />}
                />

                <Route
                    path="/edit-event/:id"
                    element={<EditEvent />}
                />

                <Route
                    path="/my-events"
                    element={<MyEvents />}
                />

                <Route
                    path="/my-bookings"
                    element={<MyBookings />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/dashboard"
                    element={<DashboardRoute />}
                />


                {/* =========================
                    ADMIN ROUTES
                ========================== */}

                <Route element={<AdminRoute />}>

                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/admin/users"
                        element={<AdminUsers />}
                    />

                    <Route
                        path="/admin/events"
                        element={<AdminEvents />}
                    />

                    <Route
                        path="/admin/bookings"
                        element={<AdminBookings />}
                    />

                </Route>


                {/* =========================
                    404
                ========================== */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>


            {/* =========================
                FOOTER
            ========================== */}

            <Footer />

        </>
    );
}

export default App;
