import tailwindcss from "@tailwindcss/vite";
import iconLink from "../theme/plugins/icon-link.js";

// 不要“/”结尾
const siteUrl = "https://xszn.org";

export default {
  srcDir: "./src",
  lastUpdated: true,
  markdown: {
    config: (md) => {
      md.use(iconLink);
    },
    image: {
      lazyLoading: true,
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
};
