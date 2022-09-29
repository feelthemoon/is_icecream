import { rmSync } from "fs";
import { fileURLToPath, URL } from "node:url";
import path from "path";

import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vue from "@vitejs/plugin-vue";
import ElementPlus from "unplugin-element-plus/vite";
import { defineConfig } from "vite";
import electron, { onstart } from "vite-plugin-electron";
import WindiCSS from "vite-plugin-windicss";

import pkg from "./package.json";

rmSync("dist", { recursive: true, force: true }); // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: "electron/main/index.ts",
        vite: {
          build: {
            // For Debug
            sourcemap: true,
            outDir: "dist/electron/main",
          },
          // Will start Electron via VSCode Debug
          plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
        },
      },
      preload: {
        input: {
          // You can configure multiple preload here
          index: path.join(__dirname, "electron/preload/index.ts"),
        },
        vite: {
          build: {
            // For Debug
            sourcemap: "inline",
            outDir: "dist/electron/preload",
          },
        },
      },
      renderer: {},
    }),
    ElementPlus(),
    WindiCSS(),
    vueI18n({
      include: path.resolve(__dirname, "./src/langs/*"),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: process.env.VSCODE_DEBUG
    ? {
        host: pkg.debug.env.VITE_DEV_SERVER_HOSTNAME,
        port: pkg.debug.env.VITE_DEV_SERVER_PORT,
      }
    : undefined,
});
