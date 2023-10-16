<script setup>
import nuxtStorage from "nuxt-storage";
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  nuxtStorage.localStorage.setData("dark", theme.global.current.value.dark);
}

const icon = computed(() => {
  return theme.global.current.value.dark
    ? "mdi-white-balance-sunny"
    : "mdi-weather-night";
});
</script>

<template>
  <v-btn icon @click="toggleTheme">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "ThemeToggleButton",
};
</script>
