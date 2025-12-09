# ───────────────────────────────────────────────────────────────
# Stage 1: Builder – Build ứng dụng
# ───────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS builder

WORKDIR /app

ENV NODE_ENV=production


COPY package*.json ./


RUN npm ci --omit=dev && npm cache clean --force


COPY . .


RUN npm run build


# ───────────────────────────────────────────────────────────────
# Stage 2: Runner – Image chạy Production
# ───────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production


COPY package*.json ./


RUN npm ci --omit=dev && npm cache clean --force


COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public



EXPOSE 5000

CMD ["npm", "start"]
