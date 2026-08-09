 import Event from "../models/Event.js";

// ================= CREATE EVENT =================
export const createEvent = async (req, res, next) => {
    try {

        const {
            title,
            description,
            date,
            time,
            location,
            category,
            price,
            seats,
        } = req.body;

        if (!title || !description || !date || !time || !location || !category || price === undefined || seats === undefined) {
            return res.status(400).json({ message: "All event fields are required" });
        }

        const event = await Event.create({
            title,
            description,
            date,
            time,
            location,
            category,
            price,
            seats,
            organizer: req.user._id,
            image: req.file ? req.file.filename : "",
        });

        res.status(201).json({
            message: "Event Created Successfully",
            event,
        });

    } catch (error) { next(error); }
};

// ================= GET ALL EVENTS =================
 export const getAllEvents = async (req, res) => {
    try {

        const { search, category } = req.query;

        let filter = {};

        // Search by title
        if (search) {
            filter.title = {
                $regex: search,
                $options: "i",
            };
        }

        // Filter by category
        if (category && category !== "All") {
            filter.category = category;
        }

        const events = await Event.find(filter).populate(
            "organizer",
            "name email"
        );

        res.status(200).json({
            message: "Events Fetched Successfully",
            events,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};
// ===============================
// GET MY EVENTS
// ===============================
export const getMyEvents = async (req, res, next) => {
    try {
        const events = await Event.find({
            organizer: req.user._id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "My Events Fetched Successfully",
            events,
        });

    } catch (error) {
        next(error);
    }
};
// ================= GET SINGLE EVENT =================
export const getEventById = async (req, res, next) => {
    try {

        const event = await Event.findById(req.params.id).populate(
            "organizer",
            "name email"
        );

        if (!event) {
            return res.status(404).json({
                message: "Event Not Found"
            });
        }

        res.status(200).json({
            message: "Event Found Successfully",
            event,
        });

    } catch (error) { next(error); }
};
 // ===============================
// UPDATE EVENT
// ===============================
export const updateEvent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        // Admin can update any event
        // Organizer can update only their own event
        const isAdmin = req.user.role === "admin";
        const isOrganizer =
            event.organizer.toString() === req.user._id.toString();

        if (!isAdmin && !isOrganizer) {
            return res.status(403).json({
                message: "You are not allowed to update this event",
            });
        }

        const {
            title,
            description,
            date,
            time,
            location,
            category,
            price,
            seats,
        } = req.body;

        event.title = title ?? event.title;
        event.description = description ?? event.description;
        event.date = date ?? event.date;
        event.time = time ?? event.time;
        event.location = location ?? event.location;
        event.category = category ?? event.category;
        event.price = price ?? event.price;
        event.seats = seats ?? event.seats;

        // If a new image was uploaded
        if (req.file) {
            event.image = req.file.filename;
        }

        const updatedEvent = await event.save();

        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent,
        });

    } catch (error) {
        next(error);
    }
};


// ===============================
// DELETE EVENT
// ===============================
export const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        // Admin can delete any event
        // Organizer can delete only their own event
        const isAdmin = req.user.role === "admin";
        const isOrganizer =
            event.organizer.toString() === req.user._id.toString();

        if (!isAdmin && !isOrganizer) {
            return res.status(403).json({
                message: "You are not allowed to delete this event",
            });
        }

        await Event.findByIdAndDelete(id);

        res.status(200).json({
            message: "Event deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};