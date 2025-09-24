import { MONGO_URI } from '../env';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const options = {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };
    const connection = await mongoose.connect(String(MONGO_URI), options);
    console.info(`MongoDB connected: ${connection.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.info('⚠️ MongoDB disconnected');
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw new Error('Database connection failed');
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.info('✅ MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};
