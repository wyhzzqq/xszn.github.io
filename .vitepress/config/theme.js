import nav from "./nav";
import sidebar from "./sidebar";
import socialLinks from "./social";

export default {
  // https://vitepress.dev/zh/reference/default-theme-config
  logo: {
    src: "/images/logo.webp",
    alt: "Xingshu Guide Logo",
  },
  nav,
  sidebar,
  socialLinks,
  footer: {
    message: `<a href="/about">About</a> | <a href="/link-exchange">Link exchange</a> | <a href="/disclaimer">Disclaimer</a> | <a href="/privacy-policy">Privacy policy</a>`,
    copyright: `© ${new Date().getFullYear()} Xingshu CC BY-NC-ND 4.0`,
  },
  editLink: {
    pattern: "https://github.com/xszn/xszn.github.io/edit/main/src/:path",
    text: "Edit this page on GitHub",
  },
  lastUpdated: {
    formatOptions: {
      dateStyle: "short",
      timeStyle: "short",
    },
  },
  externalLinkIcon: true,
  search: {
    provider: "local",
  },
  ads: {
    link: "",
    details: "",
    image: "",
    alt: "",
    sponsor: "",
  },
};
