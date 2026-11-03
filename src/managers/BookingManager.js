import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKINGS_PATH = path.join(__dirname, "../../data/bookings.json");
const SERVICES_PATH = path.join(__dirname, "../../data/services.json");

export class BookingManager {

    // Consultar todas las reservas
    async getBookings() {
        try {
            const data = await fs.readFile(BOOKINGS_PATH, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            if (error.code === "ENOENT") {
                await fs.writeFile(BOOKINGS_PATH, "[]");
                return [];
            }
            throw error;
        }
    }

    // Guardar las reservas
    async saveBookings(bookings) {
        await fs.writeFile(
            BOOKINGS_PATH,
            JSON.stringify(bookings, null, 2)
        );
    }

    // Crear una nueva reserva
    async createBooking(bookingData) {
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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(bookingData.clientEmail)) {
            throw new Error("El correo electrónico no es válido");
        }

        const validStatuses = [
            "pending",
            "confirmed",
            "cancelled"
        ];

        const status = bookingData.status || "pending";

        if (!validStatuses.includes(status)) {
            throw new Error("El estado de la reserva no es válido");
        }

        const bookings = await this.getBookings();

        const newBooking = {
            id: randomUUID(),
            clientName: bookingData.clientName,
            clientEmail: bookingData.clientEmail,
            date: bookingData.date,
            time: bookingData.time,
            status,
            services: []
        };

        bookings.push(newBooking);

        await this.saveBookings(bookings);

        return newBooking;
    }

    // Consultar una reserva por ID
    async getBookingById(id) {
        const bookings = await this.getBookings();

        return bookings.find(
            booking => booking.id === id
        ) || null;
    }

    // Agregar un servicio a una reserva
    async addServiceToBooking(bookingId, serviceId) {
        const bookings = await this.getBookings();

        const booking = bookings.find(
            booking => booking.id === bookingId
        );

        if (!booking) {
            throw new Error("La reserva no existe");
        }

        const servicesData = await fs.readFile(
            SERVICES_PATH,
            "utf-8"
        );

        const services = JSON.parse(servicesData);

        const service = services.find(
            service => String(service.id) === String(serviceId)
        );

        if (!service) {
            throw new Error("El servicio no existe");
        }

        const existingService = booking.services.find(
            item => String(item.service) === String(serviceId)
        );

        if (existingService) {
            existingService.quantity += 1;
        } else {
            booking.services.push({
                service: service.id,
                quantity: 1
            });
        }

        await this.saveBookings(bookings);

        return booking;
    }

    // Eliminar un servicio de una reserva
    async removeServiceFromBooking(bookingId, serviceId) {
        const bookings = await this.getBookings();

        const booking = bookings.find(
            booking => booking.id === bookingId
        );

        if (!booking) {
            throw new Error("La reserva no existe");
        }

        const serviceIndex = booking.services.findIndex(
            item => String(item.service) === String(serviceId)
        );

        if (serviceIndex === -1) {
            throw new Error("El servicio no está asociado a esta reserva");
        }

        booking.services.splice(serviceIndex, 1);

        await this.saveBookings(bookings);

        return booking;
    }

    // Actualizar los datos de una reserva
    async updateBooking(id, bookingData) {
        const bookings = await this.getBookings();

        const booking = bookings.find(
            booking => booking.id === id
        );

        if (!booking) {
            throw new Error("La reserva no existe");
        }

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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(bookingData.clientEmail)) {
            throw new Error("El correo electrónico no es válido");
        }

        booking.clientName = bookingData.clientName;
        booking.clientEmail = bookingData.clientEmail;
        booking.date = bookingData.date;
        booking.time = bookingData.time;

        await this.saveBookings(bookings);

        return booking;
    }

    // Actualizar el estado de una reserva
    async updateBookingStatus(id, status) {
        const bookings = await this.getBookings();

        const booking = bookings.find(
            booking => booking.id === id
        );

        if (!booking) {
            throw new Error("La reserva no existe");
        }

        const validStatuses = [
            "pending",
            "confirmed",
            "cancelled"
        ];

        if (!validStatuses.includes(status)) {
            throw new Error("El estado de la reserva no es válido");
        }

        booking.status = status;

        await this.saveBookings(bookings);

        return booking;
    }

    // Eliminar una reserva completa
    async deleteBooking(id) {
        const bookings = await this.getBookings();

        const bookingIndex = bookings.findIndex(
            booking => booking.id === id
        );

        if (bookingIndex === -1) {
            throw new Error("La reserva no existe");
        }

        const deletedBooking = bookings.splice(bookingIndex, 1)[0];

        await this.saveBookings(bookings);

        return deletedBooking;
    }
}