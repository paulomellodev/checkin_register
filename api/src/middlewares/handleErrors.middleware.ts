import { NextFunction, Request, Response } from "express";
import AppErrors from "../errors/app.error";

export const handleErrors = (
  err: Error,
  _: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("error middleware", err);
  if (err instanceof AppErrors) {
    return response.status(err.status).json({
      error: err.message,
    });
  }
  return response.status(400).json({
    error: err.message,
  });
};
