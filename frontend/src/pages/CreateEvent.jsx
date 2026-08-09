import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateEvent() {
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
    image: null,
});

     const handleChange = (e) => {

    if (e.target.name === "image") {

        setFormData({
            ...formData,
            image: e.target.files[0],
        });

    } else {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("date", formData.date);
        data.append("time", formData.time);
        data.append("location", formData.location);
        data.append("category", formData.category);
        data.append("price", formData.price);
        data.append("seats", formData.seats);

        if (formData.image) {
            data.append("image", formData.image);
        }

        await api.post("/events", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        alert("Event Created Successfully");
        navigate("/my-events");

    } catch (error) {

        alert(error.response?.data?.message || "Failed to create event");

    }
};   

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">

            <h1 className="text-3xl font-bold text-center mb-6">
                Create Event
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-4"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-4"
                    rows="4"
                    required
                />

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-4"
                    required
                />

                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-4"
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-4"
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-4"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-4"
                    required
                />

                <input
                    type="number"
                    name="seats"
                    placeholder="Available Seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-6"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
                >
                    Create Event
                </button>
                <div className="mb-4">

                   <label className="block font-semibold mb-2">
                   Event Image
                  </label>

 <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full border p-3 rounded"
    />

</div>

            </form>

        </div>
    );
}

export default CreateEvent;
