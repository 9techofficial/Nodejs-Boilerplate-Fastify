import { FastifyInstance } from 'fastify';
import baseRoutes from '../framework/baseRoute';

export function routes(app: FastifyInstance): void {
  // single route  
  app.get('/', async (request, reply) => { reply.send({ hello: 'world' }); });

  // CRUD routes  
  baseRoutes(app, 'todo', 'todoController');
}