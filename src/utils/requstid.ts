import als from 'async-local-storage';
export const REQUESTID_HEADER = 'x-request-id';
export const REQUST_LOGGER = 'request_logger';

const requestId = {
  enable: () => als.enable(),
  get: () => als.get(REQUST_LOGGER),
  set: requestLog => als.set(REQUST_LOGGER, requestLog)
};

export default requestId;
