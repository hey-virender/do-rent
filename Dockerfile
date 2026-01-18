# ---------- BASE ----------
FROM node:20-alpine AS base
WORKDIR /app

# ---------- DEPS ----------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---------- BUILDER ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI



RUN npx prisma generate

RUN npm run build

# ---------- RUNNER ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/generated ./generated

EXPOSE 3000
CMD ["sh", "-c", "npm start"]