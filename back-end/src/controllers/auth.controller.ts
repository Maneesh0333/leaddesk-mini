import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import AppError from "../utils/AppError.js";


export const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken({
      id: admin._id.toString(),
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token
      },
    });
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
);

export const me = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const admin = await Admin.findById(req.adminId).select("-password");

    if (!admin) {
      throw new AppError("Admin not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: {admin},
    });
  }
);