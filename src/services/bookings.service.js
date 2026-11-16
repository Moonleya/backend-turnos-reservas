import BookingsRepository from "../repositories/bookings.repository.js";
import ServicesRepository from "../repositories/services.repository.js";
import { randomUUID } from "node:crypto";

export default class BookingsService {
constructor(
    bookingRepository = new BookingsRepository(),
    serviceRepository = new ServicesRepository()
) {
    this.bookingRepository = bookingRepository;
    this.serviceRepository = serviceRepository;
}

// Crear una nueva reserva
async createBooking(bookingData) {

    // Validar que se reciban los datos
    if (!bookingData || typeof bookingData !== "object") {
        throw new Error("Los datos de la reserva son obligatorios");
    }

    // Validar campos obligatorios
    const requiredFields = [
        "clientName",
        "clientEmail",
        "date",
        "time"
    ];

    for (const field of requiredFields) {
        if (
            bookingData[field] === undefined ||
            bookingData[field] === null ||
            bookingData[field] === ""
        ) {
            throw new Error(`El campo ${field} es obligatorio`);
        }
    }

    // Validar formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(bookingData.clientEmail)) {
        throw new Error("El correo electrónico no es válido");
    }

    // Validar estado de la reserva
    const validStatuses = [
        "pending",
        "confirmed",
        "cancelled"
    ];

    const status = bookingData.status || "pending";

    if (!validStatuses.includes(status)) {
        throw new Error("El estado de la reserva no es válido");
    }

    // Construir la reserva
    const newBooking = {
        id: randomUUID(),
        clientName: bookingData.clientName,
        clientEmail: bookingData.clientEmail,
        date: bookingData.date,
        time: bookingData.time,
        status,
        services: []
    };

    // Guardar mediante Repository
    return await this.bookingRepository.create(newBooking);
}

// Consultar una reserva por ID
async getBookingById(id) {
    return await this.bookingRepository.getById(id);
}

// Agregar un servicio a una reserva
async addServiceToBooking(bookingId, serviceId) {

    // Verificar que exista la reserva
    const booking = await this.bookingRepository.getById(bookingId);

    if (!booking) {
        throw new Error("La reserva no existe");
    }

    // Verificar que exista el servicio
    const service = await this.serviceRepository.getById(serviceId);

    if (!service) {
        throw new Error("El servicio no existe");
    }

    // Garantizar que services sea un arreglo
    if (!Array.isArray(booking.services)) {
        booking.services = [];
    }

    // Buscar si el servicio ya está asociado
    const existingService = booking.services.find(
        item => Number(item.service) === Number(serviceId)
    );

    if (existingService) {

        // Si ya existe, incrementar quantity
        existingService.quantity += 1;

    } else {

        // Si es nuevo, agregarlo con cantidad inicial 1
        booking.services.push({
            service: Number(serviceId),
            quantity: 1
        });
    }

    // Actualizar la reserva mediante Repository
    return await this.bookingRepository.update(
        bookingId,
        booking
    );
}


}