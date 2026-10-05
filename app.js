import { ServiceManager } from "./src/managers/ServiceManager.js";

const serviceManager = new ServiceManager();

console.log("Servicio antes de eliminar:");
console.log(serviceManager.getServiceById(2));

console.log("Servicio eliminado:");
console.log(serviceManager.deleteService(2));

console.log("Servicio después de eliminar:");
console.log(serviceManager.getServiceById(2));