#!/usr/bin/env bash
# Update the docker image running the server

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd ../Utilities
./backupDB.sh brunocosta barracas
#Requires password fill in

cd ../SQL
git checkout -b DB-backup
git add SQL/LATEST_dump.sql
git commit -m "Periodic Backup of database"

