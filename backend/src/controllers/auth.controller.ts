import { Request, Response } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { success, error } from "../utils/ApiResponse";

const JWT_SECRET = process.env.JWT_SECRET! ;

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingAdmin = await prisma.admin.findUnique({ where: { email } });
  if (existingAdmin) return error(res, "Email already exists", 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: { email, password: hashedPassword },
  });

  return success(res, { id: admin.id, email: admin.email }, "Admin created");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return error(res, "Invalid email or password", 400);

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return error(res, "Invalid email or password", 400);

  const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return success(res, { token }, "Logged in successfully");
};

export const logout=async(req: Request,res: Response) => {
    return success(res,null,"Logged out successfully")
}