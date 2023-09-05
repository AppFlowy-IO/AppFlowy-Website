#!/bin/bash

APP_NAME="official-website"

pm2 show $APP_NAME > /dev/null 2>&1

STATUS=$?

if [ $STATUS -ne 0 ]; then
  pm2 start --name $APP_NAME --log ../log/app.log --interpreter pnpm -- start
else
  pm2 restart $APP_NAME --wait-ready
fi

pm2 save