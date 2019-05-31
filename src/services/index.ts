import TelegramBot from './telegram-bot';
import Trello from './trello';

// TODO: pass webhook params to the method
interface Webhookable {
  setWebhook: (any?) => void;
}

export const webhookServices: Array<Webhookable> = [TelegramBot, Trello];
