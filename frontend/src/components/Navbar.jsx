 import { NavLink, useNavigate } from "react-router-dom";

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

    // Normal navigation button style
    const navLinkClass = ({ isActive }) =>
        `font-medium px-3 py-2 rounded-lg transition ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`;

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-2xl font-bold ${
                            isActive
                                ? "text-blue-700"
                                : "text-blue-600"
                        }`
                    }
                >
                    EventBook
                </NavLink>

                {/* Navigation Links */}
                <div className="flex items-center gap-4">

                    {/* Home */}
                    <NavLink
                        to="/"
                        end
                        className={navLinkClass}
                    >
                        Home
                    </NavLink>

                    {/* Events */}
                    <NavLink
                        to="/events"
                        className={navLinkClass}
                    >
                        Events
                    </NavLink>

                    {/* Logged-in user links */}
                    {isLoggedIn && (
                        <>
                            {/* Create Event */}
                            <NavLink
                                to="/create-event"
                                className={navLinkClass}
                            >
                                Create Event
                            </NavLink>

                            {/* My Events */}
                            <NavLink
                                to="/my-events"
                                className={navLinkClass}
                            >
                                My Events
                            </NavLink>

                            {/* My Bookings */}
                            <NavLink
                                to="/my-bookings"
                                className={navLinkClass}
                            >
                                My Bookings
                            </NavLink>

                            {/* Dashboard */}
                            <NavLink
                                to="/dashboard"
                                className={navLinkClass}
                            >
                                Dashboard
                            </NavLink>

                            {/* Profile */}
                            <NavLink
                                to="/profile"
                                className={navLinkClass}
                            >
                                Profile
                            </NavLink>

                            {/* Admin Dashboard */}
                            {isAdmin && (
                                <NavLink
                                    to="/admin/dashboard"
                                    className={({ isActive }) =>
                                        `font-semibold px-4 py-2 rounded-lg transition ${
                                            isActive
                                                ? "bg-indigo-800 text-white ring-2 ring-indigo-300"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`
                                    }
                                >
                                    Admin Dashboard
                                </NavLink>
                            )}

                            {/* User Name */}
                            <span className="text-gray-700 font-medium whitespace-nowrap">
                                Hi, {user?.name || "User"}
                            </span>

                            {/* Logout */}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-5 py-2 rounded-lg transition"
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {/* Logged-out links */}
                    {!isLoggedIn && (
                        <>
                            {/* Login */}
                            <NavLink
                                to="/login"
                                className={navLinkClass}
                            >
                                Login
                            </NavLink>

                            {/* Register */}
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `font-semibold px-5 py-2 rounded-lg transition ${
                                        isActive
                                            ? "bg-blue-800 text-white ring-2 ring-blue-300"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;