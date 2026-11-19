import { configureGraphQLClient } from "@repo/api";
import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_GRAPHQL_API_BASE_URI ??
  "http://localhost:4100/graphql";

const axiosInstance = axios.create({
  baseURL,
});

configureGraphQLClient(() => axiosInstance);
