import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  transpilePackages: [
    "@repo/ui",
    "@repo/api",
    "@repo/data",
    "@repo/platform",
    "@repo/domain",
    "@repo/types",
    "@repo/utils",
  ],
  turbopack: {
    root,
  },
};

export default nextConfig;
