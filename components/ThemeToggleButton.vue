<script setup>
import { useTheme } from "vuetify";

const themeCookie = useCookie("theme");
const theme = useTheme();

function toggleTheme() {
  theme.toggle();
  themeCookie.value = theme.global.name.value;
}

const icon = computed(() => {
  return themeCookie.value === "dark"
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
