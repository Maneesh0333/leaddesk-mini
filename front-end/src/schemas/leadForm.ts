import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters long"),

  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),

  budget: z
    .string()
    .min(1, "Please select a project budget range"), 

  message: z
    .string()
    .trim()
    .min(1, "Project details are required")
    .min(10, "Please provide a bit more detail (at least 10 characters)"),
});
