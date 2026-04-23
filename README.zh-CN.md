<div align="center">
  <img src="src/assets/logo.png" alt="Motrix Next" width="128" height="128" style="border-radius: 24px;" />
  <h1>Motrix Next</h1>
  <p>一款功能完备的全平台下载管理器 —— 从底层彻底重构。</p>

  [![GitHub release](https://img.shields.io/github/v/release/AnInsomniacy/motrix-next.svg)](https://github.com/AnInsomniacy/motrix-next/releases)
  ![Build](https://img.shields.io/github/actions/workflow/status/AnInsomniacy/motrix-next/ci.yml?branch=main&label=Build)
  ![Total Downloads](https://img.shields.io/github/downloads/AnInsomniacy/motrix-next/total.svg)
  <br>
  ![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue.svg)
  ![Bundle Size](https://img.shields.io/badge/bundle%20size-~20MB-brightgreen.svg)

  [![Website](https://img.shields.io/badge/Website-E0A422?style=for-the-badge&logo=safari&logoColor=white)](https://motrix-next.pages.dev)
  [![Browser Extension](https://img.shields.io/badge/Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://github.com/AnInsomniacy/motrix-next-extension)
</div>

---

<div align="center">
  <table><tr>
    <td><img src="docs/media/screenshot-light.png" alt="浅色模式" width="400" /></td>
    <td><img src="docs/media/screenshot-dark.png" alt="深色模式" width="400" /></td>
  </tr><tr>
    <td align="center"><sub>浅色模式</sub></td>
    <td align="center"><sub>深色模式</sub></td>
  </tr></table>
</div>

## 目录

- [为什么选择 Motrix Next？](#为什么选择-motrix-next)
  - [全面重构了什么](#全面重构了什么)
  - [设计与动效](#设计与动效)
- [功能特性](#功能特性)
- [技术架构](#技术架构)
  - [架构优势](#架构优势)
  - [架构局限](#架构局限)
- [安装指南](#安装指南)
  - [macOS](#macos)
  - [Windows](#windows)
  - [Linux](#linux)
- [常见问题](#常见问题)
- [开发指南](#开发指南)
  - [环境要求](#环境要求)
  - [项目结构](#项目结构)
- [代码签名](#代码签名)
- [参与贡献](#参与贡献)
- [致谢](#致谢)
- [赞助支持](#赞助支持)
- [许可证](#许可证)

## 为什么选择 Motrix Next？

[Motrix](https://github.com/agalwood/Motrix) 由 [agalwood](https://github.com/agalwood) 开发，曾是开源领域最优秀的下载管理器之一 —— 拥有简洁的界面、基于 aria2 的强劲内核，以及跨平台能力。它启发了无数用户和开发者。

然而，原项目自 2023 年以来基本停止维护。Electron + Vue 2 + Vuex + Element UI 的技术栈积累了大量历史包袱，导致项目在现代平台上的维护、扩展和打包愈发困难。

### 全面重构了什么

**Motrix Next** 是一次彻底的从头重写 —— 保留了 Motrix 的下载管理器精神，但采用了全新的代码架构。

| 层级 | Motrix（旧版） | Motrix Next（新版） |
|------|---------------|-------------------|
| **运行时** | Electron | **Tauri 2**（Rust） |
| **前端框架** | Vue 2 + Vuex | **Vue 3 Composition API + Pinia** |
| **UI 组件库** | Element UI | **Naive UI** |
| **开发语言** | JavaScript | **TypeScript + Rust** |
| **样式方案** | SCSS + Element 主题 | **原生 CSS + CSS 自定义属性** |
| **引擎管理** | Node.js `child_process` | **Tauri Sidecar** |
| **构建系统** | electron-builder | **Vite + Cargo** |
| **包体积** | ~80 MB | **~20 MB** |
| **自动更新** | electron-updater | **Tauri updater 插件** |

> [!NOTE]
> **六平台 aria2 引擎** —— [官方 aria2 发布版](https://github.com/aria2/aria2/releases) 仅提供 Windows 32/64 位和 Android ARM64 的预编译二进制文件。我们[从源码编译 aria2](https://github.com/AnInsomniacy/aria2-builder) 为全部 6 个目标平台生成全静态二进制文件：macOS（Apple Silicon / Intel）、Windows（x64 / ARM64）和 Linux（x64 / ARM64）。

### 设计与动效

整体 UI 布局忠于 Motrix 的原始设计 —— 侧边栏导航、任务列表、设置面板都延续了让 Motrix 从第一天起就直观易用的经典结构。

改变的是底层的一切。每一个过渡动画和微交互都经过精心调校，遵循 [Material Design 3](https://m3.material.io/styles/motion/overview) 动效规范：

- **非对称时间** —— 进入动画略长于退出动画，让新内容有充分的时间着陆，而被移除的内容则快速离开
- **强调缓动曲线** —— 进入时减速（`cubic-bezier(0.2, 0, 0, 1)`），退出时加速（`cubic-bezier(0.3, 0, 0.8, 0.15)`），全代码库不再使用通用的 `ease` 曲线
- **弹性模态框** —— 对话框采用物理建模的弹性动画，呈现自然、灵敏的手感
- **统一的动效令牌** —— 所有时长和曲线都定义为 CSS 自定义属性，确保 12+ 个组件之间拥有一致的节奏

## 功能特性

- **多协议下载** —— 支持 HTTP、FTP、BitTorrent、磁力链接（Magnet）
- **BitTorrent 支持** —— 可选择性下载文件、DHT、Peer 交换、加密传输
- **Tracker 管理** —— 自动同步社区 Tracker 列表
- **并发下载** —— 最高 10 个任务，支持自定义线程数
- **速度控制** —— 全局和单任务的上传/下载限速
- **系统托盘** —— 菜单栏实时显示下载速度（macOS）
- **深色模式** —— 原生深色主题，支持跟随系统偏好自动切换
- **国际化** —— 首次启动自动检测系统语言，支持 26 种语言
- **任务管理** —— 暂停、恢复、删除（含文件清理）、批量操作
- **下载协议关联** —— 注册为磁力链接（magnet）和迅雷链接（thunder）的默认处理程序
- **系统通知** —— 任务完成时弹出系统通知
- **轻量级** —— 基于 Tauri，资源占用极低
- **[浏览器扩展](https://github.com/AnInsomniacy/motrix-next-extension)** —— 支持 Chrome / Edge 拦截下载，智能过滤、Cookie 转发、实时控制（[Chrome Web Store](https://chromewebstore.google.com/detail/ofeajdebdjajhkmcmamagokecnbephhl) · [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/loojjolhejmakcdlbidigoniobfanjlb)）

## 技术架构

Motrix Next 采用**前后端分离的混合架构**：前端基于现代 Web 技术栈构建用户界面，后端基于 Rust 提供原生能力与高性能下载引擎管理。

### 架构分层

| 层级 | 技术栈 | 职责 |
|------|--------|------|
| **表现层** | Vue 3 + TypeScript + Naive UI | 用户界面、状态管理、路由导航 |
| **前端业务层** | Pinia + Composables + VueUse | 状态存储、可复用业务逻辑、工具函数 |
| **前后端通信** | Tauri JS API + WebSocket JSON-RPC | 调用原生命令、与 aria2 引擎通信 |
| **原生能力层** | Rust + Tauri 2 | 文件系统、系统托盘、自动更新、通知、注册表 |
| **下载引擎** | aria2 sidecar | 实际的 HTTP/FTP/BT 下载工作 |

### 核心模块说明

- **aria2 JSON-RPC 客户端**（`src/api/`）—— 前端封装的 aria2 通信层，通过 WebSocket 与引擎交互
- **Tauri Commands**（`src-tauri/src/commands/`）—— Rust 暴露的原生命令，涵盖配置、引擎、UI、Tracker、文件系统、更新器等
- **引擎生命周期管理**（`src-tauri/src/engine/`）—— aria2 sidecar 的启动、停止、重启及参数组装
- **配置迁移引擎**（`src/shared/utils/configMigration.ts`）—— 版本化的配置模式迁移，确保升级时用户数据不丢失
- **历史数据库** —— 前端使用 SQLite（`tauri-plugin-sql`）持久化下载历史，后端使用 `rusqlite` 管理

### 架构优势

1. **极致轻量**：Tauri 使用操作系统原生 WebView（macOS 用 WKWebView、Windows 用 WebView2、Linux 用 WebKitGTK），而非捆绑 Chromium，使安装包体积从 ~80 MB 缩减至 ~20 MB
2. **内存友好**：Rust 后端 + 系统 WebView 显著降低了运行时内存占用
3. **原生性能**：文件 I/O、网络请求、系统集成都通过 Rust 直接调用操作系统 API，避免了 Electron 的 Node.js 中间层开销
4. **类型安全**：全栈 TypeScript + Rust 的强类型系统，极大减少了运行时错误
5. **现代化前端**：Vue 3 Composition API + Pinia 的组合比 Vue 2 Options API + Vuex 更灵活、更易测试
6. **自动更新可靠**：Tauri 的 updater 插件通过 GitHub Releases 托管 JSON 配置，支持稳定版和测试版双通道
7. **跨平台一致**：单一代码库同时输出 macOS（Apple Silicon / Intel）、Windows（x64 / ARM64）、Linux（x64 / ARM64）六个目标平台

### 架构局限

1. **无便携版**：由于依赖 aria2 sidecar 进程（独立的可执行文件），aria2 二进制文件必须与主程序并存，无法嵌入单一可执行文件中。此外，深度链接（magnet://、thunder://）和文件关联（.torrent）需要安装程序写入注册表，这是 Tauri sidecar 模型和 Windows 操作系统的根本限制
2. **未代码签名**：macOS 和 Windows 均无代码签名证书，首次运行可能触发 Gatekeeper 或杀毒软件警告（需用户手动放行）
3. **WebView 兼容性**：依赖系统 WebView 版本，若用户系统 WebView 过旧（尤其旧版 Windows 或 Linux），可能出现渲染问题
4. **Rust 学习曲线**：后端使用 Rust 虽带来性能和安全性优势，但对习惯 JavaScript 的开发者而言维护门槛更高
5. **sidecar 进程管理**：aria2 作为独立子进程运行，引擎崩溃或异常退出需要额外的监控和自动重启逻辑（已实现在 `engine/lifecycle.rs` 中）
6. **浏览器扩展限制**：扩展需单独安装，且 Chrome/Edge 商店的审核流程可能导致版本更新延迟

## 安装指南

请从 [GitHub Releases](https://github.com/AnInsomniacy/motrix-next/releases) 下载最新版本。

### macOS

**Homebrew（推荐）：**

```bash
brew tap AnInsomniacy/motrix-next
brew install --cask motrix-next
xattr -cr /Applications/MotrixNext.app  # 移除隔离属性（应用未签名）
```

或从 [Releases](https://github.com/AnInsomniacy/motrix-next/releases) 下载 `MotrixNext_aarch64.app.tar.gz`（Apple Silicon）/ `MotrixNext_x64.app.tar.gz`（Intel）并拖入 `/Applications`。

> [!TIP]
> 若 macOS 提示应用**"已损坏，无法打开"**，请参阅下方的 [FAQ](#常见问题)。

### Windows

从 [Releases](https://github.com/AnInsomniacy/motrix-next/releases) 下载安装程序：

| 架构 | 文件 |
|------|------|
| x64（大多数电脑） | `MotrixNext_x.x.x_x64-setup.exe` |
| ARM64 | `MotrixNext_x.x.x_arm64-setup.exe` |

运行安装程序即可，约 10 秒完成，无需重启。

### Linux

从 [Releases](https://github.com/AnInsomniacy/motrix-next/releases) 下载：

**Debian / Ubuntu：**

```bash
sudo dpkg -i MotrixNext_x.x.x_amd64.deb
```

**其他发行版** —— 使用 `.AppImage`：

```bash
chmod +x MotrixNext_x.x.x_amd64.AppImage
./MotrixNext_x.x.x_amd64.AppImage
```

同时提供 x64 和 ARM64 架构版本。

## 常见问题

<details>
<summary><strong>macOS 提示"已损坏，无法打开"</strong></summary>

<br>

本应用未进行代码签名。打开终端并执行：

```bash
xattr -cr /Applications/MotrixNext.app
```

此命令会移除 macOS Gatekeeper 对未签名应用附加的隔离属性。若通过 Homebrew 加 `--no-quarantine` 参数安装，则不会遇到此问题。

</details>

<details>
<summary><strong>为什么没有便携版（Portable）？</strong></summary>

<br>

Motrix Next 依赖 [aria2](https://aria2.github.io/) 作为 sidecar 进程 —— 即 Tauri 在运行时启动的独立可执行文件。aria2 二进制文件是[从源码编译](https://github.com/AnInsomniacy/aria2-builder)的全静态构建，覆盖全部 6 个支持平台。此架构意味着：

- **aria2 二进制文件必须与主程序并存** —— 无法嵌入单一 `.exe` 文件中
- **深度链接**（`magnet://`、`thunder://`）和**文件关联**（`.torrent`）需要安装程序配置 Windows 注册表
- **自动更新器**需要已知的安装路径来原地替换文件

这些是 Tauri sidecar 模型和 Windows 操作系统的根本限制，并非可绕过的临时缺陷。知名的 Tauri 项目如 [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev)（8 万+ Star）也曾提供便携版，但后因同样的问题[停止支持](https://clash-verge.com/)。

我们为 Windows 提供 **NSIS 安装程序** —— 轻量（约 20 MB）、安装迅速、功能完整。

</details>

## 代码签名

Motrix Next 在 macOS 和 Windows 上**均未进行代码签名**，因此浏览器或杀毒软件在下载或运行安装程序时可能会显示安全警告。

本应用完全开源，每个版本的二进制文件均由 [GitHub Actions CI](https://github.com/AnInsomniacy/motrix-next/actions) 自动构建。如需更高的安全保障，您随时可以从源码自行构建。

> [!NOTE]
> 请参阅我们的[代码签名政策](docs/CODE_SIGNING.md)和[隐私政策](docs/PRIVACY.md)。

## 开发指南

### 环境要求

- [Rust](https://rustup.rs/)（最新稳定版）
- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/)

### 快速开始

```bash
# 克隆仓库
git clone https://github.com/AnInsomniacy/motrix-next.git
cd motrix-next

# 安装前端依赖
pnpm install

# 启动开发服务器（同时启动 Tauri + Vite）
pnpm tauri dev

# 构建生产版本
pnpm tauri build
```

### 验证命令

在提交代码前，请运行以下检查确保质量：

```bash
# 前端
pnpm format          # 自动格式化所有源文件
pnpm format:check    # 验证格式（CI 会执行此项）
pnpm test            # Vitest 单元测试
npx vue-tsc --noEmit # TypeScript 类型检查

# 后端
cargo check          # 快速编译检查
cargo test           # Rust 单元测试
```

### 项目结构

```
motrix-next/
├── src/                        # 前端（Vue 3 + TypeScript）
│   ├── api/                    # Aria2 JSON-RPC 客户端
│   ├── components/             # Vue 组件
│   │   ├── about/              #   关于面板
│   │   ├── layout/             #   侧边栏、测速仪、导航
│   │   ├── preference/         #   设置页面、更新对话框
│   │   └── task/               #   任务列表、详情、添加任务
│   ├── composables/            # 可复用的组合式函数
│   ├── router/                 # Vue Router 配置
│   ├── shared/                 # 共享工具与配置
│   │   ├── locales/            #   26 种语言包
│   │   ├── utils/              #   纯工具函数（含测试）
│   │   ├── aria2/              #   Aria2 RPC 库
│   │   ├── types.ts            #   TypeScript 接口定义
│   │   ├── constants.ts        #   应用常量
│   │   └── configKeys.ts       #   持久化配置键注册表
│   ├── stores/                 # Pinia 状态管理（含测试）
│   ├── styles/                 # 全局 CSS 自定义属性
│   └── views/                  # 页面级路由视图
├── src-tauri/                  # 后端（Rust + Tauri 2）
│   ├── src/
│   │   ├── commands/           #   配置、引擎、UI、Tracker、文件系统、更新器、UPnP
│   │   ├── engine/             #   Aria2 sidecar 生命周期（参数、状态、清理）
│   │   ├── error.rs            #   AppError 枚举
│   │   ├── menu.rs             #   原生菜单构建器
│   │   ├── tray.rs             #   系统托盘设置
│   │   ├── upnp.rs             #   UPnP/IGD 端口映射
│   │   └── lib.rs              #   Tauri 构建器与插件注册
│   └── binaries/               # Aria2 sidecar 二进制文件（6 个平台）
├── scripts/                    # bump-version.sh
├── .github/workflows/          # CI (ci.yml) + 发布 (release.yml)
└── website/                    # 官网落地页（静态 HTML）
```

## 参与贡献

欢迎提交 PR 和 Issue！开始之前，请阅读[贡献指南](docs/CONTRIBUTING.md)和[行为准则](docs/CODE_OF_CONDUCT.md)。

## 致谢

- [Motrix](https://github.com/agalwood/Motrix) 作者 [agalwood](https://github.com/agalwood) 及所有贡献者
- [Aria2](https://aria2.github.io/) —— 作为核心的强大下载引擎
- 为全球无障碍使用贡献 25+ 语言文件的社区翻译者们

## 赞助支持

这个项目是在我本该写论文的时间里搭建的 —— 我是一个靠方便面维生的博士生 🍜

本应用在 macOS 和 Windows 上均未进行代码签名 —— Apple 每年收费 $99，Windows Authenticode 证书每年 $300–600。那得买好多方便面。

[请我喝杯咖啡 ☕](https://github.com/AnInsomniacy/AnInsomniacy/blob/main/SPONSOR.md) —— 也许有一天我能买得起这些证书，让杀毒软件不再把我的应用当成罪犯对待 🥲

## Star 趋势

[![Star History Chart](https://api.star-history.com/svg?repos=AnInsomniacy/motrix-next&type=Date)](https://star-history.com/#AnInsomniacy/motrix-next&Date)

## 许可证

[MIT](https://opensource.org/licenses/MIT) —— 版权所有 © 2025-present AnInsomniacy
