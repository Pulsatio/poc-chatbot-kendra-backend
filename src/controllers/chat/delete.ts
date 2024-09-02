import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import captureBadRequest from '../../middlewares/catch-bad-request';
import validateSession from "../../middlewares/validate-session";
import getConnection from '../../databases/postgres';
import { IController } from "../../utils/types";

const handlerParams = [
  param('name')
    .exists().isLength({ min: 6, max: 30 }).withMessage('El nombre del chat debe contener entre 6 y 30 caracteres')
    .trim(),
  captureBadRequest
];

async function handler(req: Request, res: Response, next: NextFunction) {
  try {
    const db = await getConnection();
    const user_id = req.session.id;
    const name = req.params.name as string
    
    const data = await db.chat.findUnique({where:{user_id_name:{user_id:user_id,name:name}}})
    if(!data){
      res.status(404).json('No existe un chat con ese nombre');
      return;
    }
    await db.chat.delete({
      where:{
        id:data.id
      }
    })

    res.json('El chat ha sido eliminado existosamente')
  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/chat/:name',
  method: 'delete',
  handler: [
    validateSession,
    ...handlerParams,
    handler
  ]
}

export default controller;
