import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, "../data/bookings.json");

export default class BookingsDAO {
// Consultar todas las reservas
async getAll() {
    try {
        const data = await fs.readFile(FILE_PATH, "utf-8");
        return JSON.parse(data);

    } catch (error) {
        if (error.code === "ENOENT") {
            await fs.writeFile(FILE_PATH, "[]");
            return [];
        }

        throw error;
    }
}

// Crear una reserva
async create(bookingData) {
    const bookings = await this.getAll();

    bookings.push(bookingData);

    await fs.writeFile(
        FILE_PATH,
        JSON.stringify(bookings, null, 2)
    );

    return bookingData;
}

// Consultar una reserva por ID
async getById(id) {
    const bookings = await this.getAll();

    return bookings.find(
        booking => String(booking.id) === String(id)
    ) || null;
}

// Actualizar una reserva
async update(id, updatedData) {
    const bookings = await this.getAll();

    const index = bookings.findIndex(
        booking => String(booking.id) === String(id)
    );

    if (index === -1) {
        return null;
    }

    bookings[index] = {
        ...bookings[index],
        ...updatedData,
        id: bookings[index].id
    };

    await fs.writeFile(
        FILE_PATH,
        JSON.stringify(bookings, null, 2)
    );

    return bookings[index];
}


}