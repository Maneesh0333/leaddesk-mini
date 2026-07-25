import { z } from "zod";

export const createLeadSchema = z.object({
  body: z.object({
    name: z
       .string()
        .trim()
        .min(1, "Full name is required")
        .min(2, "Name must be at least 2 characters long"),

    email: z
      .string()
      .trim()
      .email("Invalid email address"),

    budget: z
      .string()
      .min(1, "Budget is required"),

    message: z
      .string()
      .trim()
      .min(1, "Project details are required")
      .min(10, "Please provide a bit more detail (at least 10 characters)")
      .max(1000, "Max 1000 characters allowed"),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    status: z.enum([
      "New",
      "Contacted",
      "Closed",
    ]),
  }),
});