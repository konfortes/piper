import { authorizationError } from '../../utils/errors-factory';
const config = require('../../config');
import axios from 'axios';
import crypto from 'crypto';
import logger from '../../utils/logger';
import TelegramBot from '../telegram-bot';
import { Webhookable } from 'services';
import { TrelloClient } from './client';

const BASE_API_URL = 'https://api.trello.com/1';

export enum TrelloAction {
  createCard = 'createCard'
}

interface List {
  id: string;
  name: string;
}

interface Card {
  id: string;
  closed: boolean;
  name: string;
  due: string;
}

class Trello implements Webhookable {
  private webhookUrl: string;
  private client: TrelloClient;

  constructor(private appKey: string, private token: string, private boardId) {
    this.webhookUrl = '';
    this.client = new TrelloClient(this.boardId);
  }

  get name() {
    return 'trello';
  }

  public async getLists(): Promise<Array<List>> {
    return this.client.getLists();
  }

  public async getCards(listId: string): Promise<Array<Card>> {
    const cards = await this.client.getCards();

    const listCards = cards.filter(card => card.idList === listId);
    return listCards;
  }

  public async moveCard(cardId: string, listId: string) {
    const update = {
      idList: listId
    };

    this.client.updateCard(cardId, update);
  }

  // TODO: use client
  public async setWebhook(url: string) {
    this.webhookUrl = url;
    const setWebhookUrl = `${BASE_API_URL}/tokens/${this.token}/webhooks`;
    const body = {
      key: this.appKey,
      callbackURL: url,
      idModel: this.boardId,
      description: 'Piper Webhook'
    };

    try {
      await axios.post(setWebhookUrl, body);
      logger.info('trello webhook was successfully set');
    } catch (error) {
      logger.error(
        'error setting Trello webhook: ' +
          JSON.stringify(error.response.data, null, 4)
      );
    }
  }

  public handleWebhook(data: any, signature: string): void {
    this.validateSignature(data, signature);

    const action = data.action;

    if (action.type === TrelloAction.createCard) {
      const cardShortURL = action.data.card.shortUrl;

      TelegramBot.updateAccountMaster(
        'new card added to Life: ' + cardShortURL
      );
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
// TODO: rename or use another config
const boardId = config.get('services.trello.webhookModelId');
const trello = new Trello(appKey, token, boardId);

export default trello;
