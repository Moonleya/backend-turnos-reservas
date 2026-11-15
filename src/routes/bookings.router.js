import { Router } from "express";

import {
    getBookings,
    createBooking,
    getBookingById,
    addServiceToBooking
} from "../controllers/bookings.controller.js";

const router = Router();

// Consultar todas las reservas
router.get("/", getBookings);

// Crear una reserva
router.post("/", createBooking);

// Consultar una reserva por ID
router.get("/:bid", getBookingById);

// Agregar un servicio a una reserva
router.post("/:bid/services/:sid", addServiceToBooking);

export default router;