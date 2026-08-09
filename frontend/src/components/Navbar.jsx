  import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    // Load logged-in user
    useEffect(() => {
        const loadUser = () => {
            try {
                const savedUser = localStorage.getItem("user");

                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Invalid user data:", error);
                setUser(null);
            }
        };

        loadUser();

        // Update navbar when localStorage changes
        window.addEventListener("storage", loadUser);

        return () => {
            window.removeEventListener("storage", loadUser);
        };
    }, []);

    // ===============================
    // LOGOUT
    // ===============================
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex items-center justify-between">

                    {/* ===============================
                        LOGO
                    =============================== */}

                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        EventBook
                    </Link>


                    {/* ===============================
                        NAVIGATION
                    =============================== */}

                    <div className="flex items-center gap-6">

                        {/* Home */}
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Home
                        </Link>


                        {/* Events */}
                        <Link
                            to="/events"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Events
                        </Link>


                        {/* ===============================
                            LOGGED-IN USER LINKS
                        =============================== */}

                        {user ? (
                            <>

                                {/* Create Event */}
                                <Link
                                    to="/create-event"
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Create Event
                                </Link>


                                {/* My Events */}
                                <Link
                                    to="/my-events"
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    My Events
                                </Link>


                                {/* My Bookings */}
                                <Link
                                    to="/my-bookings"
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    My Bookings
                                </Link>


                                {/* ===============================
                                    DASHBOARD
                                =============================== */}

                                {user.role === "admin" ? (
                                    <Link
                                        to="/admin/dashboard"
                                        className="text-gray-700 hover:text-blue-600 font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        to="/dashboard"
                                        className="text-gray-700 hover:text-blue-600 font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                )}


                                {/* Profile */}
                                <Link
                                    to="/profile"
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Profile
                                </Link>


                                {/* ===============================
                                    ADMIN
                                =============================== */}

                                {user.role === "admin" && (
                                    <Link
                                        to="/admin/users"
                                        className="text-purple-600 hover:text-purple-800 font-semibold"
                                    >
                                        Admin
                                    </Link>
                                )}


                                {/* ===============================
                                    USER NAME
                                =============================== */}

                                <span className="text-gray-600 font-medium">
                                    Hi, {user.name}
                                </span>


                                {/* ===============================
                                    LOGOUT
                                =============================== */}

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>

                            </>
                        ) : (

                            /* ===============================
                                LOGGED-OUT LINKS
                            =============================== */

                            <>

                                {/* Login */}
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Login
                                </Link>


                                {/* Register */}
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>

                            </>
                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;