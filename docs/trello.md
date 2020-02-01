# Trello

In order for the trello webhooks and client to work, set your app env with the vars:

- **TRELLO_APP_KEY:** (Can be found on [http://trello.com/app-key](http://trello.com/app-key)).
- **TRELLO_APP_SECRET:** (Can be found on the bottom of [http://trello.com/app-key](http://trello.com/app-key)).
- **TRELLO_API_TOKEN:** Using the AppKey you can get APIToken: [Authorize](https://trello.com/1/authorize?expiration=30days&name=PiperToken&scope=read,write&response_type=token&key={YourAppKey}) (switch {YourAppKey} with your actual app ley).
- **TRELLO_WEBHOOK_MODEL_ID:** The id of the model for which you want to receive the hooks.  
  \* To get the model id - browse to the board view on the web and add _.json_ at the end.

## debugging webhooks curls

Get webhook for specific app:

```bash
curl https://api.trello.com/1/tokens/$TRELLO_API_TOKEN/webhooks\?key\=$TRELLO_APP_KEY
```

Delete webhook

```bash
curl -X DELETE https://api.trello.com/1/tokens/$TRELLO_API_TOKEN/webhooks/<THE_WEBHOOK_ID>\?key\=$TRELLO_APP_KEY

```
