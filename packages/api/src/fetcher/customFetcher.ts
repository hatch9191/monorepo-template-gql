import { getConfiguredGraphQLClient } from "./configureGraphQLClient";
import { createGraphQLFetcher } from "./createGraphQLFetcher";

export const customFetcher = createGraphQLFetcher(getConfiguredGraphQLClient);
