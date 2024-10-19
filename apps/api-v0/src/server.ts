import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'reflect-metadata';
import { log } from '@repo/logger';
import { sequelize } from '@/configs/db.config';

export const createServer = async (): Promise<Express> => {
  try {
    await sequelize.authenticate();
    log('Database connection established successfully.');
  } catch (error) {
    log('Unable to connect to the database:', error);
    throw error;
  }

  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors());

  // Sample routes
  app.get('/message/:name', (req, res) => {
    return res.json({ message: `Hello ${req.params.name}` });
  });

  app.get('/status', (_, res) => {
    return res.json({ ok: true });
  });

  return app;
};
