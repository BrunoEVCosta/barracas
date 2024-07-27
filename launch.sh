#!/bin/env bash

### Run as npm script launch


currentVersion=$(docker ps | grep barracas | awk -F' ' '{print $2}' | cut -f2 -d:)
read -p "Previous version is ${currentVersion}. Enter new version: " version

docker build -t barracas:v${version} .
runningContainer=$(docker ps | grep barracas | cut -f1 -d' ')

docker stop $runningContainer &&
docker run --rm --name barracas-webserver -p 3037:3000 --mount type=bind,src=/run/mysqld/mysqld.sock,dst=/run/mysqld/mysqld.sock -d barracas:v${version}


