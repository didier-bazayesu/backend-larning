const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const { type } = require('os');



const server = http.createServer((req, res) => {

    console.log(req.url);
    console.log(_.random(0, 20));

    // 🔁 Redirect
    if (req.url === '/about-me') {
        res.setHeader('Location', '/about');
        res.writeHead(302);
        return res.end(); // ⛔ STOP HERE
    }

    // 📄 Choose file
    const path =
        req.url === '/' ? './view/index.html' :
        req.url === '/about' ? './view/about.html' :
        './view/404.html';

    fs.readFile(path, (error, data) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            return res.end("<h1>Internal Server Error</h1>");
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });

});

server.listen(5000, 'localhost', () => {
    console.log("the server is running");
});
