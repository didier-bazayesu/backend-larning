import { Request, Response } from "express";
import mongoose from "mongoose";
import StudentInformation from "../model/student_info.js";


export default async function createAllStudent  (req:Request, res:Response){
  try{
    const {name , email , phoneNumber } = req.body as {name: string, email:string, phoneNumber : number}
    const createUser = await StudentInformation.create({
        name , email , phoneNumber
    })
    if(!createUser) return res.status(400).json({message: "User in not created!"})
    return res.json({message: "User created!", data: createUser})
  }catch(err){
    console.log(err)
  }

}

