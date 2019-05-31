import Fastify from 'fastify';
import Swagger from 'fastify-swagger';
import swaggerConfig from '../config/swagger';
import logger from '../utils/logger';
import errorHandler, { notFoundHandler } from '../utils/error-handler';

import { requestIdPlugin } from './plugins/requestid-plugin';
import { getSharedSchemas } from './schemas/shared';
import { rootRoutes, trelloRoutes, telegramRoutes } from './routes';

const app = Fastify({
  logger
});

// Register plugins
app.register(Swagger, swaggerConfig);
app.register(requestIdPlugin);
app.register(require('fastify-formbody'));

// Register shared schemas
app.addSchema(getSharedSchemas());

// Handle errors
app.setNotFoundHandler(notFoundHandler);
app.setErrorHandler(errorHandler);

// Register routes
app.register(rootRoutes);
app.register(trelloRoutes);
app.register(telegramRoutes);

// for webhook initialization only
import Bot from '../services/telegram-bot';
logger.info(Bot + ' initialized');

import Trello from '../services/trello';
Trello.setWebhook();

export default app;
