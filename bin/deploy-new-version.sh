#!/usr/bin/env bash
# Update the docker image running the server


ssh-add ~/.ssh/github
git pull origin master
docker stop barracas-webserver
docker rmi barracas:v1
docker build --rm -t barracas:v1 ../
docker run --rm --name barracas-webserver -p 3035:3000 --mount type=bind,src=/run/mysqld/mysqld.sock,dst=/run/mysqld/mysqld.sock -d barracas:v1

