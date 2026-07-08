const http = require("http");
const fs = require("fs");

const pathToWrite = "./data.txt";

const app = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/data") {
    const writeStream = fs.createWriteStream(pathToWrite, {
      encoding: "utf8",
      flags: "w",
    });
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      console.log(` body Data : ${body}`);
      writeStream.write(body);
      writeStream.end();
      writeStream.on("finish", () => {
       
      });
      res.end(
        JSON.stringify({ message: "data written successful", data: body }),
      );
    });
  }
  if (req.method === "GET" && req.url === "/data") {
    const readStream = fs.createReadStream(pathToWrite, { encoding: "utf-8" });
    let body = "";
    readStream.on("data", (chunk) => {
      body += chunk;
    });
    readStream.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Data read successful", data: body }));
    });
  }
});

app.listen(6000, () => {
  console.log("the server is running on the port 6000");
});
