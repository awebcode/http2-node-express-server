import path from "path";
import express from "express";
import http2Express from "http2-express-bridge";
import spdy from "spdy";
import fs from "fs";
import { fileURLToPath } from "url";
import { config } from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config();
const PORT = process.env.PORT ?? 3000;
const CERT_DIR = `${__dirname}/cert`;
const useSSL = !!process.env.SSL;
const app = http2Express(express);
// app.use(http2Express);
app.get("/", (_, res) => {
    res.send("hello world");
});
function createServer() {
    if (!useSSL) {
        return app;
    }
    return spdy.createServer({
        key: fs.readFileSync(`${CERT_DIR}/server.key`),
        cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
    }, app);
}
const server = createServer();
server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log(`SSL ${useSSL ? "enabled" : "disabled"}`);
});
