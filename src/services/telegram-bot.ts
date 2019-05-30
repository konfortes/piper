const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');

const token = config.get('services.telegram.token');
const webhookUrl = config.get('publicUrl') + '/telegram/webhook';

const bot = new TelegramBot(token);

// This informs the Telegram servers of the new webhook.
// bot.setWebHook(`${''}/bot${token}`, { certificate: 'path/to/crt.pem' });
bot.setWebHook(webhookUrl);

export default bot;
