import app from '../app';
import Fastify from 'fastify';
import loggerProxy from '../../utils/logger-proxy';
import loggerFactory from 'pino';
import { requestIdPlugin } from './requestid-plugin';
import { REQUESTID_HEADER } from '../../utils/requstid';

describe('request id', () => {
  describe('a new request arrives without x-request-id header', () => {
    it('have a new generated request id', async () => {
      const response = await app.inject({ method: 'GET', url: '/health' });
      expect(response.headers).toHaveProperty(REQUESTID_HEADER);
    });
  });
  describe('a new request arrives with x-request-id header', () => {
    it('have the same request id in the response and in the request', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
        headers: { [REQUESTID_HEADER]: '123' }
      });
      expect(response.headers).toHaveProperty(REQUESTID_HEADER, '123');
    });
  });
  describe('two requests arrives without x-request-id header', () => {
    it('have not the same id in the different requests', async () => {
      const response1 = await app.inject({ method: 'GET', url: '/health' });
      const response2 = await app.inject({ method: 'GET', url: '/health' });
      expect(response1.headers[REQUESTID_HEADER]).not.toBe(
        response2.headers[REQUESTID_HEADER]
      );
    });
  });

  describe('new logs writen for request', () => {
    let outputOfLogger: object[] = [];
    let myLogMsgs: object[];

    beforeAll(async () => {
      const loggerDest = function() {
        const dest = {
          write: logLine => outputOfLogger.push(JSON.parse(logLine))
        };
        return loggerProxy(
          loggerFactory(
            {
              level: 'info'
            },
            // @ts-ignore
            dest
          )
        );
      };

      const logger = loggerDest();
      const app = Fastify({
        logger
      });

      app.register(requestIdPlugin);

      app.get('/hello', async (request, reply) => {
        logger.info('check requestId');
        reply.send({ hello: 'world' });
      });

      await app.inject({ method: 'GET', url: '/hello' });
      myLogMsgs = outputOfLogger.filter(
        obj => obj['msg'] === 'check requestId'
      );
    });

    it('have request id in my log', async () => {
      expect(myLogMsgs[0]).toHaveProperty('reqId');
    });

    it('have the same request id in an request msg and my log', async () => {
      const logRequestMsgs: object[] = outputOfLogger.filter(
        obj => obj['msg'] === 'incoming request'
      );
      expect(myLogMsgs[0]['reqId']).toBe(logRequestMsgs[0]['reqId']);
    });
  });
});
