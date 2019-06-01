import telegramBot from '../../services/telegram-bot';

export const telegramHookSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object'
        }
      }
    },
    500: 'error#'
  }
};

export const telegramHookHandler = async request => {
  const { message } = request.body;
  const authToken = request.query.auth;
  telegramBot.handleWebhook(message, authToken);

  return {
    data: { success: true }
  };
};
