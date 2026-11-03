
FROM node:22-trixie-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g nodemon

WORKDIR /app/Backend
EXPOSE 3000

CMD ["sh", "-c", "npm install && nodemon Server.js"]