import dotenv from 'dotenv';
import fastify from 'fastify';
import { connectDB } from './utils/db';

// implement fastify
const app = fastify({ logger: false });

// Load the appropriate .env file based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${nodeEnv}` });

const start = async () => {
  try {
    await connectDB();
    await app.listen({ port: Number(process.env.PORT) || 3000 });
    console.log(`Server running in ${process.env.NODE_ENV} mode at http://localhost:${process.env.PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

app.get('/', async (request, reply) => {
  return { message: 'Hello World!' };
});

start();
