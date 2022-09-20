#!/bin/bash
source .env &&
docker rm -f $(docker ps -a --filter name=galaga --format "{{.ID}}") &&
docker run --rm=false -d --name galaga -p 3000:$PORT \
-e DATABASE_URL=$DATABASE_URL \
cr.yandex/$1/$2:$3
