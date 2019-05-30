# Piper

## Integrate services

### API

documentation can be found on `/docs`

### Trello

to register a webhook, run:

```bash
curl -X POST -H "Content-Type: application/json" \
https://api.trello.com/1/tokens/{APIToken}/webhooks/ \
-d '{
  "key": "56e1506799c97dea920f7229c75c6c39",
  "callbackURL": "http://99e80dc0.ngrok.io/trello/webhook",
  "idModel":"5cdd4be7a4bbe37af39abd29",
  "description": "Life board hook"
}'
```

- your AppKey can be found on [http://trello.com/app-key](http://trello.com/app-key).
- using the AppKey you can get APIToken: browse [Authorize](https://trello.com/1/authorize?expiration=7day&name=PiperToken&scope=read,write&response_type=token&key={YourAppKey})
- to find board url browse to the board and add .json at the end.
- set token on you ENV to authorize signature.
- debugging webhooks curls:

```bash
curl https://api.trello.com/1/tokens/$TOKEN/webhooks\?key\=56e1506799c97dea920f7229c75c6c39
curl -XDELETE https://api.trello.com/1/tokens/$TOKEN/webhooks/5cf01a9c2f0d3c889d2651e0\?key\=56e1506799c97dea920f7229c75c6c39
```

### Telegram

- create a bot through BotFather
- The Bot initialization will register the webhook. if you need to register manually - use the token to register webhook:

```bash
TOKEN= <YOUR_TOKEN>
URL= <WEBHOOK_URL>
curl https://api.telegram.org/bot$TOKEN/setWebhook\?url\=$URL
```

- set token in your ENV
- create ssl certificate:

```bash
# Our private cert will be key.pem, keep this file private
$ openssl genrsa -out certs/key.pem 2048

# Our public certificate will be crt.pem
$ openssl req -new -sha256 -key certs/key.pem -out certs/crt.pem
```

### Troubleshooting

- webhooks refuses to be received - revoke token!
