import nav from "./nav";
import sidebar from "./sidebar";
import socialLinks from "../social";

export default {
  // https://vitepress.dev/zh/reference/default-theme-config
  logo: {
    src: "/images/logo.webp",
    alt: "行书指南 Logo",
  },
  nav,
  sidebar,
  outline: {
    label: "页面导航",
  },
  socialLinks,
  footer: {
    message: `<a href="/about">关于我们</a> | <a href="/link-exchange">友情链接</a> | <a href="/disclaimer">免责声明</a> | <a href="/privacy-policy">隐私权政策</a>`,
    copyright: `© ${new Date().getFullYear()} 行书指南 CC BY-NC-ND 4.0`,
  },
  editLink: {
    pattern: "https://github.com/xszn/xszn.github.io/edit/main/src/:path",
    text: "在 GitHub 上编辑此页面",
  },
  lastUpdated: {
    text: "最后更新于",
    formatOptions: {
      dateStyle: "short",
      timeStyle: "short",
    },
  },
  docFooter: {
    prev: "上一页",
    next: "下一页",
  },
  darkModeSwitchLabel: "主题",
  lightModeSwitchTitle: "切换到浅色模式",
  darkModeSwitchTitle: "切换到深色模式",
  sidebarMenuLabel: "菜单",
  returnToTopLabel: "回到顶部",
  langMenuLabel: "更改语言",
  externalLinkIcon: true,
  search: {
    provider: "local",
    options: {
      translations: {
        button: {
          buttonText: "搜索",
          buttonAriaLabel: "搜索",
        },
        modal: {
          displayDetails: "显示详细列表",
          resetButtonTitle: "重置搜索",
          backButtonTitle: "关闭搜索",
          noResultsText: "没有结果",
          footer: {
            selectText: "选择",
            selectKeyAriaLabel: "输入",
            navigateText: "导航",
            navigateUpKeyAriaLabel: "上箭头",
            navigateDownKeyAriaLabel: "下箭头",
            closeText: "关闭",
            closeKeyAriaLabel: "Esc",
          },
        },
      },
    },
  },
  ads: {
    link: "",
    details: "",
    image: "",
    alt: "",
    sponsor: "",
  },
  notFound: {
    title: "页面未找到",
    quote: "“如果你不改变方向，你可能会到达你正在前往的地方。”——老子",
    linkText: "返回首页",
  },
};
