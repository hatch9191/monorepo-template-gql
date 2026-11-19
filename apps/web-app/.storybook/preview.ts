import type { Preview } from "@storybook/nextjs-vite";

import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
