// src/utils/jwt.ts
import * as jwt from "jsonwebtoken";

const ACCESS_SECRET: jwt.Secret = process.env.JWT_ACCESS_SECRET || "fallback_access_secret";
const REFRESH_SECRET: jwt.Secret = process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret";
const ACCESS_EXP = "15m";
const REFRESH_EXP = "7d";

export function generateAccessToken(payload: jwt.JwtPayload | string | Buffer): string {
  const options: jwt.SignOptions = { expiresIn: ACCESS_EXP };
  return jwt.sign(payload as jwt.JwtPayload, ACCESS_SECRET, options);
}

export function generateRefreshToken(payload: jwt.JwtPayload | string | Buffer): string {
  const options: jwt.SignOptions = { expiresIn: REFRESH_EXP };
  return jwt.sign(payload as jwt.JwtPayload, REFRESH_SECRET, options);
}

export function verifyAccessToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, ACCESS_SECRET) as jwt.JwtPayload;
}

export function verifyRefreshToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, REFRESH_SECRET) as jwt.JwtPayload;
}