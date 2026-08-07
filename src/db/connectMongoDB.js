import mongoose from 'mongoose';
import { Teacher } from '../models/teacher';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
    await Teacher.syncIndexes();
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
