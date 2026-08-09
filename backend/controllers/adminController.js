 import User from "../models/User.js";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";

// ===============================
// ADMIN DASHBOARD
// ===============================
export const getDashboardStats = async (req, res, next) => {
    try {
        // Total users
        const totalUsers = await User.countDocuments();

        // Total events
        const totalEvents = await Event.countDocuments();

        // Total bookings
        const totalBookings = await Booking.countDocuments({
            status: "Booked",
        });

        // Calculate total revenue
        const bookings = await Booking.find({
            status: "Booked",
        }).populate("event", "price");

        const totalRevenue = bookings.reduce((total, booking) => {
            return total + Number(booking.event?.price || 0);
        }, 0);

        res.status(200).json({
            message: "Dashboard Statistics",

            stats: {
                totalUsers,
                totalEvents,
                totalBookings,
                totalRevenue,
            },
        });

    } catch (error) {
        console.error("Admin Dashboard Error:", error);
        next(error);
    }
};


// ===============================
// GET ALL USERS
// ===============================
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
            .select("-password -loginOtpHash -forgotPasswordOtpHash");

        res.status(200).json({
            message: "Users Fetched Successfully",
            users,
        });

    } catch (error) {
        next(error);
    }
};


// ===============================
// GET ALL EVENTS
// ===============================
export const getAllAdminEvents = async (req, res, next) => {
    try {
        const events = await Event.find()
            .populate("organizer", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Events Fetched Successfully",
            events,
        });

    } catch (error) {
        next(error);
    }
};


// ===============================
// GET ALL BOOKINGS
// ===============================
export const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate("user", "name email")
            .populate(
                "event",
                "title date location price"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Bookings Fetched Successfully",
            bookings,
        });

    } catch (error) {
        next(error);
    }
};