import type { AxiosInstance } from "axios";

let getClient: (() => AxiosInstance) | null = null;

export function configureGraphQLClient(clientGetter: () => AxiosInstance) {
  getClient = clientGetter;
}

export function getConfiguredGraphQLClient(): AxiosInstance {
  if (!getClient) {
    throw new Error("Call configureGraphQLClient before using GraphQL hooks.");
  }

  return getClient();
}
