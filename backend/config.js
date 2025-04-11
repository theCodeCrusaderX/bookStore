export const PORT = 5555;



import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('bookStoreApp', 'root', 'Admin@1234', {
  host: 'localhost',
  dialect: 'mysql',
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};