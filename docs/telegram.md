# Telegram

in order for the Telegram bot hooks and client to work, set your app env with the vars:

- **TELEGRAM_TOKEN**: can be given by BotFather
- **TELEGRAM_API_SECRET**: a randomly generated private secret.
- **TELEGRAM_ACCOUNT_MASTER_CHAT_ID**: the chat id of the account master. can be found by adding the bot to a chat and than get updates and find the chat id in the payload.

Webhooks will be registered automatically on app startup.  
if for some reason you need to manually set webhooks, use:

```bash
TOKEN= <YOUR_TOKEN>
URL= <WEBHOOK_URL>
curl https://api.telegram.org/bot$TOKEN/setWebhook\?url\=$URL
```
