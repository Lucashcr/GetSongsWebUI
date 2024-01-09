<script setup>
import { useTheme } from "vuetify";

const themeCookie = useCookie("theme");
const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  themeCookie.value = theme.global.name.value;
}

const icon = computed(() => {
  return theme.global.name.value === "dark"
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
