import trello from '../../services/trello/trello';

export const trelloHookSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            success: { type: 'boolean' }
          }
        }
      }
    },
    500: 'error#'
  }
};

export const trelloHookHandler = async request => {
  trello.handleWebhook(request.body, request.headers['x-trello-webhook']);

  return {
    data: { success: true }
  };
};
