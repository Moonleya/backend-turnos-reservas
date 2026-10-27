import { Router } from "express";
import { ServiceManager } from "../managers/ServiceManager.js";

const router = Router();
const serviceManager = new ServiceManager();

// GET: consultar todos los servicios y aplicar filtros
router.get("/", (req, res) => {
    let services = serviceManager.getServices();
    const { category, available } = req.query;

    if (category) {
        services = services.filter(
            service =>
                service.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (available !== undefined) {
        if (available !== "true" && available !== "false") {
            return res.status(400).json({
                error: "El parámetro available debe ser true o false"
            });
        }

        services = services.filter(
            service => service.available === (available === "true")
        );
    }

    return res.status(200).json(services);
});

// GET: consultar un servicio por ID
router.get("/:sid", (req, res) => {
    const id = Number(req.params.sid);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(404).json({
            error: "El ID del servicio no es válido"
        });
    }

    const service = serviceManager.getServiceById(id);

    if (!service) {
        return res.status(404).json({
            error: `No existe un servicio con ID ${req.params.sid}`
        });
    }

    return res.status(200).json(service);
});

// POST: crear un servicio
router.post("/", (req, res) => {
    try {
        const newService = serviceManager.addService(req.body);
        return res.status(201).json(newService);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

// PUT: actualizar un servicio
router.put("/:sid", (req, res) => {
    const id = Number(req.params.sid);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(404).json({
            error: "El ID del servicio no es válido"
        });
    }

    const updatedService = serviceManager.updateService(id, req.body);

    if (!updatedService) {
        return res.status(404).json({
            error: `No existe un servicio con ID ${req.params.sid}`
        });
    }

    return res.status(200).json(updatedService);
});

// DELETE: eliminar un servicio
router.delete("/:sid", (req, res) => {
    const id = Number(req.params.sid);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(404).json({
            error: "El ID del servicio no es válido"
        });
    }

    const deletedService = serviceManager.deleteService(id);

    if (!deletedService) {
        return res.status(404).json({
            error: `No existe un servicio con ID ${req.params.sid}`
        });
    }

    return res.status(200).json({
        message: "Servicio eliminado correctamente",
        service: deletedService
    });
});

export default router;