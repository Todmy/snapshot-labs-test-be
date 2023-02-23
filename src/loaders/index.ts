import * as express from 'express';
import server from './server';

export default async (app: express.Application) => {
  await server(app);
  console.log('Server loaded!');
};
