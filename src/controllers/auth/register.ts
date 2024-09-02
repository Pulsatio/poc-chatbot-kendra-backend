import { NextFunction, Request, Response } from "express";
import captureBadRequest from "../../middlewares/catch-bad-request";
import { body } from "express-validator";
import { IController } from "../../utils/types";
import ValidatorMessage from "../../utils/validator-message";
import getConnection from '../../databases/postgres';
import bcrypt from 'bcrypt';
import { BadRequestError } from "../../utils/errors";


const registrationParams = [
  body('name')
    .isString().isLength({ min: 6,max: 50}).withMessage('El nombre  debe contener entre 6 y 50 caracteres')
    .withMessage(ValidatorMessage.required()),
  body('email')
    .isEmail().withMessage(ValidatorMessage.incorrectPattern),
  body('password')
    .isString().isLength({ min: 6, max: 30 }).withMessage('La contraseña debe contener entre 8 y 30 caracteres')
    .withMessage(ValidatorMessage.required()),
  captureBadRequest
];


async function registrationRequestHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const db = await getConnection();

    const data = {
      name: req.body.name as string,
      email: req.body.email as string,
      password: bcrypt.hashSync(req.body.password, 10),
    }
  
     
    let userExists = await db.user.findUnique({ where: { email: data.email } });
    if (userExists) {
      return next(new BadRequestError('USER_EXISTS', 'Usuario ya existe'));
    }
   
    const user = await db.user.create({data});
  
    res.status(200).json({success:true, user_id : user.id});

  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/auth/register',
  method: 'post',
  handler: [
    ...registrationParams,
    registrationRequestHandler
  ]
}

export default controller;
