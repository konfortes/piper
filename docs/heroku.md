# Heroku workflow

Install heroku cli

```bash
brew install heroku/brew/heroku
```

Login

```bash
heroku login
```

Create the app (also adding a new remote)

```bash
heroku create mypiper
git remote -v
heroku	https://git.heroku.com/mypiper.git (fetch)
heroku	https://git.heroku.com/mypiper.git (push)
origin	git@github.com:konfortes/piper.git (fetch)
origin	git@github.com:konfortes/piper.git (push)
```

Setting environment variables (can use the web ui)

```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=3001
heroku config:set PUBLIC_URL=https://mypiper.herokuapp.com
heroku config:set TRELLO_APP_KEY=
heroku config:set TRELLO_API_TOKEN=
heroku config:set TRELLO_APP_SECRET=
heroku config:set TRELLO_WEBHOOK_MODEL_ID=
heroku config:set TELEGRAM_TOKEN=
heroku config:set TELEGRAM_API_SECRET=
heroku config:set TELEGRAM_ACCOUNT_MASTER_CHAT_ID=616941509
```

DON'T forget **PUBLIC_URL**

Deploy the app

```bash
git push heroku master
```

App url can be found by

```bash
heroku open
```

Logs can be seen by

```bash
heroku logs --tail
```

To restart an app

```bash
heroku restart
```

test master triggers deploy
