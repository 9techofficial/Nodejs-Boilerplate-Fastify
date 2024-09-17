import { FastifyInstance } from "fastify";
import { isAuth } from "../middlewares/authMiddleware";
import baseRoutes from "../framework/baseRoute";

export default async function authRoutes(app: FastifyInstance) {
  app.register(async (authApp) => {
    authApp.addHook('preHandler', isAuth); // Apply the middleware

    // Routes
    baseRoutes(authApp, 'user', 'userController');
  });
}