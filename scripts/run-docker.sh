#!/bin/bash
source .env &&
  docker rm -f "$(docker ps -a --filter name=galaga --format "{{.ID}}")" || true &&
  docker run --rm=false -d --name galaga -p 3000:$PORT \
    -e DATABASE_URL=$DATABASE_URL \
    -e YANDEX_CLIENT_ID=$YANDEX_CLIENT_ID \
    -e YANDEX_CLIENT_SECRET=$YANDEX_CLIENT_SECRET \
    -e BASE_URL=$BASE_URL \
    -v /avatars:/app/dist/files/avatars \
    cr.yandex/$1/$2:$3
