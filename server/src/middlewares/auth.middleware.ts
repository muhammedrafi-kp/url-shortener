import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, HTTP_MESSAGE } from "../constants/http";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { JwtUserPayload } from "../types/express";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.cookie

        if (!token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: HTTP_MESSAGE.UNAUTHORIZED });
        }

        const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET as string) as JwtUserPayload;

        req.user = decoded;

        if (!req.user.userId) {
           return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: HTTP_MESSAGE.UNAUTHORIZED });
        }

        console.log("decoded :", decoded);
        next();


    } catch (error: any) {
        console.log("JWT Error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: HTTP_MESSAGE.TOKEN_EXPIRED });
        }

        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: error.message || HTTP_MESSAGE.UNAUTHORIZED });
    }
}

function extractBearerToken(authHeader?: string): string | null {
    return authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
}