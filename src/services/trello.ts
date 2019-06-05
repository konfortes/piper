import { authorizationError } from './../utils/errors-factory';
const config = require('../config');
import axios from 'axios';
import crypto from 'crypto';
import logger from '../utils/logger';
import TelegramBot from './telegram-bot';
import { Webhookable } from 'services';

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

  constructor(private appKey: string, private token: string, private boardId) {
    this.webhookUrl = '';
  }

  get name() {
    return 'trello';
  }

  public async getLists(): Promise<Array<List>> {
    let url = `${BASE_API_URL}/boards/${this.boardId}/lists`;
    url = this.addAuth(url);
    const response = await axios.get(url);

    return response.data || [];
  }

  public async getCards(listId: string): Promise<Array<Card>> {
    let url = `${BASE_API_URL}/boards/${this.boardId}/cards`;
    url = this.addAuth(url);
    const response = await axios.get(url);
    const cards = response.data || [];

    const listCards = cards.filter(card => card.idList === listId);
    return listCards;
  }

  public async moveCard(cardId: string, listId: string) {
    let url = `${BASE_API_URL}/boards/${this.boardId}/cards/cardId`;
    url = this.addAuth(url);
    await axios.get(url);
  }

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
      const cardName = action.data.card.name;

      TelegramBot.updateAccountMaster('new card added to Life: ' + cardName);
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

  private addAuth(url: string): string {
    const key = config.get('services.trello.appKey');
    const token = config.get('services.trello.apiToken');
    return url + `?key=${key}&token=${token}`;
  }
}

const appKey = config.get('services.trello.appKey');
const token = config.get('services.trello.apiToken');
// TODO: rename or use another config
const boardId = config.get('services.trello.webhookModelId');
const trello = new Trello(appKey, token, boardId);

export default trello;
