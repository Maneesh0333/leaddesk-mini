import { Router } from "express";
import { createLead, getLeads, updateLeadStatus } from "../controllers/lead.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import { createLeadSchema, updateLeadSchema } from "../validators/lead.validator.js";

const router = Router();

router.post("/", validate(createLeadSchema), createLead);

router.get("/", protect, getLeads);
router.patch("/:id", protect, validate(updateLeadSchema), updateLeadStatus);

export default router;