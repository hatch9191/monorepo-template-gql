FROM oven/bun:1.4.5

ENV HUSKY=0
ENV PORT=4101

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

EXPOSE 4101

CMD ["bun", "apps/webhooks/src/server.ts"]
