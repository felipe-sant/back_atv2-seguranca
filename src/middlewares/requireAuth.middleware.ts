import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import RefreshTokenService from "../services/RefreshToken.service";

export interface AuthRequest extends Request {
    user?: any;
}

export async function requireAuthMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) return res.status(401).json({ message: "Malformed token" });

    try {
        const payload = verifyAccessToken(token);
        req.user = payload;

        return next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
