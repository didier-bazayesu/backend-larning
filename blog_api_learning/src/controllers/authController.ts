import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

// Register a new user in the database
 async function register(req: Request, res: Response) {
        console.log("==> register hit, body:", req.body); 
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
        let user;
        try {
            user = await User.create({
                name,
                email,
                password: passwordHash,
            });
        } catch (dbErr) {
            console.error('Error creating user in DB:', dbErr);
            return res.status(500).json({ message: 'Database error while creating user' });
        }

        const jwtSecret = process.env["JWT_SECRET"] as string | undefined;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined')
            return res.status(500).json({ message: "Server configuration error: JWT_SECRET not set" });
        }

        const token = jwt.sign(
            { userId: user._id },
            jwtSecret,
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
            return res.status(400).json({message : "All fields are required"})
        }

        const user = await User.findOne({
            email
        })
        if(!user){ return res.status(400).json({message : "Invalid credentials"}) }

        const ok = await bcrypt.compare(password, user.password)
        if(!ok) { return res.status(401).json({message : "Invalid credentials"}) }

        const jwtSecret = process.env["JWT_SECRET"] as string | undefined;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined')
            return res.status(500).json({ message: "Server configuration error: JWT_SECRET not set" });
        }

        const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, jwtSecret, { expiresIn: "3d" });

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


