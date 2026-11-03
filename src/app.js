import express from "express";
import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js";

const app = express();

app.use(express.json());

// Rutas de servicios
app.use("/api/services", servicesRouter);

// Rutas de reservas
app.use("/api/bookings", bookingsRouter);

export default app;

