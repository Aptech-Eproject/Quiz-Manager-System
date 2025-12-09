FROM node:20-bookworm-slim

WORKDIR /app

ENV NPM_CONFIG_AUDIT=false
ENV NPM_CONFIG_FUND=false

COPY package*.json ./

RUN npm install --legacy-peer-deps && \
    npm cache clean --force

COPY . .

EXPOSE 5000

# Chạy chế độ dev (bật hot reload)
CMD ["npm", "run", "dev"]
