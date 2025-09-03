import app from "./app";
import fs from "fs";
import https from "https";

const port = 3001;
const key = fs.readFileSync("certificates/key.pem");
const cert = fs.readFileSync("certificates/cert.pem");

https.createServer({ key, cert }, app).listen(port, "0.0.0.0", () => {
    console.log(`✅ Server rodando em https://0.0.0.0:${port}`);
});