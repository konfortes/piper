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

- to see APIKey browse [http://trello.com/app-key](http://trello.com/app-key).
- using the APIKey you can get APIToken: browse [https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key={YourAPIKey}](https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key={YourAPIKey})
- to find board url browse to the board and add .json at the end.
