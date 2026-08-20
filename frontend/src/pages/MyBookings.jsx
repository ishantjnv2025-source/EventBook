 import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancelLoading, setCancelLoading] = useState("");

    const fetchBookings = useCallback(async () => {
        try {
            setError("");

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

    // ===============================
    // CANCEL BOOKING
    // ===============================
    async function handleCancelBooking(bookingId) {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) {
            return;
        }

        try {
            setError("");
            setCancelLoading(bookingId);

            const res = await api.put(
                `/bookings/cancel/${bookingId}`
            );

            console.log(
                "Cancel Booking Response:",
                res.data
            );

            // Refresh bookings after cancellation
            await fetchBookings();

        } catch (error) {
            console.error(
                "Cancel Booking Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to cancel booking"
            );
        } finally {
            setCancelLoading("");
        }
    }

    if (loading) {
        return (
            <div className="text-center mt-10 text-xl">
                Loading Bookings...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                My Bookings
            </h1>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6 text-center">
                    {error}
                </div>
            )}

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

                            {/* Event Title */}
                            <h2 className="text-2xl font-bold text-blue-600 mb-4">
                                {booking.event?.title || "Event"}
                            </h2>

                            {/* Date */}
                            <p>
                                <strong>Date:</strong>{" "}
                                {booking.event?.date
                                    ? new Date(
                                          booking.event.date
                                      ).toLocaleDateString()
                                    : "N/A"}
                            </p>

                            {/* Time */}
                            <p>
                                <strong>Time:</strong>{" "}
                                {booking.event?.time || "N/A"}
                            </p>

                            {/* Location */}
                            <p>
                                <strong>Location:</strong>{" "}
                                {booking.event?.location || "N/A"}
                            </p>

                            {/* Price */}
                            <p>
                                <strong>Price:</strong> ₹
                                {booking.event?.price || 0}
                            </p>

                            {/* Status */}
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

                            {/* Cancel Button */}
                            {booking.status === "Booked" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleCancelBooking(
                                            booking._id
                                        )
                                    }
                                    disabled={
                                        cancelLoading ===
                                        booking._id
                                    }
                                    className="w-full mt-5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 rounded-lg transition"
                                >
                                    {cancelLoading ===
                                    booking._id
                                        ? "Cancelling..."
                                        : "Cancel Booking"}
                                </button>
                            )}

                            {/* Cancelled Message */}
                            {booking.status === "Cancelled" && (
                                <div className="mt-5 bg-gray-100 text-gray-600 text-center py-3 rounded-lg font-semibold">
                                    Booking Cancelled
                                </div>
                            )}

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default MyBookings;