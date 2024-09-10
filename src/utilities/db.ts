import mongoose from "mongoose";
import { logInfo } from "./logger";

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI!);
    logInfo.log('info', 'Connected to MongoDB');
  } catch (error) {
    logInfo.log('error', JSON.stringify(error));
    process.exit(1);
  }
}

export { connectDB };