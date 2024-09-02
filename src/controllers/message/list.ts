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
    const name = req.params.name as string;
  

    const data = await db.chat.findUnique({where:{user_id_name:{user_id:user_id,name:name}}});
    if(!data){
      res.status(500).json('No existe un chat ese nombre');
      return;
    }

    const ans = await db.message.findMany({
        where:{
            chat_id:data.id
        }
    })
    const listMessages = ans.map(message => {
        return {
            user_message: message.user_message,
            bot_message: message.bot_message,
            created_at: message.created_at
        } 
    })
    res.json(listMessages);
  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/message/:name',
  method: 'get',
  handler: [
    validateSession,
    ...handlerParams,
    handler
  ]
}

export default controller;
