import BookingsService from "../services/bookings.service.js";

const bookingsService = new BookingsService();

// Crear una nueva reserva
export const createBooking = async (req, res) => {
try {
if (!req.body || Object.keys(req.body).length === 0) {
return res.status(400).json({
message: "Debe enviar los datos de la reserva"
});
}
    const newBooking = await bookingsService.createBooking(req.body);

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
    const booking = await bookingsService.getBookingById(bid);

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
    const updatedBooking = await bookingsService.addServiceToBooking(
        bid,
        sid
    );

    return res.status(200).json({
        message: "Servicio agregado correctamente a la reserva",
        booking: updatedBooking
    });

} catch (error) {
    const statusCode =
        error.message === "La reserva no existe" ||
        error.message === "El servicio no existe"
            ? 404
            : 400;

    return res.status(statusCode).json({
        message: error.message
    });
}


};