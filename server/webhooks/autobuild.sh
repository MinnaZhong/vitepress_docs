
# 前端在服务器的git地址
# WEB_PATH='/home/vitepress_docs/'
WEB_PATH="D:/code/ufactory-doc/"

WEB_USER='root'
WEB_USERGROUP='root'

echo "Start"
cd $WEB_PATH
echo `pwd`
echo "pulling source code..."
git fetch --all
git reset --hard origin/main
git pull

echo "npm install ..."
npm install 

echo "next build..."
npm run docs:build


echo "next preview..."
npm run docs:preview

echo "build end"
#chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
#echo "Finished."
