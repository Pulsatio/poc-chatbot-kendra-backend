import { Request, Response } from "express";
import { IController } from "../utils/types";

import authControllers from './auth';
import chatControllers from './chat';
import messageControllers from './message';
import indexesControllers from './indexes'

async function indexHandler(req: Request, res: Response) {
  let ans = process.env.APP_NAME ?? 'Hello world';
  res.send(ans);
}

const router: Array<IController> = [
  {
    method: 'get',
    path: '/test',
    handler: indexHandler
  },
  ...authControllers,
  ...chatControllers,
  ...messageControllers,
  ...indexesControllers
];

export default router;
