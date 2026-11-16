import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, "../data/services.json");

export default class ServicesDAO {
// Consultar todos los servicios
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

// Consultar un servicio por ID
async getById(id) {
    const services = await this.getAll();

    return services.find(
        service => service.id === Number(id)
    ) || null;
}

// Crear un servicio
async create(serviceData) {
    const services = await this.getAll();

    const newId = services.length > 0
        ? Math.max(...services.map(service => service.id)) + 1
        : 1;

    const newService = {
        id: newId,
        ...serviceData
    };

    services.push(newService);

    await fs.writeFile(
        FILE_PATH,
        JSON.stringify(services, null, 2)
    );

    return newService;
}

// Actualizar un servicio
async update(id, updatedData) {
    const services = await this.getAll();

    const index = services.findIndex(
        service => service.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    services[index] = {
        ...services[index],
        ...updatedData,
        id: Number(id)
    };

    await fs.writeFile(
        FILE_PATH,
        JSON.stringify(services, null, 2)
    );

    return services[index];
}

// Eliminar un servicio
async delete(id) {
    const services = await this.getAll();

    const index = services.findIndex(
        service => service.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const deletedService = services.splice(index, 1)[0];

    await fs.writeFile(
        FILE_PATH,
        JSON.stringify(services, null, 2)
    );

    return deletedService;
}


}