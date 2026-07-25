import type { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError.js";

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
      }),
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};