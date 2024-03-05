<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();
const themeCookie = useCookie("theme", { sameSite: "strict" });

theme.global.name.value = themeCookie.value || "light";
</script>


<template>
  <v-app :theme="theme.global.name.value">
    <NavigationMenu />
    <v-app-bar :elevation="2">
      <v-img
        src="/logo.png"
        :height="40"
        :width="40"
        class="flex-grow-0 mx-4"
      ></v-img>
      <h2>{{ $store.appBarTitle }}</h2>
      <v-spacer></v-spacer>
      <ThemeToggleButton />
    </v-app-bar>
    <NuxtLayout />
  </v-app>
</template>

