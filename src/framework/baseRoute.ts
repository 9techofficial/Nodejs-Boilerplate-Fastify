import { FastifyInstance } from 'fastify';

export default async function baseRoutes(app: FastifyInstance, routeName: string, controller: any): Promise<void> {

  // Dynamically import the controller module
  const importController = await import(`../controllers/${controller}.ts`);
  const controllerModule = importController.default;

  // index route  
  app.get(`/${routeName}`, async (request, reply) => {
    await controllerModule.findAll(request, reply);
  });

  // create route
  app.post(`/${routeName}`, async (request, reply) => {
    await controllerModule.create(request, reply);
  });

  // show route
  app.get(`/${routeName}/:id`, async (request, reply) => {
    await controllerModule.findOne(request, reply);
  });

  // update route
  app.put(`/${routeName}/:id`, async (request, reply) => {
    await controllerModule.update(request, reply);
  });

  // delete route
  app.delete(`/${routeName}/:id`, async (request, reply) => {
    await controllerModule.delete(request, reply);
  });
}
