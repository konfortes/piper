import TelegramBot from './telegram-bot';
import Trello from './trello';
const config = require('../config');

export interface Webhookable {
  name: string;
  setWebhook: (callbackUrl: string) => void;
  handleWebhook: (data: any, auth: string) => void;
}

const webhookServices: Array<Webhookable> = [TelegramBot, Trello];

export function setWebhooks() {
  const basePublicUrl = config.get('publicUrl');

  for (const service of webhookServices) {
    service.setWebhook(basePublicUrl + `/${service.name}/webhook`);
  }
}
