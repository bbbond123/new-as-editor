import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite"; // 自动导入
import Components from "unplugin-vue-components/vite"; // 组件注册
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    process.env.NODE_ENV === "development" && vueDevTools(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: fileURLToPath(new URL("./types/auto-imports.d.ts", import.meta.url)),
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      eslintrc: {
        enabled: true, // Generates .eslintrc-auto-import.json
        filepath: "./.eslintrc-auto-import.json", // Default path
        globalsPropValue: true, // Sets globals as writable (true/false/'readonly')
      },
    }),
    Components({
      dirs: ["src/components"],
      dts: fileURLToPath(new URL("./types/components.d.ts", import.meta.url)),
      resolvers: [
        ElementPlusResolver(),
        // IconsResolver({
        //   enabledCollections: ["ep"], // 重点
        // }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // iconfont: path.resolve(__dirname, "./src/assets/iconfont"),
      // components: path.resolve(__dirname, "./src/components"),
      // css: path.resolve(__dirname, "./src/assets/css"),
      // img: path.resolve(__dirname, "./src/assets/images"),
      // utils: path.resolve(__dirname, "./src/utils"),
    },
  },
});
