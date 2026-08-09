 import Event from "../models/Event.js";
import Booking from "../models/Booking.js";

// ================= ORGANIZER DASHBOARD =================
export const getDashboard = async (req, res) => {
    try {
        // Make sure the user is authenticated
        if (!req.user) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

        // Find all events created by the logged-in organizer
        const events = await Event.find({
            organizer: req.user._id,
        }).sort({ createdAt: -1 });

        // Get event IDs
        const eventIds = events.map((event) => event._id);

        // If organizer has no events
        if (eventIds.length === 0) {
            return res.status(200).json({
                totalEvents: 0,
                totalBookings: 0,
                totalRevenue: 0,
                recentBookings: [],
            });
        }

        // Find bookings belonging to organizer's events
        const bookings = await Booking.find({
            event: { $in: eventIds },
            status: "Booked",
        })
            .populate("user", "name email")
            .populate("event", "title price")
            .sort({ createdAt: -1 });

        // Total events
        const totalEvents = events.length;

        // Total bookings
        const totalBookings = bookings.length;

        // Calculate revenue
        const totalRevenue = bookings.reduce((total, booking) => {
            return total + Number(booking.event?.price || 0);
        }, 0);

        // Send dashboard data
        res.status(200).json({
            totalEvents,
            totalBookings,
            totalRevenue,
            recentBookings: bookings.slice(0, 5),
        });

    } catch (error) {
        console.error("Dashboard Error:", error);

        res.status(500).json({
            message: "Unable to load dashboard",
        });
    }
};