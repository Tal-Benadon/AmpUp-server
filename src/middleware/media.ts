import fs from "fs";
import multer, { Multer } from "multer";
import { Request } from 'express';

const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        const uploadPath: string = './files';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, file.originalname);
    }
});

// Custom file filter function to allow only image files
const imageFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    // Check if file type is an image
    if (file.mimetype.startsWith('image/')) {
        callback(null, true); // Accept the file
    } else {
        callback(new Error('Only images are allowed!')); // Reject the file
    }
};
// Initialize multer with custom file filter
export const uploadImageFS: Multer = multer({
    storage: storage,
    fileFilter: imageFilter // Apply custom file filter
});

export const uploadAnyFileFS: Multer = multer({
    storage: storage,
});
