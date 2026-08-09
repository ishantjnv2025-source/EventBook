 import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },

        bookingDate: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            enum: ["Booked", "Cancelled"],
            default: "Booked",
        },
    },
    {
        timestamps: true,
    }
);

bookingSchema.index({ user: 1, event: 1, status: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);
