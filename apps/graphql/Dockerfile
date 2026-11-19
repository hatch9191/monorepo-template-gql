FROM node:22-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl unzip \
  && rm -rf /var/lib/apt/lists/* \
  && curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:${PATH}"
ENV HUSKY=0

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

ENV POSTGRES_DB_URL=postgresql://postgres:postgres@localhost:5432/template

RUN bun run db:generate

EXPOSE 4100

RUN chmod +x apps/graphql/docker-entrypoint.sh

ENTRYPOINT ["./apps/graphql/docker-entrypoint.sh"]
