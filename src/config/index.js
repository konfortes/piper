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
    default: 5001,
    env: 'PORT',
    arg: 'port'
  },
  logLevel: {
    doc: 'The default logger log level',
    format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
    default: 'info',
    env: 'LOG_LEVEL'
  }
});

// Load env specific configuration
const filePath = path.join(__dirname, `${config.get('env')}.json`);
if (fs.existsSync(filePath)) {
  config.loadFile(filePath);
}

config.validate({ allowed: 'strict' });

module.exports = config;
