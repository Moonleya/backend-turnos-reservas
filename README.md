Sistema de cotización,  Servicios y Reservas de consultorias de Desarrollo de Software.
Descripción

Backend inicial desarrollado con Node.js y ESM para la gestión de servicios de un sistema de cotización de servicios de desarrollo de software.

Esta primera entrega implementa un ServiceManager encargado de administrar los servicios disponibles, permitiendo consultar, crear, actualizar y eliminar servicios.

Los servicios se almacenan inicialmente en un archivo JSON (services.json) y se gestionan en memoria durante la ejecución de la aplicación.

Tecnologías utilizadas
Node.js
JavaScript
ESM (ECMAScript Modules)
dotenv
JSON
Estructura del proyecto
backend-turnos-reservas/
│
├── data/
│   └── services.json
│
├── src/
│   ├── config/
│   │   └── env.config.js
│   │
│   └── managers/
│       └── ServiceManager.js
│
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── package-lock.json
Instalación

Para instalar el proyecto se debe clonar el repositorio y acceder a la carpeta del proyecto:

git  https://github.com/Moonleya/backend-turnos-reservas.git
cd backend-turnos-reservas

Luego instalar las dependencias:

npm install
Variables de entorno

El proyecto utiliza las siguientes variables de entorno:

Variable	Descripción	Ejemplo
PORT	Puerto utilizado por la aplicación	8080
NODE_ENV	Entorno de ejecución	development
Archivo .env

Para ejecutar el proyecto localmente se debe crear un archivo .env con:

PORT=8080
NODE_ENV=development

El archivo .env contiene información de configuración local y no debe ser subido al repositorio.

Archivo .env.example

El proyecto incluye un archivo .env.example como referencia:

PORT=
NODE_ENV=
Ejecución

Para ejecutar la aplicación:

node app.js

También puede utilizarse el script definido en package.json:

npm start

Si la configuración es correcta, la aplicación podrá cargar las variables de entorno y ejecutar las pruebas del ServiceManager.

Recurso services

El recurso services representa los servicios de desarrollo de software disponibles para el sistema de cotización.

Cada servicio tiene la siguiente estructura:

{
  id,
  name,
  description,
  duration,
  price,
  category,
  available
}
Campos
Campo	Descripción
id	Identificador único del servicio
name	Nombre del servicio
description	Descripción del servicio
duration	Duración estimada del servicio
price	Precio estimado del servicio
category	Categoría a la que pertenece
available	Indica si el servicio está disponible
ServiceManager

La clase ServiceManager permite administrar el recurso services.

Obtener todos los servicios
serviceManager.getServices();

Devuelve todos los servicios disponibles.

Obtener un servicio por ID
serviceManager.getServiceById(2);

Devuelve el servicio correspondiente al ID indicado.

Si el servicio no existe, devuelve null.

Crear un servicio
serviceManager.addService({
  name: "Desarrollo Backend",
  description: "Desarrollo de APIs y servicios backend",
  duration: 30,
  price: 1800000,
  category: "Desarrollo",
  available: true
});

El id se genera automáticamente y no debe enviarse como parte de los datos del servicio.

Los siguientes campos son obligatorios:

name
description
duration
price
category
available

Si falta alguno de estos campos, el método genera un error indicando cuál es el campo requerido.

Actualizar un servicio
serviceManager.updateService(2, {
  price: 4500000
});

Actualiza la información del servicio indicado.

El id no puede ser modificado.

Si el servicio no existe, el método devuelve null.

Eliminar un servicio
serviceManager.deleteService(2);

Elimina el servicio correspondiente al ID indicado.

Si el servicio no existe, devuelve null.

Ejemplo de uso
import { ServiceManager } from "./src/managers/ServiceManager.js";

const serviceManager = new ServiceManager();

// Consultar servicios
console.log(serviceManager.getServices());

// Consultar un servicio
console.log(serviceManager.getServiceById(2));

// Crear un servicio
console.log(
  serviceManager.addService({
    name: "Desarrollo Backend",
    description: "Desarrollo de APIs y servicios backend",
    duration: 30,
    price: 1800000,
    category: "Desarrollo",
    available: true
  })
);

// Actualizar un servicio
console.log(
  serviceManager.updateService(2, {
    price: 4500000
  })
);

// Eliminar un servicio
console.log(
  serviceManager.deleteService(2)
);
Consideraciones

Los cambios realizados mediante addService, updateService y deleteService se mantienen únicamente en memoria durante la ejecución de la aplicación.

El archivo services.json funciona como fuente inicial de datos. En futuras etapas del proyecto podrá ser reemplazado o complementado con una base de datos.

Autor :Leidy Johanna Achury 

Proyecto desarrollado como parte del curso de Backend.