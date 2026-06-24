import { Router } from "express";
import {createProduct, allProducts, deleteOne, findOne ,editProduct} from "../controllers/productController.js";
import requireAuth from "../middleware/auth.js";

const router = Router();

router.get('/',allProducts)
router.get('/:id', findOne)
router.post('/',requireAuth,createProduct)
router.patch('/:id',requireAuth,editProduct)
router.delete('/:id',requireAuth,deleteOne)

export default router ;