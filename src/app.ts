import express from "express";
import cors from 'cors'
// Middlewares
import { apply as applyMiddlewares } from "./middlewares";
import errorHandler from './utils/ErrorHandler';

// Controllers
import routes from "./controllers";



const app = express();
app.use(cors())
app.disable('x-powered-by');
applyMiddlewares(app);


// Auth controllers
for (let contr of routes) {
  app[contr.method](contr.path, contr.handler);
}

// Handle Errors
errorHandler(app);


export default app;
