import path from "node:path";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/nextjs-vite",
  core: {
    disableTelemetry: true,
  },
  async viteFinal(viteConfig) {
    viteConfig.server ??= {};
    viteConfig.server.fs ??= {};
    const allow = viteConfig.server.fs.allow ?? [];
    viteConfig.server.fs.allow = [
      ...allow,
      path.resolve(process.cwd(), "../.."),
    ];
    return viteConfig;
  },
};

export default config;
