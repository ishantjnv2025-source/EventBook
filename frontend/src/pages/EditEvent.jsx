  import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditEvent() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        price: "",
        seats: "",
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchEvent();
    }, []);

    async function fetchEvent() {
        try {

            const res = await api.get(`/events/${id}`);

            // Backend returns { message, event }
            const event = res.data.event;

            setFormData({
                title: event.title,
                description: event.description,
                date: event.date.substring(0, 10),
                time: event.time,
                location: event.location,
                category: event.category,
                price: event.price,
                seats: event.seats,
            });

        } catch (error) {
            console.log(error);
            alert("Unable to load event.");
        }
    }

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/events/${id}`, formData);

            alert("Event Updated Successfully");

            navigate(`/events/${id}`);

        } catch (error) {

            alert(error.response?.data?.message || "Update Failed");

        }

    };

    return (

        <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">

            <h1 className="text-3xl font-bold mb-6 text-center">
                Edit Event
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    rows="4"
                    required
                />

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="time"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="number"
                    name="seats"
                    placeholder="Seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
                >
                    Update Event
                </button>

            </form>

        </div>

    );
}

export default EditEvent;
