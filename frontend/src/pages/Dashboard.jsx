 import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get("/dashboard");

            console.log("Dashboard response:", res.data);

            setDashboard(res.data);

        } catch (error) {
            console.error("Dashboard Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-3xl font-bold">
                    Loading Dashboard...
                </h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto mt-10 p-6 text-center">
                <h1 className="text-2xl font-bold text-red-600">
                    {error}
                </h1>

                <button
                    onClick={fetchDashboard}
                    className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl">
                    No dashboard data available.
                </h1>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8">

            {/* Heading */}
            <h1 className="text-4xl font-bold text-center mb-10">
                Organizer Dashboard
            </h1>


            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Events */}
                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center">

                    <h2 className="text-2xl font-bold">
                        Total Events
                    </h2>

                    <p className="text-4xl mt-4 font-bold">
                        {dashboard.totalEvents ?? 0}
                    </p>

                </div>


                {/* Total Bookings */}
                <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg text-center">

                    <h2 className="text-2xl font-bold">
                        Total Bookings
                    </h2>

                    <p className="text-4xl mt-4 font-bold">
                        {dashboard.totalBookings ?? 0}
                    </p>

                </div>


                {/* Revenue */}
                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg text-center">

                    <h2 className="text-2xl font-bold">
                        Revenue
                    </h2>

                    <p className="text-4xl mt-4 font-bold">
                        ₹{dashboard.totalRevenue ?? 0}
                    </p>

                </div>

            </div>


            {/* Recent Bookings */}
            <div className="mt-10">

                <h2 className="text-3xl font-bold mb-6">
                    Recent Bookings
                </h2>


                {!dashboard.recentBookings ||
                dashboard.recentBookings.length === 0 ? (

                    <div className="bg-gray-100 p-6 rounded-lg text-center">
                        <h3 className="text-xl text-gray-500">
                            No Bookings Yet
                        </h3>
                    </div>

                ) : (

                    <div className="space-y-4">

                        {dashboard.recentBookings.map((booking) => (

                            <div
                                key={booking._id}
                                className="border rounded-lg p-5 shadow bg-white"
                            >

                                <p className="mb-2">
                                    <strong>User:</strong>{" "}
                                    {booking.user?.name || "Unknown"}
                                </p>

                                <p className="mb-2">
                                    <strong>Email:</strong>{" "}
                                    {booking.user?.email || "N/A"}
                                </p>

                                <p className="mb-2">
                                    <strong>Event:</strong>{" "}
                                    {booking.event?.title || "Unknown Event"}
                                </p>

                                <p>
                                    <strong>Price:</strong>{" "}
                                    ₹{booking.event?.price ?? 0}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Dashboard;
