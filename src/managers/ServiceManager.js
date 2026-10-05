import servicesData from "../../data/services.json" with { type: "json" };

export class ServiceManager {
    constructor() {
        this.services = servicesData;
    }
    getServices() {
    return this.services;
}
getServiceById(id) {
    return this.services.find(service => service.id === id) || null;
}

updateService(id, updatedData) {
    const service = this.getServiceById(id);

    if (!service) {
        return null;
    }

    const { id: ignoredId, ...dataToUpdate } = updatedData;

    Object.assign(service, dataToUpdate);

    return service;
}

addService(serviceData) {
    const requiredFields = [
        "name",
        "description",
        "duration",
        "price",
        "category",
        "available"
    ];

    for (const field of requiredFields) {
        if (serviceData[field] === undefined) {
            throw new Error(`El campo ${field} es obligatorio`);
        }
    }

    const newId = this.services.length > 0
        ? Math.max(...this.services.map(service => service.id)) + 1
        : 1;

    const newService = {
        id: newId,
        ...serviceData
    };

    this.services.push(newService);

    return newService;
}

deleteService(id) {
    const index = this.services.findIndex(service => service.id === id);

    if (index === -1) {
        return null;
    }

    const deletedService = this.services.splice(index, 1);

    return deletedService[0];
}
}