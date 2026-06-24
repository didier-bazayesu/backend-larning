import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Tell TypeScript to merge this into the global Express namespace
declare global {
    namespace Express {
        interface Request {
            userId?: string; // Make it optional since not all routes are authenticated
        }
    }
}

export function requireAuth (req: Request, res: Response, next: NextFunction): Response | void {
    try {
        const header = req.headers['authorization'];
        if (!header) return res.status(401).json({ message: "Authorization header missing" });
        
        const token = header.slice("Bearer ".length);
        const secret = process.env["JWT_SECRET"];
        if (!secret) return res.status(500).json({ message: "JWT secret not configured" });

        const payload = jwt.verify(token, secret) as { userId: string };
        req.userId = payload.userId; // TS now knows this is totally fine
        return next();
    } catch (err) {
       return res.status(401).json({ message: "Unauthorized user" });
    }
}

export default requireAuth;