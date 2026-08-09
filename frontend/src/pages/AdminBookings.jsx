import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBookings = useCallback(async () => {
        try {
            const res = await api.get("/admin/bookings");

            console.log("Admin Bookings:", res.data);

            setBookings(res.data.bookings || []);
        } catch (error) {
            console.error("Admin Bookings Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load bookings"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(fetchBookings, 0);
        return () => clearTimeout(timer);
    }, [fetchBookings]);

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-5xl mb-4">
                        ⏳
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-700">
                        Loading Bookings...
                    </h1>
                </div>
            </div>
        );
    }

    // =========================
    // ERROR
    // =========================
    if (error) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">

                    <div className="text-5xl mb-4">
                        ⚠️
                    </div>

                    <h1 className="text-2xl font-bold text-red-600 mb-3">
                        Unable to Load Bookings
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
                HEADER
            ========================== */}
            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-800">
                    Manage Bookings
                </h1>

                <p className="text-gray-500 mt-2">
                    View and monitor all EventBook bookings
                </p>

            </div>


            {/* =========================
                BOOKING COUNT
            ========================== */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-8">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-purple-600 font-medium">
                            Total Bookings
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-1">
                            {bookings.length}
                        </p>

                    </div>

                    <div className="text-5xl">
                        📋
                    </div>

                </div>

            </div>


            {/* =========================
                NO BOOKINGS
            ========================== */}
            {bookings.length === 0 ? (

                <div className="bg-white border rounded-xl p-10 text-center">

                    <div className="text-5xl mb-4">
                        📋
                    </div>

                    <h2 className="text-2xl font-bold text-gray-700">
                        No Bookings Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        There are currently no event bookings.
                    </p>

                </div>

            ) : (

                <>

                    {/* =========================
                        DESKTOP TABLE
                    ========================== */}
                    <div className="hidden md:block bg-white rounded-2xl shadow-lg border overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-100">

                                    <tr>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            #
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            User
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            Event
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            Date
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            Location
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            Price
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y">

                                    {bookings.map((booking, index) => (

                                        <tr
                                            key={booking._id}
                                            className="hover:bg-gray-50 transition"
                                        >

                                            {/* NUMBER */}
                                            <td className="px-6 py-5">
                                                {index + 1}
                                            </td>


                                            {/* USER */}
                                            <td className="px-6 py-5">

                                                {booking.user ? (

                                                    <div>

                                                        <p className="font-semibold text-gray-800">
                                                            {booking.user.name}
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            {booking.user.email}
                                                        </p>

                                                    </div>

                                                ) : (

                                                    <span className="text-gray-500">
                                                        Unknown User
                                                    </span>

                                                )}

                                            </td>


                                            {/* EVENT */}
                                            <td className="px-6 py-5">

                                                {booking.event ? (

                                                    <p className="font-semibold text-blue-600">
                                                        {booking.event.title}
                                                    </p>

                                                ) : (

                                                    <span className="text-gray-500">
                                                        Event unavailable
                                                    </span>

                                                )}

                                            </td>


                                            {/* DATE */}
                                            <td className="px-6 py-5 text-gray-600">

                                                {booking.event?.date
                                                    ? new Date(
                                                        booking.event.date
                                                    ).toLocaleDateString()
                                                    : "N/A"}

                                            </td>


                                            {/* LOCATION */}
                                            <td className="px-6 py-5 text-gray-600">

                                                {booking.event?.location || "N/A"}

                                            </td>


                                            {/* PRICE */}
                                            <td className="px-6 py-5 font-semibold">

                                                ₹{booking.event?.price ?? 0}

                                            </td>


                                            {/* STATUS */}
                                            <td className="px-6 py-5">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        booking.status === "Booked"
                                                            ? "bg-green-100 text-green-700"
                                                            : booking.status === "Cancelled"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                    {booking.status || "Unknown"}
                                                </span>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>


                    {/* =========================
                        MOBILE CARDS
                    ========================== */}
                    <div className="md:hidden space-y-4">

                        {bookings.map((booking, index) => (

                            <div
                                key={booking._id}
                                className="bg-white rounded-xl shadow-md border p-5"
                            >

                                <div className="flex items-center justify-between mb-4">

                                    <h2 className="font-bold text-lg text-gray-800">
                                        Booking #{index + 1}
                                    </h2>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            booking.status === "Booked"
                                                ? "bg-green-100 text-green-700"
                                                : booking.status === "Cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {booking.status || "Unknown"}
                                    </span>

                                </div>


                                <div className="space-y-3">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            User
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {booking.user?.name || "Unknown User"}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {booking.user?.email || ""}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Event
                                        </p>

                                        <p className="font-semibold text-blue-600">
                                            {booking.event?.title || "Event unavailable"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Date
                                        </p>

                                        <p className="text-gray-800">
                                            {booking.event?.date
                                                ? new Date(
                                                    booking.event.date
                                                ).toLocaleDateString()
                                                : "N/A"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Location
                                        </p>

                                        <p className="text-gray-800">
                                            {booking.event?.location || "N/A"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Price
                                        </p>

                                        <p className="font-bold text-gray-800">
                                            ₹{booking.event?.price ?? 0}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </>

            )}

        </div>
    );
}

export default AdminBookings;
