import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite"; // 自动导入
import Components from "unplugin-vue-components/vite"; // 组件注册
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    visualizer({
      open: true, // 打包后自动打开
      gzipSize: true,
      brotliSize: true,
    }),
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
  // 生产环境打包配置
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        manualChunks(id: string | string[]) {
          if (id.includes('node_modules')) {
            const arr = id.toString().split('node_modules/')
            return arr[arr.length - 1].split('/')[0].toString()
          }
        }
      }
    }
  }
});
