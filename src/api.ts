
import awsServerlessExpress from 'aws-serverless-express';
import app from './app';

const server = awsServerlessExpress.createServer(app);

export function handler(event: any, context: any) {
  context.callbackWaitsForEmptyEventLoop = false;
  return awsServerlessExpress.proxy(server, event, context)
}
