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
      }
    },
    telegram: {
      token: {
        doc: 'the bot API token',
        default: '',
        env: 'TELEGRAM_TOKEN'
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