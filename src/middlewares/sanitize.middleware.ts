import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

function sanitizeObject(obj: any): any {
    if (typeof obj === "string") {
        return sanitizeHtml(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
    }

    if (typeof obj === "object" && obj !== null) {
        const sanitized: Record<string, any> = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                sanitized[key] = sanitizeObject(obj[key]);
            }
        }
        return sanitized;
    }

    return obj;
}

export function sanitizeMiddleware(req: Request, _res: Response, next: NextFunction) {
    if (req.body) {
        req.body = sanitizeObject(req.body);
    }
    if (req.query) {
        req.query = sanitizeObject(req.query);
    }
    if (req.params) {
        req.params = sanitizeObject(req.params);
    }
    next();
}
