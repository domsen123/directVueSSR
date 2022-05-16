import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { resolve, dirname } from "path";
import ViteSsr from "vite-ssr/plugin";
import { getAppConfig } from "./src/config";
import { DIRECTUS_ROUTES } from "./src/constants";
import pkg from "./package.json";
import dotenv from "dotenv";

dotenv.config();

const extensionOutDir = pkg["directus:extension"].path;

const outDir = extensionOutDir.startsWith("/")
  ? dirname(extensionOutDir)
  : dirname(resolve(__dirname, pkg["directus:extension"].path));

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(process.cwd(), "src")}/`,
    },
  },
  plugins: [
    Vue(),
    ViteSsr({
      getRenderContext: () => {
        return { initialState: { config: getAppConfig() } } as any;
      },
      build: {
        clientOptions: {
          build: {
            assetsDir: "_assets",
            outDir: resolve(outDir, "client"),
            emptyOutDir: true,
            target: "esnext",
          },
        },
        serverOptions: {
          build: {
            assetsDir: "_assets",
            outDir: resolve(outDir, "server"),
            emptyOutDir: true,
            target: "esnext",
          },
        },
      },
    }),
  ],
  server: {
    port: 8080,
    proxy: {
      [`^/(${DIRECTUS_ROUTES.map((r) => r.substring(1)).join("|")})`]: {
        target: process.env.DIRECTUS_URL
          ? process.env.DIRECTUS_URL
          : "http://localhost:1337/",
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: Object.keys(pkg.dependencies),
  },
});
