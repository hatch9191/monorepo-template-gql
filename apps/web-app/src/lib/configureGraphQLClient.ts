import { configureGraphQLClient } from "@repo/api";
import axios from "axios";

// Server reads may need a different host than the browser, such as the
// Compose service name. Next does not expose GRAPHQL_API_INTERNAL_URI to the
// browser bundle, so the browser always uses the public URL.
const baseURL =
  process.env.GRAPHQL_API_INTERNAL_URI ??
  process.env.NEXT_PUBLIC_GRAPHQL_API_BASE_URI ??
  "http://localhost:4100/graphql";

const axiosInstance = axios.create({
  baseURL,
});

configureGraphQLClient(() => axiosInstance);
