import type { RequestHandler } from "express";
import { type ZodType } from "zod";

export const validate =
  <T>(schema: ZodType<T>): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message,
      });
    }

    Object.assign(req, result.data);

    next();
  };