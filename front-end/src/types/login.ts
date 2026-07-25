import type z from "zod";
import type { loginSchema } from "../schemas/login";

export type LoginFormData = z.infer<typeof loginSchema>;
