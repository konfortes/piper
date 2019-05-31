import logger from '../../utils/logger';
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
  // TODO: remove
  logger.info(JSON.stringify(message, null, 4));
  telegramBot.handleWebhook(message);

  return {
    data: { success: true }
  };
};
