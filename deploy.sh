#!/bin/bash

rm -rf .next .env public Dockerfile supervisord.conf package.json next.config.mjs next.config.js env.js node_modules _blog

tar -xzf build-output.tar.gz

rm build-output.tar.gz

docker system prune -f

docker build -t official-website-app .

docker rm -f official-website-app || true

docker run -d --env-file .env -p 30013:3000 --restart always --name official-website-app official-website-app
