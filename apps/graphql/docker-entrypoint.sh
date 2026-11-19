#!/bin/sh
set -eu

./node_modules/.bin/prisma migrate deploy --schema packages/db/prisma/schema
exec bun apps/graphql/src/server.ts
