# Piper

## Integrate services

### How to use it:

set **PUBLIC_URL** in your env. this is the base url for the webhooks.

### Trello

In order for the trello webhook to work, set these env vars:

- **TRELLO_APP_KEY** (can be found on [http://trello.com/app-key](http://trello.com/app-key))
- **TRELLO_APP_SECRET** (can be found on the bottom of [http://trello.com/app-key](http://trello.com/app-key))
- **TRELLO_API_TOKEN** - using the AppKey you can get APIToken: [Authorize](https://trello.com/1/authorize?expiration=30days&name=PiperToken&scope=read,write&response_type=token&key={YourAppKey})

#### debugging webhooks curls:

```bash
curl https://api.trello.com/1/tokens/$TOKEN/webhooks\?key\=56e1506799c97dea920f7229c75c6c39

curl -XDELETE https://api.trello.com/1/tokens/$TOKEN/webhooks/5cf01a9c2f0d3c889d2651e0\?key\=56e1506799c97dea920f7229c75c6c39
```

### Telegram

in order for the Telegram bot hooks and client to work, set your env with **TELEGRAM_TOKEN** (which can be given by BotFather) and **TELEGRAM_API_SECRET** which is a randomly generated private secret.

#### to manually set a hook:

```bash
TOKEN= <YOUR_TOKEN>
URL= <WEBHOOK_URL>
curl https://api.telegram.org/bot$TOKEN/setWebhook\?url\=$URL
```

#### create ssl certificate:

```bash
# Our private cert will be key.pem, keep this file private
$ openssl genrsa -out certs/key.pem 2048

# Our public certificate will be crt.pem
$ openssl req -new -sha256 -key certs/key.pem -out certs/crt.pem
```

### Troubleshooting

- webhooks refuses to be received - revoke token!
