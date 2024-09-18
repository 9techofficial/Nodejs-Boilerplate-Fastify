import { FastifyInstance } from 'fastify';
import { login, register } from '../controllers/authController';
import baseRoutes from '../framework/baseRoute';
import authRoutes from './authRoutes';

export default async function routes(app: FastifyInstance) {
  // authentication routes
  app.post('/register', register);
  app.post('/login', login);

  // single route  
  app.get('/', async (request, reply) => { reply.send({ hello: 'world' }); });

  // CRUD routes
  baseRoutes(app, 'todo', 'todoController');

  // Authentication routes
  await authRoutes(app);
}