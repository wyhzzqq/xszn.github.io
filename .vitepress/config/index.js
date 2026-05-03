import { defineConfig } from "vitepress";
import head from "./head";
import shared from "./shared";
import themeConfig from "./theme";
import zhConfig from "./zh/zhConfig";

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
  title: "Xingshu",
  description:
    "List of free and open-source software. We recommend high-quality, free, and open-source tools to help you save time when searching for software.",
  head,
  ...shared,
  themeConfig,
  locales: {
    root: {
      label: "English",
      lang: "en-US",
    },
    zh: zhConfig,
  },
});
