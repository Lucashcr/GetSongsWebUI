import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  // devtools: { enabled: true },

  debug: true,

  css: ["vuetify/lib/styles/main.sass", "~/assets/global.css"],

  modules: ["@pinia/nuxt"],

  build: {
    transpile: ["vuetify"],
  },

  // vite: {
  //   define: {
  //     "process.env.DEBUG": false,
  //   },
  // },

  runtimeConfig: {
    public: {
      backendURL: process.env.BACKEND_BASE_URL || "http://localhost:8000",
    },
  },
});
