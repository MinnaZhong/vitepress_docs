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

echo "[===================== Auto Update ===========================]"
# 开始部署流程
echo "Start deployment..." | tee -a $LOG_FILE

# 进入项目目录，如果失败则退出脚本
cd $WEB_PATH || { echo "Directory $WEB_PATH not found! Exiting..."; exit 1; }
echo "Current directory: $(pwd)" | tee -a $LOG_FILE

# 更新代码
echo "Pulling source code..." | tee -a $LOG_FILE
git fetch --all && git reset --hard origin/$BRANCH && git pull
if [ $? -ne 0 ]; then
    echo "Git operation failed. Exiting..." | tee -a $LOG_FILE
    exit 1
fi

# 安装依赖
echo "Installing dependencies..." | tee -a $LOG_FILE
npm install
if [ $? -ne 0 ]; then
    echo "npm install failed. Exiting..." | tee -a $LOG_FILE
    exit 1
fi

# 构建项目
echo "Building project..." | tee -a $LOG_FILE
npm run docs:build
if [ $? -ne 0 ]; then
    echo "Build failed. Exiting..." | tee -a $LOG_FILE
    exit 1
fi

# 停止旧的预览进程（如果存在）
echo "Stopping previous preview process (if any)..." | tee -a $LOG_FILE
pm2 stop $APP_NAME || echo "No existing process found." | tee -a $LOG_FILE

# 启动新的预览进程
echo "Starting preview..." | tee -a $LOG_FILE
pm2 start npm --name $APP_NAME -- run docs:preview
if [ $? -ne 0 ]; then
    echo "Preview start failed. Exiting..." | tee -a $LOG_FILE
    exit 1
fi

# 部署完成
echo "Deployment complete." | tee -a $LOG_FILE
