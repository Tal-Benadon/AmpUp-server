import jwt from "jsonwebtoken";
import UserAuth from "./UserAuth";
const JWT_SECRET = process.env.JWT_SECRET as string;

// פונקציית יצירת טוקן
export default function createToken(data: UserAuth) {
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
    return token;
}