import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, "../../data/services.json");

export class ServiceManager {

    async getServices() {
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

    async saveServices(services) {
        await fs.writeFile(
            FILE_PATH,
            JSON.stringify(services, null, 2)
        );
    }

    async getServiceById(id) {
        const services = await this.getServices();

        return services.find(
            service => service.id === Number(id)
        ) || null;
    }

    async addService(serviceData) {

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

        const services = await this.getServices();

        const newId = services.length > 0
            ? Math.max(...services.map(service => service.id)) + 1
            : 1;

        const newService = {
            id: newId,
            ...serviceData
        };

        services.push(newService);

        await this.saveServices(services);

        return newService;
    }

    async updateService(id, updatedData) {

        const services = await this.getServices();

        const index = services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        const { id: ignoredId, ...dataToUpdate } = updatedData;

        services[index] = {
            ...services[index],
            ...dataToUpdate,
            id: services[index].id
        };

        await this.saveServices(services);

        return services[index];
    }

    async deleteService(id) {

        const services = await this.getServices();

        const index = services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        const deletedService = services.splice(index, 1)[0];

        await this.saveServices(services);

        return deletedService;
    }
}