import { BookingManager } from "../managers/BookingManager.js";
import { ServiceManager } from "../managers/ServiceManager.js";

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

// Consultar todas las reservas
export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingManager.getBookings();

        return res.status(200).json(bookings);

    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar las reservas",
            error: error.message
        });
    }
};

// Crear una nueva reserva
export const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingManager.createBooking(req.body);

        return res.status(201).json({
            message: "Reserva creada correctamente",
            booking: newBooking
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

// Consultar una reserva por ID
export const getBookingById = async (req, res) => {
    try {
        const { bid } = req.params;

        const booking = await bookingManager.getBookingById(bid);

        if (!booking) {
            return res.status(404).json({
                message: "Reserva no encontrada"
            });
        }

        return res.status(200).json(booking);

    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar la reserva",
            error: error.message
        });
    }
};

// Agregar un servicio a una reserva
export const addServiceToBooking = async (req, res) => {
    try {
        const { bid, sid } = req.params;

        // Verificar que el servicio exista
        const service = await serviceManager.getServiceById(sid);

        if (!service) {
            return res.status(404).json({
                message: "El servicio no existe"
            });
        }

        // Asociar el servicio a la reserva
        const updatedBooking = await bookingManager.addServiceToBooking(
            bid,
            sid
        );

        return res.status(200).json({
            message: "Servicio agregado correctamente a la reserva",
            booking: updatedBooking
        });

    } catch (error) {
        const statusCode = error.message === "La reserva no existe"
            ? 404
            : 400;

        return res.status(statusCode).json({
            message: error.message
        });
    }
};