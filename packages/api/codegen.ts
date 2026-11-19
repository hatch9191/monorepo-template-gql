import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../../apps/graphql/src/graphql/**/*.graphql",
  documents: "src/operations/**/*.graphql",
  generates: {
    "./src/generated/codegen_rq.ts": {
      config: {
        legacyMode: false,
        withHooks: true,
        dedupeFragments: true,
        typesPrefix: "I",
        avoidOptionals: true,
        exposeQueryKeys: true,
        exposeFetcher: true,
        exposeDocument: true,
        reactQueryVersion: 5,
        fetcher: {
          isReactHook: false,
          func: "../fetcher/customFetcher#customFetcher",
        },
        errorType: "Error",
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
    },
  },
};

export default config;
