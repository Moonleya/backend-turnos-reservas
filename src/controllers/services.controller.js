import ServicesService from "../services/services.service.js";

const servicesService = new ServicesService();

// Consultar todos los servicios
export const getServices = async (req, res) => {
try {
const services = await servicesService.getServices();
    return res.status(200).json(services);

} catch (error) {
    return res.status(500).json({
        message: "Error al consultar los servicios",
        error: error.message
    });
}


};

// Consultar un servicio por ID
export const getServiceById = async (req, res) => {
try {
const { sid } = req.params;
    const service = await servicesService.getServiceById(sid);

    if (!service) {
        return res.status(404).json({
            message: "Servicio no encontrado"
        });
    }

    return res.status(200).json(service);

} catch (error) {
    return res.status(500).json({
        message: "Error al consultar el servicio",
        error: error.message
    });
}


};

// Crear un servicio
export const createService = async (req, res) => {
try {
if (!req.body || Object.keys(req.body).length === 0) {
return res.status(400).json({
message: "Debe enviar los datos del servicio"
});
}
    const newService = await servicesService.createService(req.body);

    return res.status(201).json({
        message: "Servicio creado correctamente",
        service: newService
    });

} catch (error) {
    return res.status(400).json({
        message: error.message
    });
}


};

// Actualizar un servicio
export const updateService = async (req, res) => {
try {
const { sid } = req.params;
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Debe enviar los datos para actualizar el servicio"
        });
    }

    const updatedService = await servicesService.updateService(
        sid,
        req.body
    );

    if (!updatedService) {
        return res.status(404).json({
            message: "Servicio no encontrado"
        });
    }

    return res.status(200).json({
        message: "Servicio actualizado correctamente",
        service: updatedService
    });

} catch (error) {
    return res.status(400).json({
        message: error.message
    });
}


};

// Eliminar un servicio
export const deleteService = async (req, res) => {
try {
const { sid } = req.params;
    const deletedService = await servicesService.deleteService(sid);

    if (!deletedService) {
        return res.status(404).json({
            message: "Servicio no encontrado"
        });
    }

    return res.status(200).json({
        message: "Servicio eliminado correctamente",
        service: deletedService
    });

} catch (error) {
    return res.status(500).json({
        message: "Error al eliminar el servicio",
        error: error.message
    });
}


};