import { Webhookable } from 'services';
const Telegram = require('node-telegram-bot-api');
const config = require('../config');

class TelegramBot implements Webhookable {
  private bot;

  constructor(token: string) {
    this.bot = new Telegram(token);
  }

  get name() {
    return 'telegram';
  }

  public setWebhook(url: string): void {
    const callbackUrl = `${url}?secret=${config.get(
      'services.telegram.apiSecret'
    )}`;
    this.bot.setWebHook(callbackUrl);
  }

  public handleWebhook(data: any, secret: string): void {
    this.authorizeRequest(secret);

    const chatId = data.chat.id;
    this.bot.sendMessage(chatId, 'got you');
  }

  public sendMessage(chatId: string, message: string): void {
    this.bot.sendMessage(chatId, message);
  }

  private authorizeRequest(secret) {
    if (token !== config.get('services.telegram.apiSecret')) {
      throw new Error('error authorizing request');
    }

    return true;
  }
}

const token = config.get('services.telegram.token');
const bot = new TelegramBot(token);

export default bot;
