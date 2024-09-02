import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import captureBadRequest from "../../middlewares/catch-bad-request";
import { IController } from "../../utils/types";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../../config";
import jwt from "jsonwebtoken";
import getConnection from '../../databases/postgres';
import ValidatorMessage from "../../utils/validator-message";
import bcrypt from "bcrypt";
import { NotFoundError } from "../../utils/errors";
import { JwtPayload } from "../../interfaces/session";

const loginParams = [
  body('email')
    .isString()
    .withMessage(ValidatorMessage.required())
    .trim(),
  body('password')
    .isString()
    .withMessage(ValidatorMessage.required())
    .trim(),
  captureBadRequest
];

async function loginRequestHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const db = await getConnection();

    const {email, password} = req.body;
    
    const user = await db.user.findUnique({where: {email:email}});
    if (!user) {
      return next(new NotFoundError("LOGIN_NOT_FOUND", 'Manager no encontrado'));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new NotFoundError("LOGIN_NOT_FOUND", 'Usuario o contraseña incorrecta'));
    }

    const payload: JwtPayload = {id: user.id, email: user.email};
    const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '7d'});

    res.status(200);
    res.json({success:true, accessToken: accessToken, refreshToken:refreshToken});
  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/auth/login',
  method: 'post',
  handler: [
    ...loginParams,
    loginRequestHandler
  ]
}

export default controller;