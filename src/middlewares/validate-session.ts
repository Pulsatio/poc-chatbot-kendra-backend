import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../utils/errors";
import { JwtPayload } from "../interfaces/session";

declare global {
  namespace Express {
    interface Request {
      session: JwtPayload
    }
  }
}

export default async function validateSession(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return next(new UnauthorizedError('NO_AUTH_TOKEN', 'No se ha enviado el token de autenticación'));
  }
  
  try {
    req.session = jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return next(new UnauthorizedError('INVALID_AUTH_TOKEN', 'El token de autenticación es inválido'));
  }
  return next()
}