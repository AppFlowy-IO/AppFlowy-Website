# Use the official Node.js image as a base image
FROM node:20

RUN apt-get update && apt-get install -y supervisor

# Create and change to the app directory
WORKDIR /app

COPY . .

COPY supervisord.conf /app/supervisord.conf

RUN chmod +x /app/supervisord.conf

EXPOSE 3000

CMD ["supervisord", "-c", "/app/supervisord.conf"]