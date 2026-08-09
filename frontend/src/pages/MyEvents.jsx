 import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { backendUrl } from "../services/api";

function MyEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMyEvents();
    }, []);

    async function fetchMyEvents() {
        try {
            setLoading(true);

            const res = await api.get("/events/my-events");

            setEvents(res.data.events || []);
            setError("");

        } catch (error) {
            console.error("My Events Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load your events."
            );

        } finally {
            setLoading(false);
        }
    }

    async function deleteEvent(eventId) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/events/${eventId}`);

            // Remove deleted event from UI
            setEvents((previousEvents) =>
                previousEvents.filter(
                    (event) => event._id !== eventId
                )
            );

        } catch (error) {
            console.error("Delete Event Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to delete event."
            );
        }
    }

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <h1 className="text-2xl font-semibold text-gray-600">
                    Loading your events...
                </h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-8">
                <div className="bg-red-100 text-red-700 p-5 rounded-lg text-center">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

                <div>
                    <h1 className="text-4xl font-bold text-gray-800">
                        My Events
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage the events you have created.
                    </p>
                </div>

                <Link
                    to="/create-event"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
                >
                    + Create Event
                </Link>

            </div>


            {/* Event Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Total Events:
                    <span className="font-bold text-blue-600 ml-2">
                        {events.length}
                    </span>
                </p>
            </div>


            {/* No Events */}
            {events.length === 0 ? (

                <div className="bg-white shadow-md rounded-xl p-12 text-center">

                    <div className="text-6xl mb-5">
                        🎫
                    </div>

                    <h2 className="text-2xl font-bold text-gray-700">
                        No Events Created Yet
                    </h2>

                    <p className="text-gray-500 mt-2 mb-6">
                        Create your first event and start receiving bookings.
                    </p>

                    <Link
                        to="/create-event"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Create Your First Event
                    </Link>

                </div>

            ) : (

                /* Events Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

                    {events.map((event) => (

                        <div
                            key={event._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                        >

                            {/* Image */}
                            {event.image ? (

                                <img
                                    src={`${backendUrl}/uploads/${event.image}`}
                                    alt={event.title}
                                    className="w-full h-52 object-cover"
                                />

                            ) : (

                                <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>

                            )}


                            {/* Content */}
                            <div className="p-6">

                                <h2 className="text-2xl font-bold text-blue-600 mb-3">
                                    {event.title}
                                </h2>

                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {event.description}
                                </p>


                                <div className="space-y-2 text-gray-700">

                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(event.date).toLocaleDateString()}
                                    </p>

                                    <p>
                                        <strong>Time:</strong>{" "}
                                        {event.time}
                                    </p>

                                    <p>
                                        <strong>Location:</strong>{" "}
                                        {event.location}
                                    </p>

                                    <p>
                                        <strong>Category:</strong>{" "}
                                        {event.category}
                                    </p>

                                    <p>
                                        <strong>Price:</strong>{" "}
                                        ₹{event.price}
                                    </p>

                                    <p>
                                        <strong>Available Seats:</strong>{" "}
                                        {event.seats}
                                    </p>

                                </div>


                                {/* Buttons */}
                                <div className="grid grid-cols-2 gap-3 mt-6">

                                    <Link
                                        to={`/events/${event._id}`}
                                        className="bg-gray-700 hover:bg-gray-800 text-white text-center py-2 rounded-lg"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/edit-event/${event._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg"
                                    >
                                        Edit
                                    </Link>

                                </div>


                                <button
                                    onClick={() => deleteEvent(event._id)}
                                    className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
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

export default MyEvents;
