#!/bin/bash

docker compose build

docker run -d -p 9999:3000 compte-heure


