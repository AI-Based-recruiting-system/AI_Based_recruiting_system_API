import path from 'path';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb:any ) => {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'jobs');
    console.log("iam called")
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb:any) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  },
});

function fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
}

const limits = {
  fileSize: 5 * 1024 * 1024,
};

export const upload = multer({ storage, fileFilter, limits }).single('image');
