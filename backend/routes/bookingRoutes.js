import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    bookEvent,
    getMyBookings,
    cancelBooking,
} from "../controllers/bookingController.js";

const router = express.Router();


// Book an event
router.post(
    "/:eventId",
    protect,
    bookEvent
);


// Get logged-in user's bookings
router.get(
    "/my-bookings",
    protect,
    getMyBookings
);


// Cancel booking
router.put(
    "/cancel/:bookingId",
    protect,
    cancelBooking
);

export default router;  