# Sistema de Cotización, Servicios y Reservas de Consultorías de Desarrollo de Software

## 1. Descripción del proyecto

Backend desarrollado con Node.js y Express para la gestión de servicios de desarrollo de software, cotizaciones y reservas de consultorías.

El sistema permite administrar un catálogo de servicios, registrar clientes, crear reservas de consultoría, consultar las reservas existentes y asociar diferentes servicios a cada reserva.

El proyecto utiliza archivos JSON como mecanismo inicial de almacenamiento de información, permitiendo gestionar los datos mediante operaciones CRUD y persistencia local.

Esta entrega implementa una API REST con una arquitectura organizada en Routes, Controllers y Managers, separando las responsabilidades de enrutamiento, atención de solicitudes HTTP y lógica de negocio.

## 2. Tecnologías utilizadas

- Node.js
- JavaScript
- ECMAScript Modules (ESM)
- Express.js
- dotenv
- JSON
- Postman
- Visual Studio Code

## 3. Estructura del proyecto

El proyecto está organizado de la siguiente manera:

```text
backend-turnos-reservas/
│
├── src/
│   ├── config/
│   │   └── env.config.js
│   │
│   ├── controllers/
│   │   ├── services.controller.js
│   │   └── bookings.controller.js
│   │
│   ├── managers/
│   │   ├── ServiceManager.js
│   │   └── BookingManager.js
│   │
│   ├── routes/
│   │   ├── services.router.js
│   │   └── bookings.router.js
│   │
│   ├── data/
│   │   ├── services.json
│   │   └── bookings.json
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Arquitectura

La aplicación utiliza una separación por responsabilidades:

- **Routes:** definen los endpoints y conectan las solicitudes con sus respectivos Controllers.
- **Controllers:** reciben las solicitudes HTTP, extraen parámetros y datos del cuerpo de la petición, invocan los Managers y generan las respuestas.
- **Managers:** contienen la lógica de negocio y administran la lectura y escritura de los archivos JSON.
- **Config:** centraliza la configuración de las variables de entorno.
- **Data:** almacena la información persistente de servicios y reservas.
- **App:** configura Express y registra los Routers.
- **Server:** inicia el servidor utilizando la configuración del entorno.

## 4. Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Moonleya/backend-turnos-reservas.git
```

Ingresar a la carpeta del proyecto:

```bash
cd backend-turnos-reservas
```

Instalar las dependencias:

```bash
npm install
```

## 5. Variables de entorno

El proyecto utiliza variables de entorno para configurar la aplicación.

| Variable | Descripción | Ejemplo |
|---|---|---|
| PORT | Puerto de ejecución | 8080 |
| NODE_ENV | Entorno de ejecución | development |

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080
NODE_ENV=development
```

El archivo `.env.example` contiene la estructura de referencia para configurar el proyecto:

```env
PORT=8080
NODE_ENV=development
```

**Importante:** el archivo `.env` contiene configuración local y no debe publicarse en el repositorio. El archivo `.env.example` sí debe incluirse para facilitar la configuración de nuevos entornos.

## 6. Ejecución del proyecto

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Para iniciar el servidor en modo normal:

```bash
npm start
```

La API estará disponible localmente en:

```text
http://localhost:8080
```

Al iniciar correctamente, se mostrará el mensaje:

```text
Servidor ejecutándose en http://localhost:8080
```

## 7. Módulo de servicios

El recurso `services` representa los servicios de desarrollo de software disponibles para el sistema de cotización.

Cada servicio contiene la siguiente estructura:

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

| Campo | Descripción |
|---|---|
| id | Identificador único del servicio |
| name | Nombre del servicio |
| description | Descripción del servicio |
| duration | Duración estimada del servicio |
| price | Precio estimado del servicio |
| category | Categoría del servicio |
| available | Disponibilidad del servicio |

### 7.1 Endpoints de servicios

Todos los endpoints utilizan la ruta base:

`/api/services`

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| GET | `/api/services` | Consultar todos los servicios |
| GET | `/api/services/:sid` | Consultar un servicio por ID |
| POST | `/api/services` | Crear un nuevo servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

### 7.2 Ejemplo de creación de un servicio

**Método:** POST

**Endpoint:**

```text
http://localhost:8080/api/services
```

**Body (JSON):**

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

Respuesta esperada: `201 Created`.

## 8. Módulo de reservas (Bookings)

El recurso `bookings` permite registrar y administrar las reservas de consultoría realizadas por los clientes.

Cada reserva contiene información del cliente, fecha, hora, estado y los servicios asociados.

### 8.1 Estructura de una reserva

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

| Campo | Descripción |
|---|---|
| id | Identificador único generado mediante UUID |
| clientName | Nombre del cliente |
| clientEmail | Correo electrónico del cliente |
| date | Fecha de la reserva |
| time | Hora de la reserva |
| status | Estado de la reserva |
| services | Lista de servicios asociados |
| service | Identificador del servicio asociado |
| quantity | Cantidad de unidades del servicio |

### 8.2 Validaciones

Al crear una reserva, el sistema verifica:

- Que el nombre del cliente sea obligatorio.
- Que el correo electrónico sea obligatorio.
- Que el formato del correo electrónico sea válido.
- Que la fecha sea proporcionada.
- Que la hora sea proporcionada.

El estado inicial de una reserva es `pending`, cuando no se especifica otro estado.

## 9. Endpoints de reservas

Todos los endpoints utilizan la ruta base:

`/api/bookings`

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings` | Consultar todas las reservas |
| GET | `/api/bookings/:bid` | Consultar una reserva por ID |
| POST | `/api/bookings/:bid/services/:sid` | Agregar un servicio a una reserva |

### 9.1 Crear una reserva

**Método:** POST

**Endpoint:**

```text
http://localhost:8080/api/bookings
```

**Body (JSON):**

```json
{
  "clientName": "Carlos Rodriguez",
  "clientEmail": "carlos@email.com",
  "date": "2026-11-20",
  "time": "10:00"
}
```

Respuesta esperada: `201 Created`.

El sistema genera automáticamente un identificador UUID y asigna el estado inicial `pending`.

### 9.2 Consultar todas las reservas

**Método:** GET

**Endpoint:**

```text
http://localhost:8080/api/bookings
```

Permite obtener el listado completo de las reservas registradas en el sistema.

Respuesta esperada: `200 OK`.

La respuesta contiene un arreglo JSON con las reservas almacenadas, incluyendo los servicios asociados a cada una.

### 9.3 Consultar una reserva por identificador

**Método:** GET

**Endpoint:**

```text
http://localhost:8080/api/bookings/804d0185-2690-409d-b143-b4fc1786bb14
```

Permite consultar la información detallada de una reserva mediante su identificador UUID, incluyendo los servicios asociados y sus respectivas cantidades.

Respuestas esperadas:

- `200 OK`: reserva encontrada.
- `404 Not Found`: reserva no encontrada.

### 9.4 Agregar un servicio a una reserva

**Método:** POST

**Endpoint:**

```text
http://localhost:8080/api/bookings/804d0185-2690-409d-b143-b4fc1786bb14/services/4
```

Los identificadores de la reserva y del servicio se envían mediante los parámetros de la URL.

Esta operación permite:

- Verificar que la reserva exista.
- Verificar que el servicio exista mediante `ServiceManager`.
- Asociar el servicio a la reserva.
- Incrementar la cantidad cuando el servicio ya se encuentra asociado.

**Comportamiento de quantity:**

Cuando se agrega un servicio por primera vez a una reserva, el sistema lo registra con cantidad inicial de `1`.

Cuando se vuelve a agregar el mismo servicio a la misma reserva, la cantidad se incrementa automáticamente en una unidad por cada solicitud exitosa.

Ejemplo:

Primera solicitud:

```json
{
  "service": 1,
  "quantity": 1
}
```

Segunda solicitud del mismo servicio:

```json
{
  "service": 1,
  "quantity": 2
}
```

Tercera solicitud del mismo servicio:

```json
{
  "service": 1,
  "quantity": 3
}
```

No es necesario enviar un Body en esta petición, ya que el identificador del servicio se obtiene desde la URL y la cantidad se administra automáticamente.

Respuesta esperada: `200 OK`.

## 10. Administradores del sistema (Managers)

El proyecto utiliza clases independientes para separar la lógica de negocio de las rutas HTTP.

### ServiceManager

Encargado de administrar los servicios disponibles:

- Consultar todos los servicios.
- Buscar servicios por identificador.
- Crear servicios.
- Actualizar servicios.
- Eliminar servicios.
- Guardar los cambios en el archivo JSON.

### BookingManager

Encargado de administrar las reservas:

- Consultar todas las reservas.
- Guardar reservas.
- Crear reservas.
- Buscar reservas por identificador.
- Validar información del cliente.
- Asociar servicios a las reservas.
- Incrementar cantidades de servicios asociados.
- Actualizar la información de las reservas.

Los Managers no gestionan directamente las solicitudes HTTP. Esta responsabilidad corresponde a los Controllers.

## 11. Almacenamiento de información

El proyecto utiliza archivos JSON para almacenar la información:

| Archivo | Información |
|---|---|
| `services.json` | Catálogo de servicios |
| `bookings.json` | Reservas registradas |

La gestión de archivos se realiza mediante el módulo `node:fs/promises`, utilizando operaciones asíncronas de lectura y escritura.

Los datos de las reservas se almacenan de manera persistente en `bookings.json`.

El archivo `services.json` funciona como fuente de información para consultar y administrar los servicios disponibles.

Este mecanismo de almacenamiento corresponde a una etapa inicial del desarrollo. En futuras versiones podrá implementarse una base de datos para mejorar la escalabilidad y administración de la información.

## 12. Pruebas de la API

Las pruebas de los endpoints se realizan utilizando Postman.

Se validaron las siguientes operaciones:

| Módulo | Operación | Resultado |
|---|---|---|
| Servicios | Consultar todos los servicios (GET) | 200 OK |
| Servicios | Consultar servicio por ID (GET) | 200 OK |
| Servicios | Crear servicio (POST) | 201 Created |
| Servicios | Actualizar servicio (PUT) | 200 OK |
| Servicios | Eliminar servicio (DELETE) | 200 OK |
| Reservas | Crear reserva (POST) | 201 Created |
| Reservas | Consultar todas las reservas (GET) | 200 OK |
| Reservas | Consultar reserva por ID (GET) | 200 OK |
| Reservas | Agregar servicio a reserva (POST) | 200 OK |
| Reservas | Verificar incremento de quantity | Correcto |
| Reservas | Verificar persistencia de información | Correcto |

Las pruebas permitieron verificar el flujo completo de gestión de reservas:

1. Crear un servicio.
2. Crear una reserva.
3. Agregar un servicio existente a la reserva.
4. Agregar nuevamente el mismo servicio y verificar el incremento de la cantidad.
5. Consultar todas las reservas.
6. Consultar una reserva específica por su identificador.

Las pruebas permitieron comprobar la comunicación entre Routes, Controllers y Managers, así como la persistencia de la información en los archivos JSON.

## 13. Consideraciones técnicas

- La aplicación utiliza módulos ECMAScript (ESM).
- Las rutas están separadas por recursos.
- Los Controllers gestionan las solicitudes y respuestas HTTP.
- La lógica de negocio se encuentra encapsulada en las clases Manager.
- Se utiliza UUID para identificar las reservas.
- Las operaciones de lectura y escritura de archivos son asíncronas.
- Se implementan validaciones para los datos de entrada.
- Se utilizan códigos de estado HTTP para identificar los resultados de las operaciones.
- Se verifica la existencia del servicio antes de asociarlo a una reserva.
- La cantidad de un servicio asociado se incrementa automáticamente cuando se agrega nuevamente.

## 14. Autor

**Leidy Johanna Achury**

Proyecto desarrollado como parte del curso de Backend.

**Repositorio:**

https://github.com/Moonleya/backend-turnos-reservas