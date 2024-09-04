import { NextFunction, Request, Response } from 'express';

import validateSession from "../../middlewares/validate-session";
import { listFiles } from '../../models/s3-model';
import { IController } from "../../utils/types";


async function handler(req: Request, res: Response, next: NextFunction) {
  try {
    const user_id = req.session.id;
    const data = await listFiles(user_id);
    
    const ans = data.map( file => {
      return {
        name: file.Key,
        created_at: file.LastModified?.toLocaleDateString(),
        type: "PDF"
      }
    } )
    res.json(ans);
  } catch (error) {
    next(error);
  }
}

const controller: IController = {
  path: '/indexes/files/',
  method: 'get',
  handler: [
    validateSession,
    handler
  ]
}

export default controller;
