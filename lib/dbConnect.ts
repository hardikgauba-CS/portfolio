import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // Connect using the updated syntax
  await mongoose.connect(MONGO_URI);
}
