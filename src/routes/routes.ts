import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify';
import baseRoutes from '../framework/baseRoute';

const routes: FastifyPluginCallback = (app: FastifyInstance, opts: FastifyPluginOptions, done) => {
  // single route  
  app.get('/', async (request, reply) => { reply.send({ hello: 'world' }); });

  // CRUD routes  
  baseRoutes(app, 'todo', 'todoController');

  // Call done to finish registering routes
  done();
};

export { routes };