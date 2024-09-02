import { NextFunction, Request, Response } from 'express';

import validateSession from "../../middlewares/validate-session";
import getConnection from '../../databases/postgres';
import { IController } from "../../utils/types";


async function handler(req: Request, res: Response, next: NextFunction) {
  try {
    const db = await getConnection();
    const user_id = req.session.id;
    const data = await db.indices.findMany({where:{id_usuario:user_id}});

    res.json(data);
  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/indexes/',
  method: 'get',
  handler: [
    validateSession,
    handler
  ]
}

export default controller;
