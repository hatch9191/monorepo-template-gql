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

ARG NEXT_PUBLIC_GRAPHQL_API_BASE_URI=http://localhost:4100/graphql
ENV NEXT_PUBLIC_GRAPHQL_API_BASE_URI=$NEXT_PUBLIC_GRAPHQL_API_BASE_URI
ENV HOSTNAME=0.0.0.0
ENV PORT=3100

RUN bun run --filter web-app build

EXPOSE 3100

CMD ["bun", "run", "--filter", "web-app", "start"]
