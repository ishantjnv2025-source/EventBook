import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Events() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            // eslint-disable-next-line react-hooks/immutability
            fetchEvents();
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, category]);

    async function fetchEvents() {
        try {
            setIsLoading(true);

            const res = await api.get(
                `/events?search=${search}&category=${category}`
            );

            const eventList = Array.isArray(res.data)
                ? res.data
                : res.data.events;

            setEvents(Array.isArray(eventList) ? eventList : []);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Unable to load events.");
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="text-center mt-10 text-xl">
                Loading Events...
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

            <h1 className="text-4xl font-bold text-center mb-8">
                All Events
            </h1>

            {/* Search */}
            <div className="mb-5">
                <input
                    type="text"
                    placeholder="Search Events..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Category */}
            <div className="mb-8">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg shadow"
                >
                    <option value="All">All Categories</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Sports">Sports</option>
                    <option value="Music">Music</option>
                    <option value="Coding">Coding</option>
                </select>
            </div>

            {events.length === 0 ? (

                <h2 className="text-center text-gray-500 text-xl">
                    No Events Available
                </h2>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {events.map((event) => (

                        <div
                            key={event._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl duration-300"
                        >

                            {/* Event Image */}
                            {event.image ? (
                                <img
                                    src={`http://localhost:5000/uploads/${event.image}`}
                                    alt={event.title}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    No Image
                                </div>
                            )}

                            <div className="p-6">

                                <h2 className="text-2xl font-bold text-blue-600 mb-3">
                                    {event.title}
                                </h2>

                                <p className="text-gray-700 mb-4">
                                    {event.description}
                                </p>

                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(event.date).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>Time:</strong> {event.time}
                                </p>

                                <p>
                                    <strong>Location:</strong> {event.location}
                                </p>

                                <p>
                                    <strong>Category:</strong> {event.category}
                                </p>

                                <p>
                                    <strong>Price:</strong> ₹{event.price}
                                </p>

                                <p>
                                    <strong>Seats:</strong> {event.seats}
                                </p>

                                <Link
                                    to={`/events/${event._id}`}
                                    className="block mt-5 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
                                >
                                    View Details
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Events;  
