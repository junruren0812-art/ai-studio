# 第三方软件声明

本文件列出 `package.json` 中的**直接生产依赖**。版本与许可证依据当前安装包的 `package.json` 核验；传递依赖可通过 `pnpm-lock.yaml` 追溯。

| 软件包 | 当前解析版本 | 许可证 | 官方主页 / 仓库 |
|---|---:|---|---|
| `@radix-ui/react-dialog` | 1.2.0 | MIT | https://www.radix-ui.com/primitives / https://github.com/radix-ui/primitives |
| `@radix-ui/react-progress` | 1.1.17 | MIT | https://www.radix-ui.com/primitives / https://github.com/radix-ui/primitives |
| `@radix-ui/react-slot` | 1.4.0 | MIT | https://www.radix-ui.com/primitives / https://github.com/radix-ui/primitives |
| `class-variance-authority` | 0.7.1 | Apache-2.0 | https://github.com/joe-bell/cva |
| `clsx` | 2.1.1 | MIT | https://github.com/lukeed/clsx |
| `lucide-react` | 0.468.0 | ISC | https://lucide.dev/ / https://github.com/lucide-icons/lucide |
| `react` | 18.3.1 | MIT | https://react.dev/ / https://github.com/facebook/react |
| `react-dom` | 18.3.1 | MIT | https://react.dev/ / https://github.com/facebook/react |
| `tailwind-merge` | 2.6.1 | MIT | https://github.com/dcastil/tailwind-merge |

## 说明

- 本声明不是各许可证全文的替代品。分发构建产物时，应同时遵循对应软件包随附的许可证条款。
- 开发依赖（Vite、TypeScript、Tailwind CSS、PostCSS、Autoprefixer 及类型包）只用于本地构建，不作为独立运行时资源从网络加载。
- 应用中的 Lucide 图标会被打包进本地 JavaScript；界面不从图标 CDN 加载内容。
