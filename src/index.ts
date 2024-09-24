import dotenv from 'dotenv';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { connectDB } from './utilities/db';
import { logInfo } from './utilities/logger';
import routes from './routes/routes';

// Load the appropriate .env file based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${nodeEnv}` });

// implement fastify
const app = fastify({ logger: false });
app.register(cors, {
  origin: process.env.APP_URL ?? '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

// Register routes with '/api' prefix
app.register(routes, { prefix: '/api' });

(async () => {
  try {
    await connectDB();
    await app.listen({ port: Number(process.env.PORT) || 4000 });
    logInfo.info(`Server running in ${process.env.NODE_ENV} mode at http://localhost:${process.env.PORT}`);
  } catch (error) {
    logInfo.error(JSON.stringify(error));
    process.exit(1);
  }
})();