#!/usr/bin/env bash
# Update the docker image running the server


ssh-add ~/.ssh/github
git pull origin master
docker stop barracas-webserver
docker rmi barracas:v1
docker build -t barracas:v1 ../
docker run --rm --name barracas-webserver -p 3035:3000 -d barracas:v1
