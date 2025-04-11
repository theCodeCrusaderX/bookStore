export const PORT = 5555;

import { Sequelize } from 'sequelize';
import 'dotenv/config'

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
