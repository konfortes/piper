# Trello

In order for the trello webhooks and client to work, set your app env with the vars:

- **TRELLO_APP_KEY:** (Can be found on [http://trello.com/app-key](http://trello.com/app-key)).
- **TRELLO_APP_SECRET:** (Can be found on the bottom of [http://trello.com/app-key](http://trello.com/app-key)).
- **TRELLO_API_TOKEN:** Using the AppKey you can get APIToken: [Authorize](https://trello.com/1/authorize?expiration=30days&name=PiperToken&scope=read,write&response_type=token&key={YourAppKey}) (swith {YourAppKey} with your actual app ley).
- **TRELLO_WEBHOOK_MODEL_ID:** The id of the model for which you want to receive the hooks.  
  \* To get the model id - browse to the board view on the web and add _.json_ at the end.

#### debugging webhooks curls:

```bash
curl https://api.trello.com/1/tokens/$TOKEN/webhooks\?key\=56e1506799c97dea920f7229c75c6c39

curl -XDELETE https://api.trello.com/1/tokens/$TOKEN/webhooks/5cf01a9c2f0d3c889d2651e0\?key\=56e1506799c97dea920f7229c75c6c39
```
