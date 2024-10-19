import '@/configs/env.config';
import type { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import models from '@/database/models';
// Add other models as needed

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  port?: number;
  use_env_variable?: string;
}

type DbConfigs = Record<string, DbConfig>;

const dbConfigs: DbConfigs = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'edust_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT as Dialect,
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'express_db_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT as Dialect,
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'edust_production',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT as Dialect,
    use_env_variable: 'DATABASE_URL',
  },
};

const activeEnv = process.env.NODE_ENV || 'development';
const activeConfig = dbConfigs[activeEnv];

const databaseUrl = activeConfig.use_env_variable
  ? (process.env[activeConfig.use_env_variable] ?? '')
  : `${activeConfig.dialect}://${activeConfig.username}:${activeConfig.password}@${activeConfig.host}/${activeConfig.database}`;

// Initialize Sequelize with Sequelize-Typescript
const sequelize = new Sequelize({
  dialect: activeConfig.dialect as 'mysql' | 'postgres',
  host: activeConfig.host,
  username: activeConfig.username,
  password: activeConfig.password,
  database: activeConfig.database,
  models,
  define: {
    underscored: true,
    timestamps: true,
  },
});

export { dbConfigs, databaseUrl, sequelize };
