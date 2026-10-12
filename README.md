# HLAE-Next-Site

HLAE中文站 —— CS视频制作相关导航与资源集合的中文门户网站。

> this time with Next.js

## 开发

### 技术栈

Next.js(React) + TypeScript + TailwindCSS

### 环境

需要 `nodejs bun`，安装 `node` 后可用 `npm i -g bun` 安装后者。

### 安装依赖

```bash
bun i
```

### 本地开发

```bash
bun dev
```

### 构建

```bash
bun run build
```

### 参与项目

提交 Pull Requests 说明改动的目的。

### 验证与生产预览

```bash
bun install --frozen-lockfile
bun run lint
bun run typecheck
bun test
bun run build
# standalone 产物需要静态资源一并复制
cp -R public .next/standalone/public
cp -R .next/static .next/standalone/.next/static
HOSTNAME=127.0.0.1 PORT=3000 node .next/standalone/server.js
```

使用 `bun.lock` 文本锁文件；Docker 构建也使用同一锁文件。
当前保留 HeroUI 2 / Tailwind CSS 3；HeroUI 的 theme 间接依赖声明了
Tailwind CSS 4 peer 要求，后续整体迁移时需一并处理。

2026-10-12 使用 npm 官方 registry 执行依赖审计，刷新间接依赖后仍有
`braces`（high，最新版本尚未修复）和 `postcss-selector-parser`
（moderate，Tailwind 3 的间接依赖）两项告警。它们用于构建期的样式/文件匹配处理。
