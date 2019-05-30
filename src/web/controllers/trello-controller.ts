import logger from '../../utils/logger';
import telegramBot from '../../services/telegram-bot';

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
  logger.info('webhook payload: ' + JSON.stringify(request.body, null, 4));
  const action = request.body.action;
  if (action.type === 'createCard') {
    const chatId = '616941509,';
    const cardName = action.data.card.name;
    telegramBot.sendMessage(chatId, 'new card added to Life: ' + cardName);
  }
  return {
    data: {}
  };
};
