export PORT=3001
ngrok http ${PORT} > /dev/null &

export PUBLIC_URL=$(curl -s 'http://127.0.0.1:4040/api/tunnels' | jq -r '.tunnels[0].public_url' | sed -e 's/http:/https:/')

./node_modules/.bin/nodemon -e ts --exec 'ts-node --files ./src/web/server.ts'