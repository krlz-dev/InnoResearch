#!/bin/bash
cd app
docker build -t inno/app .
cd ..
cd service
docker build -t inno/service .