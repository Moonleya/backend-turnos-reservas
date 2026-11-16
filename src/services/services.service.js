import ServicesRepository from "../repositories/services.repository.js";

export default class ServicesService {

    constructor(repository = new ServicesRepository()) {
        this.repository = repository;
    }

    // Consultar todos los servicios
    async getServices() {
        return await this.repository.getAll();
    }

    // Consultar un servicio por ID
    async getServiceById(id) {
        return await this.repository.getById(id);
    }

    // Crear un servicio con validación de campos obligatorios
    async createService(serviceData) {

        const requiredFields = [
            "name",
            "description",
            "duration",
            "price",
            "category",
            "available"
        ];

        for (const field of requiredFields) {
            if (
                serviceData[field] === undefined ||
                serviceData[field] === null ||
                serviceData[field] === ""
            ) {
                throw new Error(`El campo ${field} es obligatorio`);
            }
        }

        return await this.repository.create(serviceData);
    }

    // Actualizar un servicio
    async updateService(id, updatedData) {

        const { id: ignoredId, ...dataToUpdate } = updatedData;

        return await this.repository.update(id, dataToUpdate);
    }

    // Eliminar un servicio
    async deleteService(id) {
        return await this.repository.delete(id);
    }
}