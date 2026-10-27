import express from "express";
import { env } from "./src/config/env.config.js";
import servicesRouter from "./src/routes/services.router.js";

const app = express();

app.use(express.json());

app.use("/api/services", servicesRouter);

app.listen(env.port, () => {
console.log(`Servidor ejecutándose en http://localhost:${env.port}`);
});

