import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import createToken from "./createToken";
import UserAuth from "./UserAuth";
import Permission from "../types/Permission";
import UserController from "../controllers/UserController";
const JWT_SECRET = process.env.JWT_SECRET as string;

// טוקן זמני לעכשיו
export const temporaryToken = createToken({ userId: "6656df1b8437151db0cce4e2", userPermission: "user" });

// console.log("temporaryToken: ", temporaryToken);

// middleware - token to user
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization || temporaryToken;
        if (!authHeader) {
            return res.status(401).send('Unauthorized');
        }


        const token = authHeader.replace("Bearer ", "");
        const decoded = jwt.verify(token, JWT_SECRET) as UserAuth;

        const user: UserAuth = {
            userId: decoded.userId,
            userPermission: decoded.userPermission as Permission,
        }

        req.body = { ...req.body, ...user };

        next();

    } catch (error) {
        console.error(error)
        res.status(401).send("Unauthorized");
    }
}
export { createToken };

