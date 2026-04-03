import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  compatibilityDate: "2026-04-02",

  // devtools: { enabled: true },

  // debug: true,

  css: ["vuetify/lib/styles/main.sass", "~/assets/global.css"],

  modules: ["@pinia/nuxt"],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'pinia',
      ]
    }
  },

  runtimeConfig: {
    public: {
      backendURL: process.env.BACKEND_BASE_URL || "http://localhost:8000",
    },
  },
});
