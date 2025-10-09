export const PORT = 5555;
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to db successfully');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { prisma };




