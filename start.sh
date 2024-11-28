#!/bin/bash

# 设置环境变量示例，可根据实际需求调整或从外部传入
export NODE_ENV="production"

# 记录脚本开始执行日志
echo "starting running... [$(date)]"

# 安装 pnpm 全局包，并检查安装结果
npm install pnpm -g 
if [ $? -ne 0 ]; then
    echo "pnpm failed to install. Please check the service configuration and logs."
    exit 1
fi

# 安装 pm2 全局包，并检查安装结果
npm install -g pm2 
if [ $? -ne 0 ]; then
    echo "pm2 failed to install. Please check the service configuration and logs."
    exit 1
fi

# 记录 pnpm 安装开始日志
echo "Starting pnpm install... [$(date)]"
pnpm install
# 记录 pnpm 安装结束日志
echo "Finished pnpm install... [$(date)]"

# 启动 webhooks 服务，并检查结果
echo "Starting webhooks service... [$(date)]"
npm run webhooks & 


# 启动 export:api 服务，并检查结果
echo "Starting export:api service... [$(date)]"
npm run export:api

# 记录脚本执行完成日志
echo "Script execution completed successfully... [$(date)]"