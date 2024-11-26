# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1-alpine AS base
FROM alpine:3.20 AS optim

# 依赖
FROM base AS dependency-stage
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --registry=https://registry.npmmirror.com

# 构建
FROM base AS build-stage
ENV NODE_ENV=production
WORKDIR /app
COPY . .
COPY --from=dependency-stage /app/node_modules /app/node_modules
RUN bun test
RUN bun run build

# 优化
FROM optim AS optim-stage
RUN apk add upx
COPY --from=base /usr/local/bin/bun /usr/local/bin/
WORKDIR /usr/local/bin
# Compress bun binary
RUN upx --all-methods --no-lzma bun

# 打包
FROM frolvlad/alpine-glibc AS release-stage
RUN apk add --no-cache libstdc++
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 bun
RUN adduser --system --uid 1001 bun

COPY --from=optim-stage /usr/local/bin/bun /usr/local/bin/
COPY --from=build-stage /app/public /app/public
COPY --from=build-stage --chown=bun:bun /app/.next/standalone /app/
COPY --from=build-stage --chown=bun:bun /app/.next/static /app/.next/static

# 运行服务
USER bun
EXPOSE 3000/tcp
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
ENTRYPOINT [ "bun", "run", "server.js" ]
