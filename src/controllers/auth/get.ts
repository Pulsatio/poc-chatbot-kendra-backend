import { NextFunction, Request, Response } from "express";
import captureBadRequest from "../../middlewares/catch-bad-request";
import { IController } from "../../utils/types";
import getConnection from '../../databases/postgres';
import validateSession from "../../middlewares/validate-session";


const handlerParams = [
  captureBadRequest
];

async function handler(req: Request, res: Response, next: NextFunction) {
  try {
    const db = await getConnection();
    const {id} = req.session;
    const user = await db.user.findUnique({where: {id:id}});
    res.json(user)
  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/auth/',
  method: 'get',
  handler: [
    validateSession,
    ...handlerParams,
    handler
  ]
}

export default controller;