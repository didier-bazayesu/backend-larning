const { json } = require('body-parser');
const express = require('express')
const getDataFromDb =require('./database/db');
const Http = require('http')
const sendResponse = require('./utilis/sendResponse')
const filteredData = require('./utilis/filteredData')

   

const serverInfo ={
  name : `didier'server` ,
  port : 8000,
}

const server = express();
server.get('/', async (req,res)=>{
  res.writeHead(200, {'Content-Type': 'application/json'})
  const data = await getDataFromDb()
  sendResponse(res, data)
})

server.get('/api/continents/:continents',async(req,res)=>{
   const continent = req.params.continents;
   console.log(continent)
   sendResponse(res,await filteredData(continent))
})

server.get('/api', async (req, res) => {

    const queries = req.query;
    console.log(queries);
    sendResponse(res, await filteredData(queries.continent, queries.country));
});


server.get('/api/countries/:country',async(req,res)=>{
  const country = req.params.country;
  sendResponse(res,await filteredData(country));
})

server.use((_,res)=>{
   res.status(404).end(JSON.stringify({error: "not found", message: "The requested route does not exist"}))
})

server.listen(8000,()=>{
  console.log("app is running on the port 8000")
})