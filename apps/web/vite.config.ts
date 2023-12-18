import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

import AutoImport from "unplugin-auto-import/vite";
import Component from "unplugin-vue-components/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    AutoImport({
      resolvers: [],
      imports: ["vue", "vue-router", "vuex"],
      dts: "src/@types/auto-imports.d.ts",
    }),

    Component({
      resolvers: [],
      extensions: ["vue"],
      deep: true,
      dts: "src/@types/components.d.ts",
    }),

    vue(),

    VitePWA({
      mode: "development",
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "safari-pinned-tab.svg", "robot.txt"],
      filename: "claims-sw.ts",
      base: "/",
      srcDir: "src",
      strategies: "injectManifest",
      devOptions: {
        enabled: false,
        /* when using generateSW the PWA plugin will switch to classic */
        type: "module",
        navigateFallback: "index.html",
      },
      manifest: {
        name: "Vue Monorepo",
        short_name: "Vue Monorepo",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
