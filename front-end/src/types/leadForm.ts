import type z from "zod";
import type { leadSchema } from "../schemas/leadForm";

export type LeadFormData = z.infer<typeof leadSchema>;
