import Router from "express";
import authController from "../controllers/authController.js";

const router = Router();
/**
 * @swagger
 * @openapi: 3.0.0
 * info:
 *  title: Blog API
 * version: 1.0.0
 * description: A simple Blog API application
 * servers:
 * - url: http://localhost:3000
 * security:
 *   - bearerAuth: []
 * components:  
 *  securitySchemes:
 *  
 *  
 *  
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */
router.post("/register", authController.register);

/**
    * @swagger
    * @openapi: 3.0.0
    * info:
    *  title: Blog API
    * version: 1.0.0
    *        
 */
router.post("/login", authController.login);

export default router;
