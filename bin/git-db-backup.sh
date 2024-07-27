#!/usr/bin/env bash
# Update the docker image running the server

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd ${DIR}/../Utilities

git checkout DB-backup
read -s -p "Password: " password
./backupDB.sh brunocosta barracas
#Requires password fill in

cd ../SQL
git add LATEST_dump.sql
git commit -m "Periodic Backup of database"
git checkout master
