import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import captureBadRequest from '../../middlewares/catch-bad-request';
import validateSession from "../../middlewares/validate-session";
import getConnection from '../../databases/postgres';
import { IController } from "../../utils/types";

const handlerParams = [
  body('name')
    .exists().isLength({ min: 6, max: 30 }).withMessage('El nombre del chat debe contener entre 6 y 30 caracteres')
    .trim(),
  body('userMessage').exists(),
  body('botMessage').exists(),
  captureBadRequest
];

async function handler(req: Request, res: Response, next: NextFunction) {
  try {
    const db = await getConnection();
    const user_id = req.session.email;
    const name = req.body.name as string;
    const userMessage = req.body.userMessage;
    const botMessage = req.body.botMessage;

    const data = await db.chat.findUnique({where:{user_id_name:{user_id:user_id,name:name}}});
    if(!data){
      res.status(500).json('No existe un chat ese nombre');
      return;
    }

    await db.message.create({
        data:{
            chat_id:data.id,
            user_message: userMessage,
            bot_message: botMessage
        }   
    })

    res.json('El chat ha sido creado existosamente');
  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/message/',
  method: 'post',
  handler: [
    validateSession,
    ...handlerParams,
    handler
  ]
}

export default controller;
