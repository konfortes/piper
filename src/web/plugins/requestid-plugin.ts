import fastifyPlugin from 'fastify-plugin';
import requestid, { REQUESTID_HEADER } from '../../utils/requstid';

export const requestIdPlugin = fastifyPlugin(async (app, opts) => {
  app.addHook('onRequest', async (request, reply, payload) => {
    requestid.set(request.log);
  });
  app.addHook('onSend', async (request, reply, payload) => {
    reply.header(REQUESTID_HEADER, request.id);
  });
});
