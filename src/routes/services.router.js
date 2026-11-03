import { Router } from "express";
import { ServiceManager } from "../managers/ServiceManager.js";

const router = Router();
const serviceManager = new ServiceManager();

// GET: consultar todos los servicios y aplicar filtros
router.get("/", async (req, res) => {
    try {
        let services = await serviceManager.getServices();

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

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});


// GET: consultar un servicio por ID
router.get("/:sid", async (req, res) => {
    try {
        const id = Number(req.params.sid);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "El ID del servicio no es válido"
            });
        }

        const service = await serviceManager.getServiceById(id);

        if (!service) {
            return res.status(404).json({
                error: `No existe un servicio con ID ${req.params.sid}`
            });
        }

        return res.status(200).json(service);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});


// POST: crear un servicio
router.post("/", async (req, res) => {
    try {
        const newService = await serviceManager.addService(req.body);

        return res.status(201).json(newService);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});


// PUT: actualizar un servicio
router.put("/:sid", async (req, res) => {
    try {
        const id = Number(req.params.sid);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "El ID del servicio no es válido"
            });
        }

        const updatedService = await serviceManager.updateService(
            id,
            req.body
        );

        if (!updatedService) {
            return res.status(404).json({
                error: `No existe un servicio con ID ${req.params.sid}`
            });
        }

        return res.status(200).json(updatedService);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});


// DELETE: eliminar un servicio
router.delete("/:sid", async (req, res) => {
    try {
        const id = Number(req.params.sid);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "El ID del servicio no es válido"
            });
        }

        const deletedService = await serviceManager.deleteService(id);

        if (!deletedService) {
            return res.status(404).json({
                error: `No existe un servicio con ID ${req.params.sid}`
            });
        }

        return res.status(200).json({
            message: "Servicio eliminado correctamente",
            service: deletedService
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

export default router;