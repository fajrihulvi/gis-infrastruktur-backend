#!/bin/sh

node ace migration:run --force
node ace db:seed
npm run start
