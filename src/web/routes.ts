import { healthSchema, healthHandler } from './controllers/root-controller';
import {
  trelloHookSchema,
  trelloHookHandler
} from './controllers/trello-controller';
import { FastifyInstance } from 'fastify';

export const rootRoutes = async (app: FastifyInstance, options: {}) => {
  app.get('/health', { schema: healthSchema }, healthHandler);
};

export const trelloRoutes = async (app: FastifyInstance, options: {}) => {
  // this routes required in order to register the webhook
  app.head('/trello/webhook', async () => {
    return {
      data: {}
    };
  });
  app.post('/trello/webhook', { schema: trelloHookSchema }, trelloHookHandler);
};
