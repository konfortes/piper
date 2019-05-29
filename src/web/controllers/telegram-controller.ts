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
  const chatId = message.chat.id;

  telegramBot.sendMessage(chatId, 'it works!');
  logger.info(JSON.stringify(request.body, null, 4));
  return {
    data: { ...request.body }
  };
};
