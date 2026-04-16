const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    fs.readFile("./view/index.html",(error,information)=>{
        if(error) {
            console.log("An error occurred while reading the file:", error);
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.write("Internal Server Error");
            res.end();
        }
        else {
           if(req.url === "/"){
            res.write(information);
            res.end();
           } else if(req.url === "/about"){
            res.write("<h1>About Page</h1><p>This is the about page of our simple Node.js server.</p>");
            res.end();  
           }
        }
    })


    console.log(req.url);

})

server.listen(5000,'localhost',()=>{
    console.log("the server is running")
})