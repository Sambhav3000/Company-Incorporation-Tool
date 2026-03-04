import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import { error } from "../utils/ApiResponse";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_here";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return error(res, "Authorization header missing", 401);

  const token = authHeader.split(" ")[1];
  if (!token) return error(res, "Token missing", 401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    const admin = await prisma.admin.findUnique({ where: { id: decoded.id } });
    if (!admin) return error(res, "Admin not found", 401);

    (req as any).admin = admin; // attach admin to request
    next();
  } catch (err) {
    return error(res, "Invalid token", 401);
  }
};