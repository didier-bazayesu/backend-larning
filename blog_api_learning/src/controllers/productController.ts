import Product from "../models/products.js";
import { Response, Request } from "express";

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, content, title } = req.body as {
      name: string;
      title: string;
      content: string;
    };

    // userId comes from JWT via requireAuth middleware
    const userId = req.userId
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!name || !content || !title)
      return res.status(400).json({ message: "All fields are required" });

    const createdProduct = await Product.create({
      name,
      content,
      title,
      userId, 
    });
    return res.status(201).json({ message: "Product created!", createdProduct });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// rest of your functions stay the same...
export async function allProducts(req: Request, res: Response) {
  try {
    const all = await Product.find().populate("userId", "name email");
    if (all.length === 0) return res.status(400).json({ message: "Not product found !" });
    return res.status(200).json(all);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    if (!id) return res.status(400).json({ message: "No product Id provided" });
    const existProduct = await Product.findById(id).populate(
     "userId", "name email"
    );
    if (!existProduct)
      return res.status(400).json({ message: "No product found!" });
    return res.status(200).json(existProduct);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong!" });
  }
}

export async function deleteOne(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    if (!id) return res.status(400).json({ message: "No product Id provided" });
    const existProduct = await Product.findByIdAndDelete(id);
    if (!existProduct)
      return res.status(400).json({ message: "No product found!" });
    return res
      .status(200)
      .json({ message: "Product deleted successfuly", existProduct });
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong!" });
  }
}
export async function editProduct(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    if (!id) return res.status(400).json({ message: "No product Id provided" });

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      },
    );
    if(!updatedProduct) return res.status(500).json({message: "No product found"})
    return res.status(200).json({message: "product Edited successfully",updatedProduct}) 
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong!" });
  }
}
