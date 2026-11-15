import { Router } from "express";

import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from "../controllers/services.controller.js";

const router = Router();

// Consultar todos los servicios
router.get("/", getServices);

// Consultar un servicio por ID
router.get("/:sid", getServiceById);

// Crear un servicio
router.post("/", createService);

// Actualizar un servicio
router.put("/:sid", updateService);

// Eliminar un servicio
router.delete("/:sid", deleteService);

export default router;