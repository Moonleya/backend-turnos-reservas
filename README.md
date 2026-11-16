# Sistema de Cotización, Servicios y Reservas de Consultorías de Desarrollo de Software

## 1. Descripción del proyecto

Backend desarrollado con Node.js y Express para la gestión de servicios de desarrollo de software, cotizaciones y reservas de consultorías.

El sistema permite administrar un catálogo de servicios, registrar clientes, crear reservas de consultoría, consultar reservas existentes y asociar diferentes servicios a cada reserva.

El proyecto utiliza archivos JSON como mecanismo inicial de almacenamiento de información, permitiendo gestionar los datos mediante operaciones CRUD y persistencia local.

Esta entrega implementa una API REST con arquitectura en capas, incorporando los patrones DAO (Data Access Object) y Repository para separar las responsabilidades de acceso a datos, lógica de negocio y atención de solicitudes HTTP.

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
│   ├── services/
│   │   ├── services.service.js
│   │   └── bookings.service.js
│   │
│   ├── repositories/
│   │   ├── services.repository.js
│   │   └── bookings.repository.js
│   │
│   ├── dao/
│   │   ├── services.dao.js
│   │   └── bookings.dao.js
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


### 3.1 Arquitectura en capas

La aplicación implementa el siguiente flujo de ejecución:

**Router → Controller → Service → Repository → DAO → Archivo JSON**

Cada capa tiene una responsabilidad específica:

- **Routes:** definen los endpoints y conectan las solicitudes con sus respectivos Controllers.
- **Controllers:** reciben las solicitudes HTTP, extraen parámetros y datos del cuerpo de la petición, invocan los Services y generan las respuestas.
- **Services:** contienen la lógica de negocio, validaciones y reglas de funcionamiento de la aplicación.
- **Repositories:** actúan como intermediarios entre los Services y los DAO, centralizando las operaciones de acceso a datos.
- **DAO:** gestionan directamente la lectura, escritura, consulta, actualización y eliminación de información en los archivos JSON.
- **Config:** centraliza la configuración de las variables de entorno.
- **Data:** almacena la información persistente de servicios y reservas.
- **App:** configura Express y registra los Routers.
- **Server:** inicia el servidor utilizando la configuración del entorno.

### 3.2 Patrón DAO y Repository

El patrón DAO permite encapsular el acceso directo a los archivos JSON, evitando que las demás capas tengan que conocer los detalles de almacenamiento.

El patrón Repository proporciona una interfaz de acceso a los datos para los Services, manteniendo desacoplada la lógica de negocio del mecanismo de persistencia.

Esta separación facilita el mantenimiento, las pruebas y una futura migración hacia una base de datos.

## 4. Instalación

Clonar el repositorio:


git clone https://github.com/Moonleya/backend-turnos-reservas.git


Ingresar a la carpeta del proyecto:


cd backend-turnos-reservas


Instalar las dependencias:


npm install


## 5. Variables de entorno

El proyecto utiliza variables de entorno para configurar la aplicación.

| Variable | Descripción | Ejemplo |
|---|---|---|
| PORT | Puerto de ejecución | 8080 |
| NODE_ENV | Entorno de ejecución | development |

Crear un archivo `.env` en la raíz del proyecto:

env
PORT=8080
NODE_ENV=development


El archivo `.env.example` contiene la estructura de referencia para configurar el proyecto:

env
PORT=8080
NODE_ENV=development


**Importante:** el archivo `.env` contiene configuración local y no debe publicarse en el repositorio. El archivo `.env.example` sí debe incluirse para facilitar la configuración de nuevos entornos.

## 6. Ejecución del proyecto

Para iniciar el servidor en modo desarrollo:

bash
npm run dev


Para iniciar el servidor en modo normal:

bash
npm start


La API estará disponible localmente en:


http://localhost:8080


Al iniciar correctamente, se mostrará el mensaje:
Servidor ejecutándose en http://localhost:8080


## 7. Módulo de servicios

El recurso `services` representa los servicios de desarrollo de software disponibles para el sistema de cotización.

Cada servicio contiene la siguiente estructura:


{
    "id": 1,
    "name": "Desarrollo Backend",
    "description": "Desarrollo de APIs y servicios backend",
    "duration": 30,
    "price": 1800000,
    "category": "Desarrollo",
    "available": true
}


### 7.1 Campos del servicio

| Campo | Descripción |
|---|---|
| id | Identificador único del servicio |
| name | Nombre del servicio |
| description | Descripción del servicio |
| duration | Duración estimada del servicio |
| price | Precio estimado del servicio |
| category | Categoría del servicio |
| available | Disponibilidad del servicio |

### 7.2 Endpoints de servicios

Ruta base: `/api/services`

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| GET | `/api/services` | Consultar todos los servicios |
| GET | `/api/services/:sid` | Consultar un servicio por ID |
| POST | `/api/services` | Crear un nuevo servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

### 7.3 Ejemplo de creación de un servicio

**Método:** POST

**Endpoint:**


http://localhost:8080/api/services


**Body (JSON):**


{
    "name": "Desarrollo Backend",
    "description": "Desarrollo de APIs y servicios backend con Node.js",
    "duration": 30,
    "price": 1800000,
    "category": "Desarrollo",
    "available": true
}


El identificador del servicio se genera automáticamente.

Respuesta esperada: `201 Created`.

### 7.4 Validaciones de servicios

Al crear un servicio, el sistema verifica que los siguientes campos sean obligatorios:

- name
- description
- duration
- price
- category
- available

Si falta alguno de estos campos, la API devuelve una respuesta `400 Bad Request`.

## 8. Módulo de reservas (Bookings)

El recurso `bookings` permite registrar reservas de consultoría realizadas por los clientes.

Cada reserva contiene información del cliente, fecha, hora, estado y los servicios asociados.

### 8.1 Estructura de una reserva


{
    "id": "804d0185-2690-409d-b143-b4fc1786bb14",
    "clientName": "Carlos Rodriguez",
    "clientEmail": "carlos@email.com",
    "date": "2026-12-10",
    "time": "10:00",
    "status": "pending",
    "services": [
        {
            "service": 1,
            "quantity": 2
        }
    ]
}


### 8.2 Campos de la reserva

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

### 8.3 Validaciones de reservas

Al crear una reserva, el sistema verifica:

- Que el nombre del cliente sea obligatorio.
- Que el correo electrónico sea obligatorio.
- Que el formato del correo electrónico sea válido.
- Que la fecha sea proporcionada.
- Que la hora sea proporcionada.
- Que el estado corresponda a uno de los valores permitidos: `pending`, `confirmed` o `cancelled`.

Cuando no se especifica un estado, el sistema asigna automáticamente `pending`.

El identificador de la reserva se genera mediante UUID.

## 9. Endpoints de reservas

Ruta base: `/api/bookings`

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings/:bid` | Consultar una reserva por ID |
| POST | `/api/bookings/:bid/services/:sid` | Agregar un servicio a una reserva |

### 9.1 Crear una reserva

**Método:** POST

**Endpoint:**


http://localhost:8080/api/bookings


**Body (JSON):**

{
    "clientName": "Carlos Rodriguez",
    "clientEmail": "carlos@email.com",
    "date": "2026-12-10",
    "time": "10:00",
    "status": "pending"
}


Respuesta esperada: `201 Created`.

El sistema genera automáticamente un identificador UUID y asigna el estado inicial `pending` cuando no se proporciona otro estado.

### 9.2 Consultar una reserva por identificador

**Método:** GET

**Endpoint:**


http://localhost:8080/api/bookings/804d0185-2690-409d-b143-b4fc1786bb14


Permite consultar la información detallada de una reserva mediante su identificador UUID, incluyendo los servicios asociados y sus respectivas cantidades.

Respuestas esperadas:
- `200 OK`: reserva encontrada.
- `404 Not Found`: reserva no encontrada.

### 9.3 Agregar un servicio a una reserva

**Método:** POST

**Endpoint:**


http://localhost:8080/api/bookings/804d0185-2690-409d-b143-b4fc1786bb14/services/1


Los identificadores de la reserva y del servicio se envían mediante los parámetros de la URL.

Esta operación permite:

- Verificar que la reserva exista.
- Verificar que el servicio exista.
- Asociar el servicio a la reserva.
- Incrementar la cantidad cuando el servicio ya se encuentra asociado.

**Comportamiento de quantity:**

Cuando se agrega un servicio por primera vez a una reserva, el sistema lo registra con cantidad inicial de `1`.

Cuando se vuelve a agregar el mismo servicio a la misma reserva, la cantidad se incrementa automáticamente en una unidad por cada solicitud exitosa.

Primera solicitud:


{
    "service": 1,
    "quantity": 1
}


Segunda solicitud del mismo servicio:


{
    "service": 1,
    "quantity": 2
}


Tercera solicitud del mismo servicio:


{
    "service": 1,
    "quantity": 3
}


No es necesario enviar un Body en esta petición, ya que el identificador del servicio se obtiene desde la URL y la cantidad se administra automáticamente.

La validación de existencia de la reserva, existencia del servicio y el incremento de `quantity` se implementan en la capa `BookingsService`.

Respuesta esperada: `200 OK`.

## 10. Arquitectura y responsabilidades de las capas

### Services

Contienen las reglas de negocio de cada módulo.

**ServicesService:**

- Consultar todos los servicios.
- Consultar un servicio por identificador.
- Crear servicios.
- Actualizar servicios.
- Eliminar servicios.
- Validar los campos obligatorios al crear un servicio.

**BookingsService:**

- Crear reservas.
- Validar los datos del cliente.
- Validar el correo electrónico.
- Asignar el estado inicial de la reserva.
- Consultar reservas por identificador.
- Verificar la existencia de servicios antes de asociarlos.
- Asociar servicios a las reservas.
- Incrementar las cantidades de servicios asociados.

### Repositories

Actúan como intermediarios entre Services y DAO.

**ServicesRepository:**

Gestiona las operaciones de consulta, creación, actualización y eliminación de servicios mediante `ServicesDAO`.

**BookingsRepository:**

Gestiona las operaciones de creación, consulta y actualización de reservas mediante `BookingsDAO`.

### DAO

Encapsulan las operaciones de persistencia en los archivos JSON.

**ServicesDAO:**

- Consultar todos los servicios.
- Consultar un servicio por identificador.
- Crear servicios.
- Actualizar servicios.
- Eliminar servicios.

**BookingsDAO:**

- Crear reservas.
- Consultar reservas por identificador.
- Actualizar reservas.

Los DAO se encargan exclusivamente del acceso y persistencia de los datos, sin implementar reglas de negocio.

## 11. Almacenamiento de información

El proyecto utiliza archivos JSON para almacenar la información:

| Archivo | Información |
|---|---|
| `services.json` | Catálogo de servicios |
| `bookings.json` | Reservas registradas |

La gestión de archivos se realiza mediante el módulo `node:fs/promises`, utilizando operaciones asíncronas de lectura y escritura.

Los datos se almacenan de manera persistente en los respectivos archivos JSON.

Este mecanismo de almacenamiento corresponde a una etapa inicial del desarrollo. En futuras versiones podrá implementarse una base de datos para mejorar la escalabilidad y administración de la información.

## 12. Pruebas de la API

Las pruebas de los endpoints se realizan utilizando Postman.

Se realizaron pruebas funcionales para verificar las operaciones de servicios y reservas, así como las validaciones y la persistencia de información.

| Módulo | Operación | Resultado |
|---|---|---|
| Servicios | Consultar todos los servicios (GET) | 200 OK |
| Servicios | Consultar servicio por ID (GET) | 200 OK |
| Servicios | Crear servicio (POST) | 201 Created |
| Servicios | Validar campos obligatorios | 400 Bad Request |
| Servicios | Actualizar servicio (PUT) | 200 OK |
| Servicios | Eliminar servicio (DELETE) | 200 OK |
| Servicios | Consultar servicio eliminado | 404 Not Found |
| Reservas | Crear reserva (POST) | 201 Created |
| Reservas | Consultar reserva por ID (GET) | 200 OK |
| Reservas | Agregar servicio a reserva (POST) | 200 OK |
| Reservas | Verificar incremento de quantity | Correcto |
| Reservas | Agregar servicio inexistente | 404 Not Found |
| Reservas | Agregar servicio a reserva inexistente | 404 Not Found |

Adicionalmente, después de retirar los antiguos Managers, se reinició el servidor y se verificó nuevamente:

- La consulta de todos los servicios.
- La consulta de una reserva por UUID.
- La persistencia del servicio asociado con `quantity: 2`.

Estas pruebas permitieron comprobar que la nueva arquitectura funciona sin depender de las clases Manager anteriores.

## 13. Consideraciones técnicas

- La aplicación utiliza módulos ECMAScript (ESM).
- Las rutas están separadas por recursos.
- Los Controllers gestionan las solicitudes y respuestas HTTP.
- La lógica de negocio se encuentra encapsulada en la capa Services.
- Los Repositories desacoplan los Services del acceso directo a datos.
- Los DAO administran la persistencia en archivos JSON.
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