import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

// Fixed filter
function imageFilter(_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Not an image! Please upload an image.')); // Reject
    }
}

// You MUST export this so your routes can use it!
export const upload = multer({ storage, fileFilter: imageFilter });