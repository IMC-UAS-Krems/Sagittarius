#!/usr/bin/env bash
npm install prisma @prisma/client
# npx prisma db push --force-reset # reset database
npx prisma migrate reset --force
npx prisma generate
node ./init_database.js
