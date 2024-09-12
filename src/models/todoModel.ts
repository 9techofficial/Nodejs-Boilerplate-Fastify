import mongoose, { Schema, Document } from 'mongoose';

// Build Schema
const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deletedAt: { type: Date, required: false }
}, { timestamps: true });
export const TodoModel = mongoose.model('Todo', TodoSchema);

// Define interface
interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
}

// Typescript variables
export type TTodo = ITodo;