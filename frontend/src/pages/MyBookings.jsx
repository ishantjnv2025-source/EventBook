import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBookings = useCallback(async () => {
        try {
            const res = await api.get("/bookings/my-bookings");

            setBookings(res.data.bookings || []);
        } catch (error) {
            console.error("My Bookings Error:", error);

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

    if (loading) {
        return (
            <div className="text-center mt-10 text-xl">
                Loading Bookings...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-600 text-xl">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                My Bookings
            </h1>

            {bookings.length === 0 ? (
                <div className="text-center text-gray-500 text-xl mt-10">
                    You have no bookings yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white rounded-xl shadow-lg p-6"
                        >

                            <h2 className="text-2xl font-bold text-blue-600 mb-4">
                                {booking.event?.title}
                            </h2>

                            <p>
                                <strong>Date:</strong>{" "}
                                {booking.event?.date
                                    ? new Date(
                                          booking.event.date
                                      ).toLocaleDateString()
                                    : "N/A"}
                            </p>

                            <p>
                                <strong>Time:</strong>{" "}
                                {booking.event?.time || "N/A"}
                            </p>

                            <p>
                                <strong>Location:</strong>{" "}
                                {booking.event?.location || "N/A"}
                            </p>

                            <p>
                                <strong>Price:</strong> ₹
                                {booking.event?.price || 0}
                            </p>

                            <p className="mt-3">
                                <strong>Status:</strong>{" "}
                                <span
                                    className={
                                        booking.status === "Booked"
                                            ? "text-green-600 font-bold"
                                            : "text-red-600 font-bold"
                                    }
                                >
                                    {booking.status}
                                </span>
                            </p>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default MyBookings;
