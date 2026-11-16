import BookingsDAO from "../dao/bookings.dao.js";

export default class BookingsRepository {

    constructor(dao = new BookingsDAO()) {
        this.dao = dao;
    }

    async create(bookingData) {
        return await this.dao.create(bookingData);
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async update(id, updatedData) {
        return await this.dao.update(id, updatedData);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }
}