import { Router } from "express";
import createAllStudent from "../controller/contactController.js";

const router = Router()
router.post('/createUser', createAllStudent)


export default  router;

