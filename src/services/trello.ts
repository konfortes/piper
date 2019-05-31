const config = require('../config');
import axios from 'axios';
import logger from '../utils/logger';
import TelegramBot from './telegram-bot';

const BASE_URL = 'https://api.trello.com/1';
const CALLBACK_URL = config.get('publicUrl') + '/trello/webhook';
const LIFE_BOARD_ID = '5cdd4be7a4bbe37af39abd29';

export enum TrelloAction {
  createCard = 'createCard'
}

class Trello {
  constructor(private appKey: string, private token: string) {}

  public async setWebhook() {
    const url = `${BASE_URL}/tokens/${this.token}/webhooks`;
    const body = {
      key: this.appKey,
      callbackURL: CALLBACK_URL,
      idModel: LIFE_BOARD_ID,
      description: 'Piper Webhook'
    };

    console.log(
      `curl -X POST -H 'Content-Type: application/json' -d '${JSON.stringify(
        body
      )}' '${url}'`
    );

    try {
      await axios.post(url, body);
      logger.info('treloo webhook was successfully setted');
    } catch (error) {
      logger.error('error setting Trello webhook: ' + error);
    }
  }

  public handleWebhook(data: any): void {
    const action = data.action;

    if (action.type === TrelloAction.createCard) {
      const chatId = '616941509';
      const cardName = action.data.card.name;
      TelegramBot.sendMessage(chatId, 'new card added to Life: ' + cardName);
    }
  }
}

const appKey = config.get('services.trello.appKey');
const token = config.get('services.trello.apiToken');
const trello = new Trello(appKey, token);

export default trello;
