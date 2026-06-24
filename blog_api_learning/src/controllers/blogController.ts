import Blog from "../models/Blog.js";
import type { Response } from "express";
import type { Request } from "express";
export async function createBlog(req: Request, res: Response) {
  try {
    const { title, content } = req.body as { title: string; content: string };
    if (!title || !content)
      return res.status(400).json({ message: "Missing fields" });

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const blogData: {
      title: string;
      content: string;
      author: string;
      imageUrl?: string;
    } = {
      title,
      content,
      author: req.userId!,
      ...(imageUrl ? { imageUrl } : {}),
    };
    const blog = await Blog.create(blogData);
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export async function listBlogs(req: Request, res: Response) {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    return res.status(201).json(blogs);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

//get blog by id
export async function getBlog(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const blog = await Blog.findById(id).populate("author", "name email");
    if (!blog) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

//updating the blog

export async function updateBlog(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const blog = await Blog.findById(id);
    if (!blog) return res.status(400).json({ message: "the author not found" });
    if (blog.author.toString() !== req.userId)
      return res.status(403).json({ message: "Forbidden" });
    const { title, content } = req.body as { title: String; content: String };
    // Correct updateBlog logic:
    if (typeof title === "string") blog.title = title;
    if (typeof content === "string") blog.content = content;
    if (req.file) {
      blog.imageUrl = `/uploads/${req.file.filename}`;
    }
    await blog.save(); // Save no matter what was updated
    return res.status(200).json({ blog });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

//delete blog
export async function deleteBlog(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) return res.status(400).json({ message: "Author not found!" });

  return res.status(200).json({ message: "User Deleted", blog });
}
export default {
  createBlog,
  listBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
