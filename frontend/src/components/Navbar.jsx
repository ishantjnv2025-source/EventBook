import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        user = null;
    }

    const isLoggedIn = Boolean(user);
    const isAdmin = user?.role === "admin";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    EventBook
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">

                    {/* Always visible */}
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Home
                    </Link>

                    <Link
                        to="/events"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Events
                    </Link>

                    {/* Logged-in user links */}
                    {isLoggedIn && (
                        <>
                            <Link
                                to="/create-event"
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Create Event
                            </Link>

                            <Link
                                to="/my-events"
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                My Events
                            </Link>

                            <Link
                                to="/my-bookings"
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                My Bookings
                            </Link>

                            <Link
                                to="/dashboard"
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Profile
                            </Link>

                            {/* ONLY ONE ADMIN BUTTON */}
                            {isAdmin && (
                                <Link
                                    to="/admin/dashboard"
                                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                                >
                                    Admin Dashboard
                                </Link>
                            )}

                            {/* User name */}
                            <span className="text-gray-700 font-medium">
                                Hi, {user?.name || "User"}
                            </span>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg transition"
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {/* Logged-out links */}
                    {!isLoggedIn && (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;