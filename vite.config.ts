import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import { resolve, dirname } from 'path';
import ViteSsr from 'vite-ssr/plugin';
import { getAppConfig } from './src/config';
import { DIRECTUS_ROUTES } from './src/constants';
import pkg from './package.json';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(process.cwd(), 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    ViteSsr({
      getRenderContext: () => {
        return {
          initialState: {
            config: {
              mode: 'development',
              host: process.env.HOST ?? '0.0.0.0',
              port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8055,
              public_url: process.env.DIRECTUS_URL ?? 'http://localhost:8055',
            },
          },
        } as any;
      },
      build: {
        clientOptions: {
          build: {
            assetsDir: '_assets',
            outDir: resolve(__dirname, 'dist/client'),
            emptyOutDir: true,
            target: 'esnext',
          },
        },
        serverOptions: {
          build: {
            assetsDir: '_assets',
            outDir: resolve(__dirname, 'dist/server'),
            emptyOutDir: true,
            target: 'esnext',
          },
          ssr: {
            noExternal: Object.keys(pkg.dependencies),
          },
        },
      },
    }),
  ],
  server: {
    port: 8080,
    proxy: {
      [`^/(${DIRECTUS_ROUTES.map((r) => r.substring(1)).join('|')})`]: {
        target: process.env.DIRECTUS_URL
          ? process.env.DIRECTUS_URL
          : 'http://localhost:1337/',
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: Object.keys(pkg.dependencies),
  },
});
