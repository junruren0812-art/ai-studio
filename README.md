# AI Studio 电商素材工作流原型

这是 AI Studio 电商素材工作流原型的**最新公开版本仓库**。公开仓库只保留当前稳定版本；历史版本已单独归档到仅仓库所有者可见的私有仓库。

> **在线体验：** [最新版本 Web](https://junruren0812-art.github.io/ai-studio/%E6%9C%80%E6%96%B0%E7%89%88%E6%9C%AC/%E7%89%88%E6%9C%AC-web%F0%9F%94%97/)（当前对应 v1.4）

## 目录结构

```text
.
├── README.md
├── index.html
└── 最新版本/
    ├── 版本-web🔗/    # 可直接部署的静态构建
    └── 源码/          # 当前版本的完整源码
```

## 本地运行

进入 `最新版本/源码` 后执行：

```bash
pnpm install --frozen-lockfile
pnpm dev
```

生成适合子路径部署的静态文件：

```bash
pnpm exec tsc -b
pnpm exec vite build --base=./
```

本项目为纯前端原型，无云推理兜底、无账号系统、无遥测。
