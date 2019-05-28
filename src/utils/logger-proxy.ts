import hyperid from 'hyperid';
import { Logger } from 'pino';
import requestid, { REQUESTID_HEADER } from './requstid';

requestid.enable();
const instanceId = hyperid({ urlSafe: true });

const handler = {
  get: (defaultLogger, propertyName) => {
    const currentRequestLogger = requestid.get();
    const logger =
      currentRequestLogger != null ? currentRequestLogger : defaultLogger;
    if (logger[propertyName] instanceof Function) {
      return function(...args) {
        return logger[propertyName].apply(logger, args);
      };
    }
    return logger[propertyName];
  }
};

/**
 * Patches the logger object to access the cached logger
 * instance of the current Fastify request, if it exists.
 */
export default function loggerProxy(defaultLogger: Logger) {
  // Configure the request ID of each log record to be the
  // request ID of the current HTTP request. If not in the
  // context of a request, the record won't have an ID.
  defaultLogger.genReqId = request =>
    request.headers[REQUESTID_HEADER] || instanceId();
  return new Proxy(defaultLogger, handler);
}
