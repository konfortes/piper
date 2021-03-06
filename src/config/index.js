const path = require('path');
const fs = require('fs');
const convict = require('convict');
require('dotenv').config();

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port'
  },
  publicUrl: {
    doc: 'a url which is publicly accessible',
    default: '',
    env: 'PUBLIC_URL'
  },
  logLevel: {
    doc: 'The default logger log level',
    format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
    default: 'info',
    env: 'LOG_LEVEL'
  },
  services: {
    trello: {
      appKey: {
        doc: 'api key for your trello app',
        default: '',
        env: 'TRELLO_APP_KEY'
      },
      apiToken: {
        doc: 'api access token',
        default: '',
        env: 'TRELLO_API_TOKEN'
      },
      appSecret: {
        doc: 'app secret',
        default: '',
        env: 'TRELLO_APP_SECRET'
      },
      webhookModelId: {
        doc: 'the id of the model to get hooks for',
        default: '',
        env: 'TRELLO_WEBHOOK_MODEL_ID'
      }
    },
    telegram: {
      token: {
        doc: 'the bot API token',
        default: '',
        env: 'TELEGRAM_TOKEN'
      },
      apiSecret: {
        doc: 'secret api token',
        default: '',
        env: 'TELEGRAM_API_SECRET'
      },
      accountMasterChatId: {
        doc: 'the chat id of the master of the account',
        default: '616941509',
        env: 'TELEGRAM_ACCOUNT_MASTER_CHAT_ID'
      }
    }
  }
});

// Load env specific configuration
const filePath = path.join(__dirname, `${config.get('env')}.json`);
if (fs.existsSync(filePath)) {
  config.loadFile(filePath);
}

config.validate({
  allowed: 'strict'
});

module.exports = config;