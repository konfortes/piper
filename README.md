# Piper

## Integrate services

This repo is configured to automatically trigger Heroku deploy on master push

### How to run

set your env with

_General:_

- **PUBLIC_URL** - webhooks base url (ngrok for localhost). must be https.

_Trello:_ (see instructions on [trello](./docs/trello.md))

- **TRELLO_APP_KEY**
- **TRELLO_APP_SECRET**
- **TRELLO_API_TOKEN**
- **TRELLO_WEBHOOK_MODEL_ID**

_Telegram:_ (see instructions on [telegram](./docs/telegram.md))

- **TELEGRAM_TOKEN**
- **TELEGRAM_API_SECRET**
- **TELEGRAM_ACCOUNT_MASTER_CHAT_ID**

### Troubleshooting

- webhooks refuses to be received - `revoke token!`
- npm run dev fails with can't execute - `chmod u+x dev-start.sh`
