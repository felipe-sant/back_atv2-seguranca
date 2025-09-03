import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config({ debug: false });

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

client.connect()
    .then(() => console.log("🟢 Conectado ao PostgreSQL com sucesso!"))
    .catch((err: unknown) => console.error("🔴 Erro ao conectar:", err));

export default client;