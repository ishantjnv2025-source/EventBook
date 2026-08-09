  import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function EventDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchEvent();
    }, []);

    async function fetchEvent() {
        try {

            const res = await api.get(`/events/${id}`);

            // Backend returns { message, event }
            setEvent(res.data.event);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/events/${id}`);

            alert("Event Deleted Successfully");

            navigate("/events");

        } catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    }

    const handleBooking = async () => {
        if (!localStorage.getItem("token")) {
            alert("Please log in before booking an event.");
            navigate("/login");
            return;
        }

        try {
            const res = await api.post(`/bookings/${id}`);
            alert(res.data.message || "Event booked successfully");
            navigate("/events/my-bookings");
        } catch (error) {
            alert(error.response?.data?.message || "Unable to book this event");
        }
    };

    if (loading) {
        return (
            <h1 className="text-center text-3xl mt-10">
                Loading...
            </h1>
        );
    }

    if (!event) {
        return (
            <h1 className="text-center text-red-600 text-3xl mt-10">
                Event Not Found
            </h1>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">

            <h1 className="text-4xl font-bold text-blue-600 mb-6">
                {event.title}
            </h1>

            <p className="text-lg mb-6">
                {event.description}
            </p>

            <div className="space-y-3">

                <p>
                    <strong>Date :</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                </p>

                <p>
                    <strong>Time :</strong> {event.time}
                </p>

                <p>
                    <strong>Location :</strong> {event.location}
                </p>

                <p>
                    <strong>Category :</strong> {event.category}
                </p>

                <p>
                    <strong>Price :</strong> ₹{event.price}
                </p>

                <p>
                    <strong>Seats :</strong> {event.seats}
                </p>

                <p>
                    <strong>Organizer :</strong> {event.organizer?.name}
                </p>

                <p>
                    <strong>Email :</strong> {event.organizer?.email}
                </p>

            </div>

            <div className="flex flex-wrap gap-4 mt-8">

                <button
                    onClick={handleBooking}
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
                >
                    Book Event
                </button>

                <Link
                    to={`/edit-event/${event._id}`}
                    className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
                >
                    Edit Event
                </Link>

                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
                >
                    Delete Event
                </button>

                <Link
                    to="/events"
                    className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
                >
                    Back
                </Link>

            </div>

        </div>
    );
}

export default EventDetails;
