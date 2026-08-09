 import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    createEvent,
    getAllEvents,
     getMyEvents,
    getEventById,
    updateEvent,
    deleteEvent
} from "../controllers/eventController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


// ================= GET ALL EVENTS =================
router.get("/", getAllEvents);
// ================= GET MY EVENTS =================
// Login required
router.get(
    "/my-events",
    protect,
    getMyEvents
);

// ================= GET SINGLE EVENT =================
router.get("/:id", getEventById);


// ================= CREATE EVENT =================
// Login required + image upload
router.post(
    "/",
    protect,
    upload.single("image"),
    createEvent
);


// ================= UPDATE EVENT =================
// Login required
// Controller checks whether user is the organizer
router.put(
    "/:id",
    protect,
    updateEvent
);


// ================= DELETE EVENT =================
// Login required
// Controller checks whether user is the organizer
router.delete(
    "/:id",
    protect,
    deleteEvent
);


export default router;