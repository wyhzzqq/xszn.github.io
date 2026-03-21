> [!TIP]
> 复制以下 AI 提示词及全文进行 LLM 辅助开发。不包含此行信息！

我想让你充当 Stackoverflow 的帖子。我将提出与编程有关的问题，你将回答答案是什么。我希望你只回答给定的答案，在没有足够的细节时写出解释。我将提供关于我的项目 README.md 的具体信息，你的任务是使用 JavaScript 和 Vue 开发静态网站。

# VitePress Plus

集成 UI 组件库的静态站点生成器。

## 技术选型

- VitePress
- JavaScript
- TypeScript
- Vue
- Flowbite Vue
- Tailwind CSS
- PostCSS

## 文件结构

```
.
├── .vitepress
│   ├── config
│   │   ├── head.js
│   │   ├── nav.js
│   │   ├── sidebar.js
│   │   ├── social.js
│   │   └── theme.js
│   ├── theme
│   │   ├── components
│   │   │   ├── Ads.vue
│   │   │   └── index.ts
│   │   ├── plugins
│   │   │   ├── index.js
│   │   │   └── medium-zoom.js
│   │   ├── custom.css
│   │   ├── index.js
│   │   ├── Layout.vue
│   │   └── style.css
│   └── config.mjs
├── src
│   ├── public
│   │   ├── images
│   │   ├── .nojekyll
│   │   ├── CNAME
│   │   ├── favicon.ico
│   │   └── robots.txt
│   └── index.md
├── .gitignore
├── package.json
├── postcss.config.mjs
└── README.md
```

> [!NOTE]
> 由 [Tree 树形目录可视化生成器](https://devtool.tech/tree)提供。

## 安装

### 前置准备

- [Node.js](https://nodejs.org/zh-cn) 18 及以上版本。
- 通过命令行界面 (CLI) 访问 VitePress 的终端。
- 支持 Markdown 语法的编辑器。
- 推荐 [VSCode](https://code.visualstudio.com/) 及其[官方 Vue 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。

### 存储库克隆

```
git clone git@github.com:xszn/vitepress-plus.git
```

### 依赖安装

```
npm i
```

### 启动并运行

```
npm run dev
```

## 配置文件

- `.vitepress/config.mjs`
- `.vitepress/config/themeConfig.js`
- `src/index.md`
- `src/public/CNAME`
- `src/public/favicon.ico`
- `src/public/robots.txt`
- `src/public/images/logo.svg`

## 部署

- 构建命令： `npm run build`
- 输出目录： `.vitepress/dist`
- node 版本： `20` (或更高版本)

详情信息请移步 [GitHub Pages 部署指南](https://vitepress.dev/zh/guide/deploy#github-pages)。

## 组件使用

1. 访问组件源代码 `node_modules/flowbite-vue/src/components` 目录。
2. 将需要的组件文件夹复制到 `.vitepress/theme/components`。
3. 参考组件模块文件 `node_modules/flowbite-vue/src/index.ts` 的模块导出。
4. 写至 `.vitepress/theme/components/index.ts`。

> [!IMPORTANT]
> 请使用“.”替代“@”的路径指向。
