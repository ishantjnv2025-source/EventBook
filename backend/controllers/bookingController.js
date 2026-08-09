 import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

// ===============================
// BOOK AN EVENT
// ===============================
export const bookEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Check event
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event Not Found",
            });
        }

        // Check available seats
        if (event.seats <= 0) {
            return res.status(400).json({
                message: "No Seats Available",
            });
        }

        // Prevent duplicate active booking
        const alreadyBooked = await Booking.findOne({
            user: req.user._id,
            event: eventId,
            status: "Booked",
        });

        if (alreadyBooked) {
            return res.status(400).json({
                message: "You have already booked this event",
            });
        }

        // Create booking
        const booking = await Booking.create({
            user: req.user._id,
            event: eventId,
            status: "Booked",
        });

        // Reduce available seats
        event.seats -= 1;
        await event.save();

        res.status(201).json({
            message: "Event Booked Successfully",
            booking,
        });

    } catch (error) {
        console.error("Book Event Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};


// ===============================
// GET MY BOOKINGS
// ===============================
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            user: req.user._id,
        })
            .populate("event")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "My Bookings",
            bookings,
        });

    } catch (error) {
        console.error("Get My Bookings Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};


// ===============================
// CANCEL BOOKING
// ===============================
export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking Not Found",
            });
        }

        // =====================================
        // OWNERSHIP CHECK
        // =====================================

        if (
            booking.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "You can only cancel your own booking",
            });
        }

        // Already cancelled
        if (booking.status === "Cancelled") {
            return res.status(400).json({
                message: "Booking Already Cancelled",
            });
        }

        // =====================================
        // CANCEL BOOKING
        // =====================================

        booking.status = "Cancelled";

        await booking.save();

        // =====================================
        // RETURN SEAT
        // =====================================

        const event = await Event.findById(booking.event);

        if (event) {
            event.seats += 1;
            await event.save();
        }

        res.status(200).json({
            message: "Booking Cancelled Successfully",
            booking,
        });

    } catch (error) {
        console.error("Cancel Booking Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};