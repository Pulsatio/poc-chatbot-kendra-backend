
import cors from 'cors';
import { Router } from 'express';
import express from 'express';


const middlewares = [
  cors(),
  express.json({ limit: '6mb' }),
  express.urlencoded({ extended: true }),
];

export function apply(app: Router) {
  middlewares.forEach(middleare => app.use(middleare));
}

export default middlewares;
