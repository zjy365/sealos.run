# sealos.run - 官方网站

Sealos 的官方网站，基于 Next.js 16 构建的网站项目。

## 技术栈

### UI 与样式

- **Tailwind CSS** - 原子化 CSS 框架
- **shadcn/ui** - 基于 Radix UI 的组件库
- **Motion** - 动画库

### 内容与国际化

- **next-intl** - 多语言支持（中文/英文）
- **Fumadocs** - 文档框架与 MDX 支持

## 开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 代码质量检查

```bash
pnpm lint:check
pnpm format:check
```

### 构建生产版本

```bash
pnpm build
```

## 部署

项目支持多种部署方式：

### Docker

```bash
docker build -t sealos-run .
docker run -p 3000:3000 sealos-run
```
