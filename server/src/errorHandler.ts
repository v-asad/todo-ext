import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  type ExError = {
    status: number;
    message: string;
  };

  const { status, message } = err as ExError;

  if (typeof status !== "undefined" && typeof message !== "undefined") {
    return res.status(status).json({ message });
  }

  next();
}
