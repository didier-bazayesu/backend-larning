import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

// Register a new user in the database
 async function register(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body as {
            name: string;
            email: string;
            password: string;
        };

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: passwordHash,
        });

        const token = jwt.sign(
            { userId: user._id },
            (process.env["JWT_SECRET"] as string) || "",
            { expiresIn: "3d" }
        );

        return res.status(201).json({ token, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
 async function login(req: Request, res: Response) {
     try{
        const {email, password} = req.body as { email : string , password: string }
        if(!email || !password){
            return res.status(4004).json({message : "All fields are required"})
        }

        const user = await User.findOne({
            email
        })
        if(!user){ return res.status(400).json({message : "Invalid credentials"}) }

        const ok = await bcrypt.compare(password, user.password)
        if(!ok) { return res.status(401).json({message : "Invalid credentials"}) }

        const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, process.env["JWT_SECRET"] as string, { expiresIn: "3d" });

        return res.status(200).json({ token, user });

     }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
     }
}

export default {
    register,
    login
}


