import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/boilerplate');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
    process.exit(1);
  }
}

export { connectDB };