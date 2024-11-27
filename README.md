Use Docker:

```bash
# Build the image
docker build -t ufactroy_docs . 
# Run the container
docker run -it --name ufactory_docs --restart=always -d -p 3020:3020 -p 3030:3030 -p 3040:3040 ufactory_docs
# Set Tag
docker tag ufactroy_docs [yourhub]/ufactroy_docs:v1.0.0
# push to docker hub
docker push [yourhub]/ufactroy_docs:v1.0.0
# pull image from docker hub
docker pull [yourhub]/ufactroy_docs:v1.0.0

docker run -it --name ufactory_docs --restart=always -d -p 3020:3020 -p 3030:3030 -p 3040:3040 garmin954/ufactroy_docs:v1.0.0 /bin/bash


```