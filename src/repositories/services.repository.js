import ServicesDAO from "../dao/services.dao.js";

export default class ServicesRepository {
constructor(dao = new ServicesDAO()) {
    this.dao = dao;
}

// Consultar todos los servicios
async getAll() {
    return await this.dao.getAll();
}

// Consultar un servicio por ID
async getById(id) {
    return await this.dao.getById(id);
}

// Crear un servicio
async create(serviceData) {
    return await this.dao.create(serviceData);
}

// Actualizar un servicio
async update(id, updatedData) {
    return await this.dao.update(id, updatedData);
}

// Eliminar un servicio
async delete(id) {
    return await this.dao.delete(id);
}


}