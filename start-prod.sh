#!/bin/bash

APP_NAME="official-website"

# check if app is running
pm2 show $APP_NAME > /dev/null 2>&1

STATUS=$?

if [ $STATUS -ne 0 ]; then
  # if app is not running, start it
  pm2 start --name $APP_NAME --interpreter pnpm -- start
else
  # if app is running, restart it
  pm2 restart $APP_NAME --wait-ready
fi

# Save the process list and restart it when the machine reboots
pm2 save