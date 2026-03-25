// https://vitepress.dev/zh/guide/custom-theme
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import "./style.css";
import "./custom.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// 利用 Vite 的 glob 导入功能来自动注册一个组件目录
const modules = import.meta.glob("./components/**/*.vue", {
  eager: true,
  import: "default",
});

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    for (const path in modules) {
      const name = path.split("/").pop().replace(".vue", "");

      app.component(name, modules[path]);
    }
  },
};
