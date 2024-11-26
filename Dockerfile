# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base

# 依赖
FROM base AS dependency-stage
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --registry=https://registry.npmmirror.com

# 构建
FROM base AS build-stage
WORKDIR /app
ENV NODE_ENV=production
COPY . .
COPY --from=dependency-stage /app/node_modules /app/node_modules
RUN bun test
RUN bun run build

# 打包
FROM base AS release-stage
WORKDIR /app
COPY --from=build-stage /app/.nextjs/standalone /app/

# 运行服务
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "server.js" ]