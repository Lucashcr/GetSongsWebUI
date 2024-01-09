import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  // devtools: { enabled: true },

  css: ["vuetify/lib/styles/main.sass", "~/assets/global.css"],

  modules: ["@pinia/nuxt"],

  build: {
    transpile: ["vuetify"],
  },

  components: [
    {
      path: resolve("./components"),
      global: true,
    },
  ],

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  runtimeConfig: {
    public: {
      backendURL: process.env.BACKEND_BASE_URL || "http://localhost:8000",
    },
  },
});
