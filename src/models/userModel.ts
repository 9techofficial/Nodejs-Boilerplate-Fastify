
import mongoose, { Schema, Document } from 'mongoose';

// Typescript variables
export type TUser = {
  name: string;
  email: string;
  username?: string;
  password: string;
  deletedAt?: Date;
};

// Define interface
interface IUser extends Document, TUser { };

// Build Schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  deletedAt: { type: Date, required: false }
}, { timestamps: true });
export const UserModel = mongoose.model<IUser>('User', UserSchema);