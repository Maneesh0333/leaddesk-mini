import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import Lead from "../models/Lead.js";
import AppError from "../utils/AppError.js";

export const createLead = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, budget, message } = req.body;

    if (!name || !email || !budget || !message) {
      throw new AppError("All fields are required", 400);
    }

    const existingLead = await Lead.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingLead) {
      throw new AppError("A lead with this email already exists", 409);
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      budget,
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      data: lead,
    });
  }
);

export const getLeads = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const search = req.query.search?.toString().trim();

    const query = search
      ? {
          $or: [
            {
              name: {
                $regex: search,
                $options: "i",
              },
            },
            {
              email: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const leads = await Lead.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: {
        count: leads.length,
        leads,
      },
    });
  }
);

export const updateLeadStatus = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { status } = req.body;

    if (!status) {
      throw new AppError("Status is required", 400);
    }

    const allowedStatuses = ["New", "Contacted", "Closed"];

    if (!allowedStatuses.includes(status)) {
      throw new AppError("Invalid status", 400);
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      throw new AppError("Lead not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: lead,
    });
  }
);