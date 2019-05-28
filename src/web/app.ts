import Fastify from 'fastify';
import Swagger from 'fastify-swagger';
import swaggerConfig from '../config/swagger';
import logger from '../utils/logger';
import errorHandler, { notFoundHandler } from '../utils/error-handler';

import { requestIdPlugin } from './plugins/requestid-plugin';
import { getSharedSchemas } from './schemas/shared';
import { rootRoutes } from './routes';

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

export default app;
