import express from "express";

import protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllAdminEvents,
     deleteAdminEvent,
    getAllBookings,
} from "../controllers/adminController.js";

const router = express.Router();


// =====================================
// ADMIN DASHBOARD STATISTICS
// GET /api/admin/dashboard
// =====================================
router.get(
    "/dashboard",
    protect,
    adminOnly,
    getDashboardStats
);


// =====================================
// GET ALL USERS
// GET /api/admin/users
// =====================================
router.get(
    "/users",
    protect,
    adminOnly,
    getAllUsers
);
// =====================================
// DELETE USER
// DELETE /api/admin/users/:id
// =====================================

router.delete(
    "/users/:id",
    protect,
    adminOnly,
    deleteUser
);

// =====================================
// GET ALL EVENTS
// GET /api/admin/events
// =====================================
router.get(
    "/events",
    protect,
    adminOnly,
    getAllAdminEvents
);
// =====================================
// DELETE EVENT - ADMIN
// DELETE /api/admin/events/:id
// =====================================

router.delete(
    "/events/:id",
    protect,
    adminOnly,
    deleteAdminEvent
);


// =====================================
// GET ALL BOOKINGS
// GET /api/admin/bookings
// =====================================
router.get(
    "/bookings",
    protect,
    adminOnly,
    getAllBookings
);


export default router;