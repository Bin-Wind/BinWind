# 项目部署
### 安装Homebrew
Homebrew是MacOS上的包管理工具，可以方便地安装和管理软件包。首先，我们需要安装Homebrew。

- 打开终端，输入以下命令：
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
- 安装完成后，可以通过以下命令检查是否安装成功：
```bash
brew --version
```
### 安装PHP
- 使用Homebrew安装PHP非常简单。可以通过以下命令安装最新版本的PHP：
```bash
brew install php
```
- 安装完成后，可以通过以下命令检查PHP版本：
```bash
php -v
```
### 安装Nginx
Nginx是一个高性能的Web服务器，适合用作反向代理和负载均衡。使用Homebrew安装Nginx：
```bash
brew install nginx
```
- 安装完成后，可以通过以下命令启动Nginx服务：
```bash
brew services start nginx
```
- 查看nginx安装目录
```bash
ps -ef | grep nginx
```
- 查看nginx.conf配置文件目录
```bash
nginx -t
```
- 启动/暂停/重载nginx
```bash
# 启动
sudo brew services start nginx
# 暂停
sudo brew services stop nginx
# 重载
sudo brew services reload nginx
```
### 安装MySQL
- 如果你的应用需要数据库支持，可以使用Homebrew安装MySQL：
```bash
brew install mysql
```
- 安装完成后，可以通过以下命令启动MySQL服务：
```bash
brew services start mysql
```
- 然后可以通过以下命令登录MySQL：
```bash
mysql -u root
```