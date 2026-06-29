# 使用 Homebrew 安装 Node.js

## 1. 安装 Homebrew（如果尚未安装）
1. 打开终端（Terminal）。
2. 粘贴以下命令并运行：
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. 按照提示完成 Homebrew 的安装。

## 2. 安装 Node.js
1. 打开终端。
2. 运行以下命令：
   ```bash
   brew install node
   ```
   - Homebrew 将会自动下载并安装 Node.js，包括 npm（Node Package Manager）。

## 3. 验证安装
1. 运行以下命令来验证 Node.js 是否安装成功：
   ```bash
   node -v
   ```
2. 运行以下命令来验证 npm 是否安装成功：
   ```bash
   npm -v
   ```
   - 这两个命令应该会分别显示 Node.js 和 npm 的版本号。

## 补充说明
- **Homebrew** 是 macOS 上一个方便的包管理器，可以用来安装各种软件包，包括 Node.js。
- `brew install node` 命令会自动安装最新版本的 Node.js 和 npm。
- 如果需要安装特定版本的 Node.js，可以使用以下命令：
  ```bash
  brew install node@<version>
  ```
  例如：
  ```bash
  brew install node@14
  ```
  安装 Node.js 14 版本。
- 安装完成后，你就可以在终端中使用 `node` 和 `npm` 命令来开发和运行 JavaScript 项目了。

---
next: false
---