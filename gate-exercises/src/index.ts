import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction } from 'express'
import { Response, Request } from 'express';
import Database from './config/DB.js';
import contactEndPoint from '../src/routes/contactRoutes.js'

function middleWare (req:Request, res:Response, next:NextFunction){
    const isLoggedIn = true ;
    if(!isLoggedIn){
        return res.status(401).json({message: "Un authorized"})
    }else{
        console.log({RequestHeader: req.header.length})
       return next()

    }

}
const server = express();


server.use('/',middleWare,(__,res)=>{
    res.status(201).json({
        message: "success"
    })
    console.log("Incoming request")
    
})
server.use('/contact',contactEndPoint)

server.listen(process.env["PORT"] || 4000, (req) => {
  console.log(`Server is running on http://localhost:${process.env["PORT"] || 4000} 🔥🚀 🔥🚀`);
});

Database()