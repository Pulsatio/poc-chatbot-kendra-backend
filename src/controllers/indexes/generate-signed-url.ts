import { NextFunction, Request, Response } from "express";
import validateSession from "../../middlewares/validate-session";
import { IController } from "../../utils/types";
import { createSignedPost } from "../../models/s3-model";
import { query } from 'express-validator';
import captureBadRequest from '../../middlewares/catch-bad-request';

const handlerParams = [
  query('filename')
    .exists().withMessage('El nombre del archivo es obligatorio'),
  query('filetype')
    .exists().withMessage('El tipo del archivo es obligatorio'),
  captureBadRequest
];

async function handler(req: Request, res: Response, next: NextFunction) {
  try {
    const user_id = req.session.id;
    const filename = req.query.filename as string;
    const filetype = req.query.filetype as string;

    const signedPost = await createSignedPost(user_id,filename,filetype);
   
    return res.json(signedPost);
  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/indexes/generate-signed-url',
  method: 'get',
  handler: [
    ...handlerParams,
    validateSession,
    handler
  ]
}

export default controller;
