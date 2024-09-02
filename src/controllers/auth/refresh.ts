import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import captureBadRequest from "../../middlewares/catch-bad-request";
import { IController } from "../../utils/types";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../../config";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../utils/errors";
import ValidatorMessage from "../../utils/validator-message";
import { JwtPayload } from "../../interfaces/session";

const refreshTokenParams = [
  body('refreshToken')
    .isString()
    .withMessage(ValidatorMessage.required())
    .trim(),
  captureBadRequest
];

async function refreshTokenRequestHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const {refreshToken} = req.body;
  
    let payload: JwtPayload;
    try {
      payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JwtPayload;
    } catch (error) {
      return next(new UnauthorizedError("INVALID_REFRESH_TOKEN", 'Refresh token invalido'));
    }
    const token = jwt.sign(payload, JWT_SECRET);
    const newRefreshToken = jwt.sign(payload, JWT_REFRESH_SECRET);

    res.status(200);
    res.json({token, refreshToken: newRefreshToken});
  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/auth/refresh',
  method: 'post',
  handler: [
    ...refreshTokenParams,
    refreshTokenRequestHandler
  ]
}

export default controller;