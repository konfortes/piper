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

  public setWebhook(callbackUrl: string): void {
    this.bot.setWebHook(callbackUrl);
  }

  public handleWebhook(data: any): void {
    const chatId = data.chat.id;
    this.bot.sendMessage(chatId, 'got you');
  }

  public sendMessage(chatId: string, message: string): void {
    this.bot.sendMessage(chatId, message);
  }
}

const token = config.get('services.telegram.token');
const bot = new TelegramBot(token);

export default bot;
