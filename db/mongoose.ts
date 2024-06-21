import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/next-commerce';

export async function connectDB() {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Mongodb connected');
    return true;
  } catch (error) {
    console.log(error);
  }
}
