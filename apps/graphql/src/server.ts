import { logger } from "@repo/logging";
import { createSchema, createYoga } from "graphql-yoga";

import { resolvers } from "./graphql/notes.resolvers";
import { prismaNotesStore } from "./modules/note/prismaNotesStore";
import { typeDefs } from "./schema";

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: () => {
    return {
      notes: prismaNotesStore(),
    };
  },
  cors: {
    origin: process.env.WEB_APP_ORIGIN ?? "http://localhost:3100",
    credentials: true,
  },
  graphqlEndpoint: "/graphql",
});

const port = Number(process.env.PORT ?? 4100);

Bun.serve({
  hostname: "0.0.0.0",
  port,
  fetch(request) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return Response.json({ status: "ok" });
    }

    return yoga.fetch(request);
  },
});

logger.info({
  message: "GraphQL server started",
  url: `http://localhost:${port}/graphql`,
});
