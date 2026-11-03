import { Router } from "express";
import { BookingManager } from "../managers/BookingManager.js";

const router = Router();
const bookingManager = new BookingManager();


// ==========================================
// POST: Crear una reserva
// Endpoint: POST /api/bookings
// ==========================================
router.post("/", async (req, res) => {
    try {
        const booking = await bookingManager.createBooking(req.body);

        res.status(201).json({
            message: "Reserva creada correctamente",
            booking
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// ==========================================
// GET: Consultar una reserva por ID
// Endpoint: GET /api/bookings/:bid
// ==========================================
router.get("/:bid", async (req, res) => {
    try {
        const booking = await bookingManager.getBookingById(
            req.params.bid
        );

        if (!booking) {
            return res.status(404).json({
                error: "Reserva no encontrada"
            });
        }

        res.status(200).json(booking);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// ==========================================
// POST: Agregar un servicio a una reserva
// Endpoint: POST /api/bookings/:bid/services/:sid
// ==========================================
router.post("/:bid/services/:sid", async (req, res) => {
    try {
        const booking = await bookingManager.addServiceToBooking(
            req.params.bid,
            req.params.sid
        );

        res.status(200).json({
            message: "Servicio agregado correctamente",
            booking
        });

    } catch (error) {
        const status = error.message.includes("no existe") ? 404 : 400;

        res.status(status).json({
            error: error.message
        });
    }
});


// ==========================================
// DELETE: Eliminar un servicio de una reserva
// Endpoint: DELETE /api/bookings/:bid/services/:sid
// ==========================================
router.delete("/:bid/services/:sid", async (req, res) => {
    try {
        const booking = await bookingManager.removeServiceFromBooking(
            req.params.bid,
            req.params.sid
        );

        res.status(200).json({
            message: "Servicio eliminado correctamente",
            booking
        });

    } catch (error) {
        const status = error.message.includes("no existe") ? 404 : 400;

        res.status(status).json({
            error: error.message
        });
    }
});


// ==========================================
// PUT: Actualizar los datos de una reserva
// Endpoint: PUT /api/bookings/:bid
// ==========================================
router.put("/:bid", async (req, res) => {
    try {
        const booking = await bookingManager.updateBooking(
            req.params.bid,
            req.body
        );

        if (!booking) {
            return res.status(404).json({
                error: "Reserva no encontrada"
            });
        }

        res.status(200).json({
            message: "Reserva actualizada correctamente",
            booking
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// ==========================================
// PATCH: Actualizar el estado de una reserva
// Endpoint: PATCH /api/bookings/:bid/status
// ==========================================
router.patch("/:bid/status", async (req, res) => {
    try {
        const booking = await bookingManager.updateBookingStatus(
            req.params.bid,
            req.body.status
        );

        if (!booking) {
            return res.status(404).json({
                error: "Reserva no encontrada"
            });
        }

        res.status(200).json({
            message: "Estado de la reserva actualizado correctamente",
            booking
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// ==========================================
// DELETE: Eliminar una reserva completa
// Endpoint: DELETE /api/bookings/:bid
// ==========================================
router.delete("/:bid", async (req, res) => {
    try {
        const booking = await bookingManager.deleteBooking(
            req.params.bid
        );

        if (!booking) {
            return res.status(404).json({
                error: "Reserva no encontrada"
            });
        }

        res.status(200).json({
            message: "Reserva eliminada correctamente",
            booking
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


export default router;