Use Docker:

```bash
# Build the image
docker build -t ufactroy_docs . 
# Run the container
docker run -it --name ufactory_docs --restart=always -d -p 3020:3020 -p 3030:3030 -p 3040:3040 ufactory_docs
# Set Tag
docker tag ufactory_docs garmin954/ufactory_docs:v1.0.0
# push to docker hub
docker push garmin954/ufactory_docs:v1.0.0
# pull image from docker hub
docker pull garmin954/ufactory_docs:v1.0.0

docker run -it --name ufactory_docs --restart=always -d -p 3020:3020 -p 3030:3030 -p 3040:3040 garmin954/ufactory_docs:v1.0.0 /bin/bash

# logs
docker logs -f ufactory_docs

# shell
docker exec -it ufactory_docs /bin/bash

# stop container
docker stop ufactory_docs

# remove container
docker rm ufactory_docs

# start containers
docker start ufactory_docs

# images
docker images

# remove image
docker rmi 5130d8e737ad

```