import requireAuth from "../middleware/auth.js";
import * as blogController from '../controllers/blogController.js';
    import { Router } from "express"; 
// Example fix (assuming you export 'upload' from your multer utils):
import { upload } from '../util/uploader.js'


    const router = Router();
    router.get('/',requireAuth,blogController.listBlogs);
    router.get("/:id",requireAuth, blogController.getBlog);
    router.post("/", requireAuth, upload.single('image'), blogController.createBlog);
     router.put("/:id", requireAuth, upload.single('image'), blogController.updateBlog);
    router.delete('/:id', requireAuth, blogController.deleteBlog)

export default router ;
