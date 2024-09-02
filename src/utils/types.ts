import { RequestHandler } from 'express';


export interface IController {
  method: 'get' | 'post' | 'put' | 'delete' | 'all' | 'options' | 'head';
  path: string;
  handler: RequestHandler | Array<RequestHandler>;
}

export interface ITrackingData {
  app: string;
  appweb: string;
  url: string;
  user: string;
  fecha: number;
  date: string;
  fuente: string;
  tipo: string;
  title: string;
}
