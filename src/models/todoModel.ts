import mongoose, { Schema, Document } from 'mongoose';

// Typescript variables
export type TTodo = {
  title: string;
  description: string;
  completed: boolean;
  deletedAt?: Date;
};

// Define interface
interface ITodo extends Document, TTodo { }

// Build Schema
const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deletedAt: { type: Date, required: false }
}, { timestamps: true });
export const TodoModel = mongoose.model<ITodo>('Todo', TodoSchema);