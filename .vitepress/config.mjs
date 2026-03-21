import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";
import themeConfig from "./config/theme";
import head from "./config/head";

// 不要“/”结尾
const siteUrl = "https://example.com";

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
  title: "VitePress",
  description: "A VitePress site",
  head,
  lang: "zh-CN",
  srcDir: "./src",
  lastUpdated: true,
  markdown: {
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
      image: {
        lazyLoading: true,
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: "0.0.0.0",
    },
  },
  sitemap: {
    hostname: siteUrl,
    lastmodDateOnly: true,
  },
  transformPageData(pageData) {
    const canonicalUrl = `${siteUrl}/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, ".html");

    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push([
      "link",
      { rel: "canonical", href: canonicalUrl },
    ]);
  },
  themeConfig,
});
