import path from 'path';
import Sequelize from 'sequelize';
import { users } from './users.js';

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[
  env
];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const Users = users(sequelize, Sequelize);

console.log('====>', Users);

export const db = {
  sequelize,
  Sequelize,
  Users,
};
