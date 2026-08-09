 import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalEvents: 0,
        totalBookings: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    async function fetchDashboard() {
        try {
            const res = await api.get("/admin/dashboard");

            console.log("Admin Dashboard:", res.data);

            setStats(res.data.stats);
        } catch (error) {
            console.error("Admin Dashboard Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load admin dashboard"
            );
        } finally {
            setLoading(false);
        }
    }

    // Loading
    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-5xl mb-4">⏳</div>

                    <h1 className="text-2xl font-semibold text-gray-700">
                        Loading Admin Dashboard...
                    </h1>
                </div>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
                    <div className="text-5xl mb-4">⚠️</div>

                    <h1 className="text-2xl font-bold text-red-600 mb-3">
                        Dashboard Error
                    </h1>

                    <p className="text-gray-700">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* =========================
                PAGE HEADER
            ========================== */}
            <div className="mb-10">

                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Admin Dashboard
                </h1>

                <p className="text-gray-500 mt-2 text-lg">
                    Manage and monitor your EventBook platform
                </p>

            </div>


            {/* =========================
                STATISTICS
            ========================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Users */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-7
                                hover:shadow-xl transition-all duration-300">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 font-medium">
                                Total Users
                            </p>

                            <p className="text-4xl font-bold text-gray-800 mt-3">
                                {stats.totalUsers}
                            </p>
                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-blue-100
                                        flex items-center justify-center text-4xl">
                            👥
                        </div>

                    </div>

                    <div className="mt-5 text-sm text-blue-600 font-medium">
                        Registered users
                    </div>

                </div>


                {/* Total Events */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-7
                                hover:shadow-xl transition-all duration-300">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 font-medium">
                                Total Events
                            </p>

                            <p className="text-4xl font-bold text-gray-800 mt-3">
                                {stats.totalEvents}
                            </p>
                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-green-100
                                        flex items-center justify-center text-4xl">
                            🎫
                        </div>

                    </div>

                    <div className="mt-5 text-sm text-green-600 font-medium">
                        Events on EventBook
                    </div>

                </div>


                {/* Total Bookings */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-7
                                hover:shadow-xl transition-all duration-300">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 font-medium">
                                Total Bookings
                            </p>

                            <p className="text-4xl font-bold text-gray-800 mt-3">
                                {stats.totalBookings}
                            </p>
                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-purple-100
                                        flex items-center justify-center text-4xl">
                            📋
                        </div>

                    </div>

                    <div className="mt-5 text-sm text-purple-600 font-medium">
                        Event bookings
                    </div>

                </div>

            </div>


            {/* =========================
                ADMIN MANAGEMENT
            ========================== */}
            <div className="mt-14">

                <div className="mb-6">

                    <h2 className="text-3xl font-bold text-gray-800">
                        Admin Management
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Manage users, events and bookings
                    </p>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


                    {/* =========================
                        MANAGE USERS
                    ========================== */}
                    <Link
                        to="/admin/users"
                        className="group bg-blue-600 text-white rounded-2xl
                                   shadow-lg p-8 min-h-[230px]
                                   flex flex-col justify-between
                                   hover:bg-blue-700
                                   hover:-translate-y-1
                                   hover:shadow-2xl
                                   transition-all duration-300"
                    >

                        <div>

                            <div className="text-5xl mb-6">
                                👥
                            </div>

                            <h3 className="text-2xl font-bold mb-3">
                                Manage Users
                            </h3>

                            <p className="text-blue-100 leading-relaxed">
                                View and manage all registered users
                                on the EventBook platform.
                            </p>

                        </div>

                        <div className="mt-6 font-semibold group-hover:translate-x-1 transition-transform">
                            View Users →
                        </div>

                    </Link>


                    {/* =========================
                        MANAGE EVENTS
                    ========================== */}
                    <Link
                        to="/admin/events"
                        className="group bg-green-600 text-white rounded-2xl
                                   shadow-lg p-8 min-h-[230px]
                                   flex flex-col justify-between
                                   hover:bg-green-700
                                   hover:-translate-y-1
                                   hover:shadow-2xl
                                   transition-all duration-300"
                    >

                        <div>

                            <div className="text-5xl mb-6">
                                🎫
                            </div>

                            <h3 className="text-2xl font-bold mb-3">
                                Manage Events
                            </h3>

                            <p className="text-green-100 leading-relaxed">
                                View and manage all events created
                                on the EventBook platform.
                            </p>

                        </div>

                        <div className="mt-6 font-semibold group-hover:translate-x-1 transition-transform">
                            View Events →
                        </div>

                    </Link>


                    {/* =========================
                        MANAGE BOOKINGS
                    ========================== */}
                    <Link
                        to="/admin/bookings"
                        className="group bg-purple-600 text-white rounded-2xl
                                   shadow-lg p-8 min-h-[230px]
                                   flex flex-col justify-between
                                   hover:bg-purple-700
                                   hover:-translate-y-1
                                   hover:shadow-2xl
                                   transition-all duration-300"
                    >

                        <div>

                            <div className="text-5xl mb-6">
                                📋
                            </div>

                            <h3 className="text-2xl font-bold mb-3">
                                Manage Bookings
                            </h3>

                            <p className="text-purple-100 leading-relaxed">
                                View all event bookings and monitor
                                booking activity.
                            </p>

                        </div>

                        <div className="mt-6 font-semibold group-hover:translate-x-1 transition-transform">
                            View Bookings →
                        </div>

                    </Link>

                </div>

            </div>


            {/* =========================
                QUICK SUMMARY
            ========================== */}
            <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6">

                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Platform Summary
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="bg-white rounded-xl p-4 border">
                        <p className="text-gray-500 text-sm">
                            Users
                        </p>

                        <p className="text-2xl font-bold text-blue-600">
                            {stats.totalUsers}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border">
                        <p className="text-gray-500 text-sm">
                            Events
                        </p>

                        <p className="text-2xl font-bold text-green-600">
                            {stats.totalEvents}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border">
                        <p className="text-gray-500 text-sm">
                            Bookings
                        </p>

                        <p className="text-2xl font-bold text-purple-600">
                            {stats.totalBookings}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;