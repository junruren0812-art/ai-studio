# 端侧 AI Studio · 电商素材工作流

一个可独立运行、可部署到任意静态托管服务的中文交互原型。它演示电商商品素材从原图、抠图、场景生成、局部编辑，到多 SKU 批量适配、任务调度与异常恢复的完整产品体验。

> 本项目是纯前端交互演示。界面中的模型运行、显存、队列、生成进度和恢复数据均为本地模拟，不会调用真实模型。

## 项目特性

- **纯前端**：无后端服务、数据库或服务端会话。
- **无账号**：不包含登录、企业认证或访问控制。
- **无遥测**：不采集使用数据，不加载分析 SDK，不发送诊断信息。
- **无云推理**：不会上传图片、提示词、蒙版或生成结果，也没有云端模型兜底。
- **无运行时远程资源**：字体采用系统字体；图标随 JavaScript 打包；商品和场景图形由本地 CSS/HTML 绘制；不使用 CDN、远程字体或远程图片。
- **静态可部署**：构建结果只有 HTML、CSS 和 JavaScript，可部署到通用静态网站服务。

页面“来源”抽屉包含可由用户主动打开的 GitHub、Hugging Face 等公开资料链接。这些链接仅用于查阅，不参与页面渲染和应用运行。

## 三种信息模式

界面默认采用面向初学者的分层呈现。切换模式只改变信息密度，不会清空当前 SKU、画布阶段、任务队列或创作方案。

- **任务模式（默认）**：围绕“你想完成什么”选择商品场景、背景替换、局部修改或渠道适配；隐藏模型名、精度与框架。
- **创作模式**：展示创作描述、主体占比、光影、输出质量等能力控制；技术实现仍收纳在“查看技术详情”中。
- **工作流模式**：面向需要排查和配置的用户，直接展示创作引擎、精度、版本、运行框架、设备预算和调度信息。

产品界面坚持“用户选择结果，系统负责匹配创作方案”。日常商品创作与高质量商品精修使用业务名称呈现，底层模型及许可证只在技术详情或工作流模式出现。

## 术语分层

顶部“术语”入口提供固定的技术词映射，例如：模型对应“创作能力 / 创作引擎”，模型路由对应“自动匹配创作方案”，辅助模型对应“创作工具”，推理步数对应“生成精细度”，量化对应“设备适配版本”。默认任务界面不重复解释这些术语，避免干扰主创作流程。

## 开源技术栈

- [React](https://react.dev/)：界面与状态管理
- [TypeScript](https://www.typescriptlang.org/)：静态类型
- [Vite](https://vite.dev/)：开发服务器与生产构建
- [Tailwind CSS](https://tailwindcss.com/)：样式工具类
- [Radix UI](https://www.radix-ui.com/)：Dialog、Progress、Slot 等无样式基础组件
- [Lucide](https://lucide.dev/)：本地图标组件
- `class-variance-authority`、`clsx`、`tailwind-merge`：组件样式组合工具

直接生产依赖的许可证和官方主页见 [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md)。

## 环境要求

- Node.js `>= 18`，推荐使用当前 Node.js LTS
- pnpm `>= 9`

项目不依赖私有 npm registry。依赖均可从公开 npm registry 安装。

## 本地开发

```bash
pnpm install
pnpm dev
```

默认开发地址为 `http://localhost:5173`。如需允许同一局域网中的设备访问：

```bash
pnpm dev -- --host 0.0.0.0
```

## 构建与本地预览

```bash
pnpm build
pnpm preview
```

生产文件输出到 `dist/`。`pnpm preview` 默认在本机启动静态预览服务器。

## 静态托管

运行 `pnpm build` 后，将 `dist/` 目录中的全部文件上传到任意静态托管服务即可，例如：

- GitHub Pages
- GitLab Pages
- Cloudflare Pages
- Netlify
- Vercel 静态站点
- Amazon S3 / 兼容对象存储静态网站
- Nginx、Caddy 或其他普通静态文件服务器

应用没有客户端路由依赖，入口为 `dist/index.html`；无需配置 SPA 回退规则，也不需要注入环境变量。

## 目录结构

```text
.
├── index.html                  # Vite HTML 入口
├── src/
│   ├── App.tsx                 # 顶部导航与页面切换
│   ├── data.ts                 # 演示数据与公开资料链接
│   ├── index.css               # 全局样式、工作台和商品插画
│   ├── main.tsx                # React 启动入口
│   ├── components/
│   │   ├── OverviewPage.tsx    # 产品概览与 MVP 边界
│   │   ├── ModelPlanPage.tsx   # 模型与硬件方案
│   │   ├── EvaluationPage.tsx  # 客观/主观评估体系
│   │   ├── StudioWorkspace.tsx # 三栏工作台交互
│   │   ├── ProductArtwork.tsx  # 本地 CSS 商品场景
│   │   ├── TaskRecoveryPage.tsx# 队列、设备与恢复模拟
│   │   ├── SourceDrawer.tsx    # 公开来源抽屉
│   │   └── ui/                 # 基础 UI 组件
│   └── lib/                    # 通用工具函数
├── THIRD_PARTY_NOTICES.md      # 直接生产依赖与许可证
├── package.json
└── vite.config.ts
```

## 接入真实本地推理后端

当前所有生成和调度状态都封装在 React 组件的本地状态中。接入桌面端或本机推理服务时，建议保持 UI 与推理实现解耦，并新增一层明确的客户端接口，例如：

```ts
export interface LocalInferenceClient {
  getDeviceStatus(): Promise<DeviceStatus>
  listModelPackages(): Promise<ModelPackage[]>
  submitTask(input: LocalTaskInput): Promise<{ taskId: string }>
  getTask(taskId: string): Promise<LocalTaskState>
  subscribeTask(taskId: string, onChange: (state: LocalTaskState) => void): () => void
  pauseTask(taskId: string): Promise<void>
  resumeTask(taskId: string): Promise<void>
  cancelTask(taskId: string): Promise<void>
  restoreQueue(): Promise<LocalTaskState[]>
}
```

推荐的接口边界：

1. **浏览器 UI 不直接加载模型权重**：由本机进程、桌面应用桥接层或仅监听回环地址的服务管理模型。
2. **任务协议与模型实现解耦**：UI 提交业务语义，如 SKU、阶段、选区、质量档和渠道比例，不直接绑定推理节点实现。
3. **明确本地安全边界**：服务只监听 `127.0.0.1` 或使用桌面 IPC；默认拒绝跨域和局域网访问；输入路径需规范化与授权。
4. **保持可恢复语义**：后端返回真实任务阶段、检查点和持久化状态；UI 不使用乐观动画伪装推理进度。
5. **集中替换模拟层**：优先从 `StudioWorkspace.tsx` 的生成状态和 `TaskRecoveryPage.tsx` 的队列状态迁移到独立 client/hook，不改动画布与展示组件。
6. **错误可操作**：统一返回错误类型、受影响项目、已保留内容和可执行的恢复动作。

真实后端并非本仓库的一部分。接入后应单独完成模型许可证、进程网络权限、文件访问、跨域策略和设备兼容性审计。

## 隐私与网络说明

应用运行不需要网络。除用户主动点击“来源”抽屉中的公开资料链接外，前端代码没有 `fetch`、XHR、WebSocket、远程图片、远程字体、遥测或账号请求。构建和安装依赖时，包管理器会访问公开 npm registry；这与应用运行时网络行为无关。
