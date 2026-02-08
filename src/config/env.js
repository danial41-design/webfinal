import dotenv from "dotenv";

export function loadEnv() {
    dotenv.config();
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in .env");
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing in .env");
}
