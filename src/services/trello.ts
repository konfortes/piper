import { authorizationError } from './../utils/errors-factory';
const config = require('../config');
import axios from 'axios';
import crypto from 'crypto';
import logger from '../utils/logger';
import TelegramBot from './telegram-bot';
import { Webhookable } from 'services';

const BASE_API_URL = 'https://api.trello.com/1';
const LIFE_BOARD_ID = '5cdd4be7a4bbe37af39abd29';

export enum TrelloAction {
  createCard = 'createCard'
}

class Trello implements Webhookable {
  private webhookUrl: string;

  constructor(private appKey: string, private token: string) {
    this.webhookUrl = '';
  }

  get name() {
    return 'trello';
  }

  public async setWebhook(url: string) {
    this.webhookUrl = url;
    const setWebhookUrl = `${BASE_API_URL}/tokens/${this.token}/webhooks`;
    const body = {
      key: this.appKey,
      callbackURL: url,
      idModel: LIFE_BOARD_ID,
      description: 'Piper Webhook'
    };

    try {
      await axios.post(setWebhookUrl, body);
      logger.info('trello webhook was successfully set');
    } catch (error) {
      logger.error('error setting Trello webhook: ' + error.response.data);
    }
  }

  public handleWebhook(data: any, signature: string): void {
    this.validateSignature(data, signature);

    const action = data.action;

    if (action.type === TrelloAction.createCard) {
      const chatId = '616941509';
      const cardName = action.data.card.name;

      TelegramBot.sendMessage(chatId, 'new card added to Life: ' + cardName);
    }
  }

  private validateSignature(data, signature) {
    const secret = config.get('services.trello.appSecret');

    const base64Digest = s => {
      return crypto
        .createHmac('sha1', secret)
        .update(s)
        .digest('base64');
    };

    var content = JSON.stringify(data) + this.webhookUrl;
    var doubleHash = base64Digest(content);

    if (doubleHash !== signature) {
      throw authorizationError();
    }

    return true;
  }
}

const appKey = config.get('services.trello.appKey');
const token = config.get('services.trello.apiToken');
const trello = new Trello(appKey, token);

export default trello;
