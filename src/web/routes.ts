import { healthSchema, healthHandler } from './controllers/root-controller';
import { FastifyInstance } from 'fastify';

export const rootRoutes = async (app: FastifyInstance, options: {}) => {
  app.get('/health', { schema: healthSchema }, healthHandler);
};
