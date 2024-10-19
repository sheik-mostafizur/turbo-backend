import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'reflect-metadata';
import { log } from '@repo/logger';
import { sequelize } from '@/configs/db.config';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import path from 'path';

const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));

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

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app;
};
