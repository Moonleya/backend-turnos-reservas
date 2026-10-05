import dotenv from "dotenv";
dotenv.config();
const requiredEnvVars = ["PORT", "NODE_ENV"];

for (const variable of requiredEnvVars) {
    if (!process.env[variable]) {
        throw new Error(`Falta la variable de entorno requerida: ${variable}`);
    }
}
export const env = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV
};