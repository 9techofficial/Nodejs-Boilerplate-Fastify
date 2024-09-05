import fastify from 'fastify';
import { connectDB } from './utils/db';
const app = fastify({ logger: false });

const start = async () => {
  try {
    await connectDB();
    await app.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

app.get('/', async (request, reply) => {
  return { message: 'Hello World!' };
});

start();
