const config = require('../config');
import axios from 'axios';
import logger from '../utils/logger';
import TelegramBot from './telegram-bot';
import { Webhookable } from 'services';

const BASE_API_URL = 'https://api.trello.com/1';
const LIFE_BOARD_ID = '5cdd4be7a4bbe37af39abd29';

export enum TrelloAction {
  createCard = 'createCard'
}

class Trello implements Webhookable {
  constructor(private appKey: string, private token: string) {}

  get name() {
    return 'trello';
  }

  public async setWebhook(url: string) {
    const setWebhookUrl = `${BASE_API_URL}/tokens/${this.token}/webhooks`;
    const body = {
      key: this.appKey,
      callbackURL: url,
      idModel: LIFE_BOARD_ID,
      description: 'Piper Webhook'
    };

    // TODO: remove
    console.log(
      `curl -X POST -H 'Content-Type: application/json' -d '${JSON.stringify(
        body
      )}' '${url}'`
    );

    try {
      await axios.post(setWebhookUrl, body);
      logger.info('trello webhook was successfully set');
    } catch (error) {
      logger.error('error setting Trello webhook: ' + error.response.data);
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
