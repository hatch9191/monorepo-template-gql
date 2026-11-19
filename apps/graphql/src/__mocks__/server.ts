import { createSchema, createYoga } from "graphql-yoga";

import type { Context } from "../context/types";
import { resolvers } from "../graphql/notes.resolvers";
import { typeDefs } from "../schema";

type ExecuteGraphqlRequestArgs = {
  query: string;
  variables?: Record<string, unknown>;
  context: Context;
};

type GraphqlResult<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function executeGraphqlRequest<T>({
  query,
  variables,
  context,
}: ExecuteGraphqlRequestArgs): Promise<GraphqlResult<T>> {
  const yoga = createYoga({
    schema: createSchema({
      typeDefs,
      resolvers,
    }),
    context: () => context,
    maskedErrors: false,
  });

  const response = await yoga.fetch("http://yoga/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  return response.json() as Promise<GraphqlResult<T>>;
}
