export const PORT = 5555;

import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Auto-create missing tables
    console.log('Connected to MySQL database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};



