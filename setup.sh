#!/bin/bash

[ -f ./client/.env ] || cp ./client/.env.example ./client/.env
[ -f ./server/.env ] || cp ./server/.env.example ./server/.env
[ -f ./db.env ] || cp ./server/db.env.example ./server/db.env

docker-compose up --build