// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },

  css: ["vuetify/lib/styles/main.sass"],

  modules: ["@pinia/nuxt"],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  plugins: ["~/plugins/fetchApi.ts", "~/plugins/utils.ts"],

  runtimeConfig: {
    public: {
      backendURL: "http://localhost:8000",
    },
  },
});
