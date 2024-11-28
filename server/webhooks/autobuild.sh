#!/bin/bash

# 部署路径
WEB_PATH='/app/'
# 用户和用户组（目前未用到，可以根据需要调整文件权限）
WEB_USER='root'
WEB_USERGROUP='root'
# Git 分支
BRANCH='main'
# 日志文件路径
LOG_FILE="/var/log/uf_docs.log"
# PM2 管理的应用名称
APP_NAME="UFactory-Docs"


# 定义一个函数用于记录带时间的日志信息
log_with_time() {
    local message="$1"
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    echo "${timestamp} - ${message}" | tee -a $LOG_FILE
}

log_with_time "[===================== Auto Update ===========================]"

# 开始部署流程
log_with_time "Start deployment..."

# 进入项目目录，如果失败则退出脚本
cd $WEB_PATH || { log_with_time "Directory $WEB_PATH not found! Exiting..."; exit 1; }
log_with_time "Current directory: $(pwd)"

# 更新代码
log_with_time "Pulling source code..."
git fetch --all && git reset --hard origin/$BRANCH && git pull
if [ $? -ne 0 ]; then
    log_with_time "Git operation failed. Exiting..."
    exit 1
fi

# 安装依赖
log_with_time "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    log_with_time "npm install failed. Exiting..."
    exit 1
fi

# 构建项目
log_with_time "Building project..."
npm run docs:build
if [ $? -ne 0 ]; then
    log_with_time "Build failed. Exiting..."
    exit 1
fi

# 停止旧的预览进程（如果存在）
log_with_time "Stopping previous preview process (if any)..."
pm2 stop $APP_NAME || log_with_time "No existing process found."

# 启动新的预览进程
log_with_time "Starting preview..."
pm2 start npm --name $APP_NAME -- run docs:preview
if [ $? -ne 0 ]; then
    log_with_time "Preview start failed. Exiting..."
    exit 1
fi

# 部署完成
log_with_time "Deployment complete."