const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');

const token = config.get('services.telegram.token');
const webhookUrl = 'https://d165441d.ngrok.io/telegram/webhook';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token);
bot.on('message', m => console.log(m));

// This informs the Telegram servers of the new webhook.
// bot.setWebHook(`${''}/bot${token}`, { certificate: 'path/to/crt.pem' });
bot.setWebHook(webhookUrl);

export default bot;
