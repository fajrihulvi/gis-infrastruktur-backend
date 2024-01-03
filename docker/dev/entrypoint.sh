#!/bin/sh

node ace migration:run --force
node ace db:seed
node ace serve --watch
