### 创建开启自启
```
# 移动文件
sudo mv ufactory_docs.service /etc/systemd/system/

# 系统能够识别新的或修改后的服务
sudo systemctl daemon-reload

# 启动服务
sudo systemctl enable ufactory_docs.service

```