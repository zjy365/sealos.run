# Sealos.run - 官方网站

Sealos 的官方着陆页面，基于 Next.js 14+ 构建的现代化、高性能的企业级网站项目。

## 项目概述

这是一个多语言（中文/英文）的产品展示网站，包含产品介绍、博客系统、文档系统和私有云解决方案展示。

## 技术栈

### 核心框架
- **Next.js 16.1.1** - React 全栈框架（App Router）
- **React 19.2.3** - UI 库
- **TypeScript 5.9.3** - 类型系统

### UI 与样式
- **Tailwind CSS 4.1.18** - 原子化 CSS 框架
- **Radix UI** - 无头 UI 组件库（可访问性优先）
- **shadcn/ui** - 基于 Radix UI 的组件库
- **Motion 12.23.26** - 动画库

### 内容与国际化
- **next-intl 4.6.1** - 多语言支持（中文/英文）
- **Fumadocs** - 文档框架与 MDX 支持
- **@orama/orama** - 全文搜索引擎

### 工具与工程
- **Biome 2.3.10** - 代码质量工具
- **pnpm 10.17.0** - 包管理器
- **Sharp** - 图像优化
- **SVGO** - SVG 优化

## 项目结构

```
sealos.run/
├── app/                          # Next.js App Router 应用入口
│   ├── [locale]/                 # 国际化路由容器
│   │   ├── (landing)/            # 着陆页面路由组
│   │   │   ├── (home)/           # 主页
│   │   │   ├── products/         # 产品页面
│   │   │   │   ├── database/     # 数据库产品
│   │   │   │   ├── devbox/       # DevBox 开发环境
│   │   │   │   ├── launchpad/    # Launchpad 应用启动器
│   │   │   │   ├── oss/          # 对象存储
│   │   │   │   └── aiproxy/      # AI 代理
│   │   │   ├── blog/             # 博客系统
│   │   │   └── private-cloud/    # 私有云页面
│   │   └── docs/                 # 文档系统
│   └── api/                      # API 路由
│       └── search/               # 搜索 API
├── libs/                         # 共享库和组件
│   ├── components/               # React 组件库
│   │   ├── ui/                   # 基础 UI 组件（Button、Card 等）
│   │   ├── Navbar/               # 导航栏组件
│   │   └── prose/                # 文档相关组件
│   ├── i18n/                     # 国际化配置
│   │   ├── routing.ts            # 路由配置
│   │   ├── messages/             # 翻译文件（en.json, zh.json）
│   │   └── ...
│   ├── blog/                     # 博客工具和类型
│   ├── docs/                     # 文档工具
│   ├── utils/                    # 工具函数
│   └── config.tsx                # 站点配置
├── assets/                       # SVG 图标和资源
│   ├── icons/                    # 110+ 通用图标（≤6KB 自动内联）
│   ├── app-icons/                # 应用技术栈图标（30+）
│   └── app-boxes/                # 产品卡片图标
├── public/                       # 静态资源
│   ├── favicon/                  # Favicon 和应用图标
│   └── sealos.svg                # Logo 文件
├── content/                      # MDX 内容
│   ├── docs/                     # 文档内容
│   └── blog/                     # 博客文章
├── scripts/                      # 构建脚本
│   ├── generate-sealos-icons.ts  # 图标组件生成器
│   └── turbopack-inline-svg-loader.cjs  # SVG 加载器
└── .github/workflows/            # GitHub Actions CI/CD
```

## 主要功能模块

### 1. 产品展示系统
五个主要产品页面，每个都包含：
- Hero Section - 产品介绍
- Features Section - 功能特性
- CTA Section - 行动号召
- 特殊 Sections（如 DevBox 的最佳实践）

**产品列表：**
- **Database** - 数据库解决方案
- **DevBox** - 云端开发环境
- **Launchpad** - 应用快速部署
- **OSS** - 对象存储服务
- **AIProxy** - AI 代理服务

### 2. 博客系统
- 文章列表与详情页
- 9 个分类支持
- 全文搜索功能
- 社交分享（微博、微信、QQ、链接复制）
- MDX 内容管理

### 3. 文档系统
- Fumadocs 驱动
- MDX 支持
- 全文搜索
- 多语言支持

### 4. 导航与布局
- 响应式导航栏
- 产品下拉菜单
- 多语言切换器
- Footer 组件（社交媒体、法律链接）

### 5. 国际化
- 支持中文（默认）和英文
- 使用 next-intl 实现
- 翻译文件位于 `/libs/i18n/messages/`

## 开发

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

### 生成图标组件
```bash
pnpm generate:icons
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

### 启动生产服务器
```bash
pnpm start
```

## 配置文件说明

| 文件 | 用途 |
|------|------|
| `next.config.ts` | Next.js 配置（包含 Turbopack、国际化等） |
| `source.config.ts` | Fumadocs MDX 配置 |
| `biome.jsonc` | Biome 代码质量工具配置 |
| `components.json` | shadcn/ui 配置 |
| `tailwind.config.ts` | Tailwind CSS 主题和插件配置 |
| `tsconfig.json` | TypeScript 编译器配置 |
| `Dockerfile` | 多阶段 Docker 构建配置 |

## 特色技术选择

1. **SVG 优化** - 使用自定义 Turbopack loader 自动内联小于 6KB 的 SVG 图标
2. **Fumadocs** - 专业的文档框架集成，提供出色的文档体验
3. **Radix UI + shadcn** - 可访问性优先的无头组件库 + 精美的组件实现
4. **Orama** - 轻量级的客户端全文搜索解决方案
5. **Motion** - 流畅的动画和交互效果
6. **next-intl** - 企业级的国际化解决方案

## 部署

项目支持多种部署方式：

### Docker
```bash
docker build -t sealos-run .
docker run -p 3000:3000 sealos-run
```

### GitHub Actions
项目包含 CI/CD 工作流，支持自动化预览和生产部署。

## 许可证

[待补充]

## 贡献

[待补充]
