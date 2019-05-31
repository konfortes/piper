import trello from './../../services/trello';
import logger from '../../utils/logger';

export const trelloHookSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            version: { type: 'string' }
          }
        }
      }
    },
    500: 'error#'
  }
};

export const trelloHookHandler = async request => {
  // TODO: remove
  logger.info('webhook payload: ' + JSON.stringify(request.body, null, 4));
  trello.handleWebhook(request.body);

  return {
    data: { success: true }
  };
};
