import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
// 引入配置
/* 引入elementUI */
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "vant/lib/index.css";
import Vant from "vant";

import "./permission";

const modules = import.meta.glob("@/views/WebVision/components/**/*.vue", { eager: true });
Object.entries(modules).forEach(([path, module]: any) => {
  const segments = path.split("/");
  // 如果是 index.vue，就用父级目录名作为组件名
  let componentName = "";
  if (segments[segments.length - 1] === "index.vue") {
    componentName = segments[segments.length - 2]; // 上一层目录名
  } else {
    componentName = segments[segments.length - 1].replace(/\.vue$/, "");
  }

  componentName = componentName.toLowerCase(); // 统一小写
  console.log("🚀 ~ Object.entries ~ componentName:", componentName)
  app.component(componentName, module.default);
});

app.use(router).use(store).use(ElementPlus).use(Vant).mount("#app");
