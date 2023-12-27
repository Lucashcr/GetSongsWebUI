import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,
    components,
    directives,
    theme: {
      defaultTheme: "dark",
      themes: {
        light: {
          colors: {
            background: "#DADADA",
            primary: "#2D4F7B",
            secondary: "#F1F1F1",
            accent: "#82B1FF",
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FB8C00",
            gray: "#3D3D3D",
          },
        },
        dark: {
          colors: {
            primary: "#2D4F7B",
            secondary: "#343434",
            accent: "#72A1EF",
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FB8C00",
            gray: "#D1D1D1",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
