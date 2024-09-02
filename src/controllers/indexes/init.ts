import { NextFunction, Request, Response } from "express";
import validateSession from "../../middlewares/validate-session";
import { IController } from "../../utils/types";
import { setCorsConfiguration } from "../../models/s3-model";

async function handler(req: Request, res: Response, next: NextFunction) {
  try {
    const user_id = req.session.id;
   
    await setCorsConfiguration(user_id);
    res.json({});
  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/indexes/init',
  method: 'post',
  handler: [
    validateSession,
    handler
  ]
}

export default controller;
