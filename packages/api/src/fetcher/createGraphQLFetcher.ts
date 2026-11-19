import type { AxiosInstance } from "axios";
import { print } from "graphql";
import { gql } from "graphql-tag";

type GraphQLErrorBody = {
  message: string;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLErrorBody[];
};

export function createGraphQLFetcher(getClient: () => AxiosInstance) {
  return <TData, TVariables>(
    query: string,
    variables?: TVariables,
    _headers?: RequestInit["headers"],
  ) => {
    return async (): Promise<TData> => {
      const client = getClient();
      const response = await client.request<GraphQLResponse<TData>>({
        method: "POST",
        data: {
          query: print(gql`
            ${query}
          `),
          variables,
        },
      });
      const body = response.data;

      if (body.errors && body.errors.length > 0) {
        throw new Error(body.errors[0]?.message ?? "GraphQL request failed");
      }

      if (!body.data) {
        throw new Error("GraphQL request returned no data");
      }

      return body.data;
    };
  };
}
