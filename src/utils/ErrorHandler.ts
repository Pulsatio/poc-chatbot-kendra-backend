import { Response, NextFunction, Router, Request } from "express";
import { HttpResponse } from './httpResponse';
import { GenericError, NotFoundError } from "./errors";


export const handleAppErrors = (err: GenericError, res: Response, next: NextFunction) => {
  if (!(err instanceof GenericError)) {
    return next(err);
  }

  let response: HttpResponse = {
    success: false,
    userMessage: err.userMessage,
    description: err.systemMessage
  };
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    response.error = {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  }
  res.status(err.getHttpStatus()).json(response);
};


export const handleSystemErrors = (err: Error, res: Response) => {
  let response: HttpResponse = {
    success: false,
    userMessage: 'A ocurrido un error inesperado. Nuestro equipo esta trabajando para resolver el problema. Por favor, intente mas tarde.',
    description: 'Internal System Error'
  };
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    response.error = {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  }
  res.status(500).json(response);
};


export default function handleErrors(app: Router) {
  // Not Found
  app.use(function (req: Request, res: Response) {
    throw new NotFoundError('NOT_FOUND', 'Api resource not found');
  });

  // App Errors
  app.use(function (err: GenericError, req: Request, res: Response, next: NextFunction) {
    handleAppErrors(err, res, next);
  });

  //System Erros
  app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    handleSystemErrors(err, res);
  });
}