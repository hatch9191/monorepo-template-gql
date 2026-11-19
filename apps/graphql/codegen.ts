import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../context/types#Context",
        useTypeImports: true,
        enumsAsTypes: true,
        avoidOptionals: true,
        maybeValue: "T",
      },
    },
  },
};

export default config;
