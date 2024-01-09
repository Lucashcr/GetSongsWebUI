<script setup>
import { useTheme } from "vuetify";

const themeCookie = useCookie("theme", { sameSite: "strict" });
const theme = useTheme();

theme.global.name.value = themeCookie.value || "light";

useHead({
  title: "GetSongs",
  meta: [
    {
      name: "description",
      content: "Plataforma de montagem e geração automática de hinários.",
    },
  ],
});
</script>

<template>
  <v-app>
    <NuxtLayout />
  </v-app>
</template>
