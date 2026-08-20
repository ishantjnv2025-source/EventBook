 import { useCallback, useEffect, useState } from "react";
import api, { backendUrl } from "../services/api";

function AdminEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // FETCH ALL EVENTS
    // =========================
    const fetchEvents = useCallback(async () => {
        try {
            const res = await api.get("/admin/events");

            console.log("Admin Events:", res.data);

            setEvents(res.data.events || []);
        } catch (error) {
            console.error("Admin Events Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load events"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // =========================
    // DELETE EVENT
    // =========================
    const handleDeleteEvent = async (eventId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const res = await api.delete(
                `/admin/events/${eventId}`
            );

            console.log(
                "Delete Event Response:",
                res.data
            );

            // Remove deleted event from UI
            setEvents((prevEvents) =>
                prevEvents.filter(
                    (event) => event._id !== eventId
                )
            );

            alert(
                res.data.message ||
                "Event deleted successfully"
            );

        } catch (error) {
            console.error(
                "Delete Event Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to delete event"
            );
        }
    };

    // =========================
    // LOAD EVENTS
    // =========================
    useEffect(() => {
        const timer = setTimeout(fetchEvents, 0);

        return () => clearTimeout(timer);
    }, [fetchEvents]);

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
                        Loading Events...
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
                        Unable to Load Events
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
            ========================= */}
            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-800">
                    Manage Events
                </h1>

                <p className="text-gray-500 mt-2">
                    View all events created on EventBook
                </p>

            </div>


            {/* =========================
                EVENT COUNT
            ========================= */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-green-600 font-medium">
                            Total Events
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-1">
                            {events.length}
                        </p>

                    </div>

                    <div className="text-5xl">
                        🎫
                    </div>

                </div>

            </div>


            {/* =========================
                NO EVENTS
            ========================= */}
            {events.length === 0 ? (

                <div className="bg-white border rounded-xl p-10 text-center">

                    <div className="text-5xl mb-4">
                        🎫
                    </div>

                    <h2 className="text-2xl font-bold text-gray-700">
                        No Events Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        There are currently no events available.
                    </p>

                </div>

            ) : (

                /* =========================
                   EVENTS GRID
                ========================= */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {events.map((event) => (

                        <div
                            key={event._id}
                            className="bg-white rounded-2xl shadow-md border overflow-hidden
                                       hover:shadow-xl hover:-translate-y-1
                                       transition-all duration-300"
                        >

                            {/* =========================
                                IMAGE
                            ========================= */}
                            {event.image ? (

                                <img
                                    src={`${backendUrl}/uploads/${event.image}`}
                                    alt={event.title}
                                    className="w-full h-48 object-cover"
                                />

                            ) : (

                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">

                                    <span className="text-gray-500 text-lg">
                                        No Image
                                    </span>

                                </div>

                            )}


                            {/* =========================
                                CONTENT
                            ========================= */}
                            <div className="p-6">

                                {/* TITLE + CATEGORY */}
                                <div className="flex items-start justify-between gap-3 mb-3">

                                    <h2 className="text-2xl font-bold text-blue-600">
                                        {event.title}
                                    </h2>

                                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {event.category}
                                    </span>

                                </div>


                                {/* DESCRIPTION */}
                                <p className="text-gray-600 mb-5 line-clamp-2">
                                    {event.description}
                                </p>


                                {/* EVENT DETAILS */}
                                <div className="space-y-2 text-sm">

                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {event.date
                                            ? new Date(
                                                event.date
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </p>

                                    <p>
                                        <strong>Time:</strong>{" "}
                                        {event.time || "N/A"}
                                    </p>

                                    <p>
                                        <strong>Location:</strong>{" "}
                                        {event.location || "N/A"}
                                    </p>

                                    <p>
                                        <strong>Price:</strong>{" "}
                                        ₹{event.price ?? 0}
                                    </p>

                                    <p>
                                        <strong>Seats:</strong>{" "}
                                        {event.seats ?? 0}
                                    </p>

                                </div>


                                {/* =========================
                                    ORGANIZER
                                ========================= */}
                                <div className="border-t mt-5 pt-4">

                                    <p className="text-sm text-gray-500 mb-1">
                                        Organizer
                                    </p>

                                    {event.organizer ? (

                                        <>
                                            <p className="font-semibold text-gray-800">
                                                {event.organizer.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {event.organizer.email}
                                            </p>
                                        </>

                                    ) : (

                                        <p className="text-gray-500">
                                            Unknown organizer
                                        </p>

                                    )}

                                </div>


                                {/* =========================
                                    DELETE EVENT
                                ========================= */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDeleteEvent(
                                            event._id
                                        )
                                    }
                                    className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                                >
                                    Delete Event
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default AdminEvents;