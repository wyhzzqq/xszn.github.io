import { defineConfig } from "vitepress";
import head from "./head";
import shared from "./shared";
import themeConfig from "./theme";
import zhConfig from "./zh/zhConfig";

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
  title: "XingShu",
  description:
    "A curated list of Free and Open Source Software, recommending high-quality free and open-source tools to help you save time on your software search.",
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
