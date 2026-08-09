import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
           type: String,
           default: "",
        },

        description: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        seats: {
            type: Number,
            required: true,
            min: 0,
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
