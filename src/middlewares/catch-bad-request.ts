import { NextFunction, Request, Response } from "express";

import { validationResult } from 'express-validator';

export default async function captureBadRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      description: 'Los datos ingresados son incorrectos.',
      errors: errors.array()
    });
  }

  next();
}