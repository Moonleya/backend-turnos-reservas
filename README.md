# Sistema de Cotización, Servicios y Reservas de Consultorías de Desarrollo de Software

## 1. Descripción del proyecto

Backend desarrollado con Node.js y Express para la gestión de servicios de desarrollo de software, cotizaciones y reservas de consultorías.

El sistema permite administrar los servicios disponibles, registrar clientes, crear reservas de consultoría y asociar diferentes servicios a cada reserva.

El proyecto utiliza archivos JSON como mecanismo inicial de almacenamiento de información, permitiendo gestionar los datos mediante operaciones CRUD y persistencia local.

Esta entrega amplía la funcionalidad inicial del proyecto mediante la implementación de una API REST para la gestión de reservas y su relación con los servicios contratados.

## 2. Tecnologías utilizadas

* Node.js
* JavaScript
* ECMAScript Modules (ESM)
* Express.js
* dotenv
* JSON
* Postman
* Visual Studio Code

## 3. Estructura del proyecto

```text
backend-turnos-reservas/
│
├── data/
│   ├── bookings.json
│   └── services.json
│
├── src/
│   ├── config/
│   │   └── env.config.js
│   │
│   ├── managers/
│   │   ├── ServiceManager.js
│   │   └── BookingManager.js
│   │
│   └── routes/
│       ├── services.router.js
│       └── bookings.router.js
│
├── .env
├── .env.example
├── .gitignore
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## 4. Instalación

Para instalar el proyecto, clonar el repositorio y acceder a la carpeta:

```bash
git clone https://github.com/Moonleya/backend-turnos-reservas.git

cd backend-turnos-reservas
```

Instalar las dependencias:

```bash
npm install
```

## 5. Variables de entorno

El proyecto utiliza variables de entorno para configurar la aplicación.

| Variable | Descripción          | Ejemplo     |
| -------- | -------------------- | ----------- |
| PORT     | Puerto de ejecución  | 8080        |
| NODE_ENV | Entorno de ejecución | development |

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080
NODE_ENV=development
```

El archivo `.env.example` contiene la estructura de referencia:

```env
PORT=
NODE_ENV=
```

El archivo `.env` contiene configuración local y no debe publicarse en el repositorio.

## 6. Ejecución del proyecto

Para iniciar el servidor:

```bash
npm start
```

La API estará disponible localmente en:

```text
http://localhost:8080
```

## 7. Módulo de servicios

El recurso `services` representa los servicios de desarrollo de software disponibles para el sistema de cotización.

Cada servicio tiene la siguiente estructura:

```json
{
  "id": 1,
  "name": "Desarrollo Backend",
  "description": "Desarrollo de APIs y servicios backend",
  "duration": 30,
  "price": 1800000,
  "category": "Desarrollo",
  "available": true
}
```

### Campos del servicio

| Campo       | Descripción                      |
| ----------- | -------------------------------- |
| id          | Identificador único del servicio |
| name        | Nombre del servicio              |
| description | Descripción del servicio         |
| duration    | Duración estimada del servicio   |
| price       | Precio estimado del servicio     |
| category    | Categoría del servicio           |
| available   | Disponibilidad del servicio      |

### Endpoints de servicios

| Método HTTP | Endpoint                            | Descripción                     |
| ----------- | ----------------------------------- | ------------------------------- |
| GET         | `/api/services`                     | Consultar todos los servicios   |
| GET         | `/api/services/:id`                 | Consultar un servicio por ID    |
| POST        | `/api/services`                     | Crear un nuevo servicio         |
| PUT         | `/api/services/:id`                 | Actualizar un servicio          |
| DELETE      | `/api/services/:id`                 | Eliminar un servicio            |
| GET         | `/api/services?category=Desarrollo` | Filtrar servicios por categoría |

### Ejemplo de creación de un servicio

**POST**

```text
/api/services
```

Body:

```json
{
  "name": "Desarrollo Backend",
  "description": "Desarrollo de APIs y servicios backend con Node.js",
  "duration": 30,
  "price": 1800000,
  "category": "Desarrollo",
  "available": true
}
```

El identificador del servicio se genera automáticamente.

## 8. Módulo de reservas (Bookings)

El recurso `bookings` permite registrar y administrar las reservas de consultoría realizadas por los clientes.

Cada reserva contiene información del cliente, fecha, hora, estado y los servicios asociados.

### Estructura de una reserva

```json
{
  "id": "804d0185-2690-409d-b143-b4fc1786bb14",
  "clientName": "Carlos Rodriguez",
  "clientEmail": "carlos@email.com",
  "date": "2026-11-15",
  "time": "10:00",
  "status": "pending",
  "services": [
    {
      "service": 4,
      "quantity": 3
    }
  ]
}
```

### Campos de la reserva

| Campo       | Descripción                                |
| ----------- | ------------------------------------------ |
| id          | Identificador único generado mediante UUID |
| clientName  | Nombre del cliente                         |
| clientEmail | Correo electrónico del cliente             |
| date        | Fecha de la reserva                        |
| time        | Hora de la reserva                         |
| status      | Estado de la reserva                       |
| services    | Lista de servicios asociados               |
| service     | Identificador del servicio                 |
| quantity    | Cantidad de unidades del servicio          |

### Validaciones

Al crear una reserva, el sistema verifica:

* Que el nombre del cliente sea obligatorio.
* Que el correo electrónico sea obligatorio.
* Que el formato del correo electrónico sea válido.
* Que la fecha sea proporcionada.
* Que la hora sea proporcionada.

El estado inicial de una reserva es `pending`, cuando no se especifica otro estado.

## 9. Endpoints de reservas

| Método HTTP | Endpoint                                | Descripción                       |
| ----------- | --------------------------------------- | --------------------------------- |
| POST        | `/api/bookings`                         | Crear una reserva                 |
| GET         | `/api/bookings`                         | Consultar todas las reservas      |
| GET         | `/api/bookings/:id`                     | Consultar una reserva por ID      |
| POST        | `/api/bookings/:id/services/:serviceId` | Agregar un servicio a una reserva |

### 9.1 Crear una reserva

**POST**

```text
/api/bookings
```

Body:

```json
{
  "clientName": "Carlos Rodriguez",
  "clientEmail": "carlos@email.com",
  "date": "2026-11-15",
  "time": "10:00"
}
```

Respuesta esperada: `201 Created`.

El sistema genera automáticamente un identificador UUID y asigna el estado inicial `pending`.

### 9.2 Consultar todas las reservas

**GET**

```text
/api/bookings
```

Permite obtener el listado de reservas registradas.

### 9.3 Consultar una reserva por identificador

**GET**

```text
/api/bookings/804d0185-2690-409d-b143-b4fc1786bb14
```

Permite consultar la información detallada de una reserva, incluyendo los servicios asociados.

### 9.4 Agregar un servicio a una reserva

**POST**

```text
/api/bookings/804d0185-2690-409d-b143-b4fc1786bb14/services/4
```

Body:

```json
{
  "quantity": 1
}
```

El identificador de la reserva y del servicio se envían mediante los parámetros de la URL.

La operación permite:

* Verificar que la reserva exista.
* Verificar que el servicio exista.
* Asociar el servicio a la reserva.
* Incrementar la cantidad cuando el servicio ya se encuentra asociado.

La cantidad se incrementa automáticamente en una unidad por cada solicitud exitosa.

Respuesta esperada: `200 OK`.

## 10. Administradores del sistema (Managers)

El proyecto utiliza clases independientes para separar la lógica de negocio de las rutas HTTP.

### ServiceManager

Encargado de administrar los servicios disponibles:

* Consultar servicios.
* Buscar servicios por identificador.
* Crear servicios.
* Actualizar servicios.
* Eliminar servicios.

### BookingManager

Encargado de administrar las reservas:

* Consultar todas las reservas.
* Guardar reservas.
* Crear reservas.
* Buscar reservas por identificador.
* Validar información del cliente.
* Asociar servicios a las reservas.
* Incrementar cantidades de servicios asociados.

## 11. Almacenamiento de información

El proyecto utiliza archivos JSON para almacenar la información:

| Archivo         | Información           |
| --------------- | --------------------- |
| `services.json` | Catálogo de servicios |
| `bookings.json` | Reservas registradas  |

La gestión de archivos se realiza mediante el módulo `node:fs/promises`, utilizando operaciones asíncronas de lectura y escritura.

Los datos de las reservas se almacenan de manera persistente en `bookings.json`.

El archivo `services.json` funciona como fuente de información para consultar los servicios disponibles.

Este mecanismo de almacenamiento corresponde a una etapa inicial del desarrollo. En futuras versiones podrá implementarse una base de datos para mejorar la escalabilidad y administración de la información.

## 12. Pruebas de la API

Las pruebas de los endpoints se realizan utilizando Postman.

Se validaron las siguientes operaciones:

| Módulo    | Operación                           | Resultado   |
| --------- | ----------------------------------- | ----------- |
| Servicios | Crear servicio (POST)               | 201 Created |
| Servicios | Actualizar servicio (PUT)           | 200 OK      |
| Servicios | Consultar por ID (GET)              | 200 OK      |
| Servicios | Filtrar por categoría (GET)         | 200 OK      |
| Reservas  | Consultar reserva por ID (GET)      | 200 OK      |
| Reservas  | Agregar servicio a reserva (POST)   | 200 OK      |
| Reservas  | Consultar reserva actualizada (GET) | 200 OK      |

Las pruebas permitieron verificar la creación de reservas, la asociación de servicios y la actualización de las cantidades correspondientes.

## 13. Consideraciones técnicas

* La aplicación utiliza módulos ESM.
* Las rutas están separadas por recursos.
* La lógica de negocio se encuentra encapsulada en las clases Manager.
* Se utiliza UUID para identificar las reservas.
* Las operaciones de lectura y escritura de archivos son asíncronas.
* Se implementan validaciones para los datos de entrada.
* Los errores se gestionan mediante bloques `try/catch` en las rutas.

## 14. Autor

**Leidy Johanna Achury**

Proyecto desarrollado como parte del curso de Backend.

**Repositorio:**
https://github.com/Moonleya/backend-turnos-reservas
