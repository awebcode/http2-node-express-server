import express from "express";
import http2 from "http2";
import fs from "fs";
const app = express();
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// Your API routes here
const options = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./csr.pem"),
};
const server = http2.createSecureServer({ ...options, allowHTTP1: true });
server.listen(5000, () => {
    console.log("HTTP/2 server listening on port 443");
});
