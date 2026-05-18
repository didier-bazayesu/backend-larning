const { json } = require('body-parser');
const express = require('express')
const cors = require('cors')
const Http = require('http')
const sendResponse = require('./utilis/sendResponse')
const filteredData = require('./utilis/filteredData')

const server = express();
server.use(cors());
server.get('/', async (req,res)=>{
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify({message: "Welcome to the API. Use the /api endpoint to get the data."}))
})

server.get('/api', async (req, res) => {
    const queries = req.query;
    console.log(queries);
    sendResponse(res, await filteredData(queries));
    
    //using URL constructor to parse the url and get the query parameters
     const urlObj = new URL(req.url, `http://${req.headers.host}`)
     console.log(urlObj.searchParams.get('continent'), urlObj.searchParams.get('country'))
    
});

server.use((_,res)=>{
   res.status(404).end(JSON.stringify({error: "not found", message: "The requested route does not exist"}))
})

server.listen(8000,()=>{
  console.log("app is running on the port 8000")
})