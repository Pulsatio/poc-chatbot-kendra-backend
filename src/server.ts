
process.on("uncaughtException", e => {
  console.error(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.error(e);
  process.exit(1);
});

import http from "http";
import citizenApp from './app';
import path from 'path';

import express from 'express';

// Api Docs
const openapiApp = express();
const swaggerUi = require('swagger-ui-express');

let swaggerOptions = {
  swaggerOptions: {
    url: '/openapi/api.yaml'
  }
};

openapiApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));
openapiApp.use('/openapi', express.static(path.join(__dirname, '..', 'docs')));
openapiApp.use(citizenApp);

const server = http.createServer(openapiApp);

const PORT = parseInt(process.env.PORT || '3000');

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);
