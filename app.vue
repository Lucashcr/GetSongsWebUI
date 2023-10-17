<script setup>
import nuxtStorage from "nuxt-storage";
import { useTheme } from "vuetify";

const theme = useTheme();

theme.global.name.value = nuxtStorage.localStorage.getData("dark")
  ? "dark"
  : "light";

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
    <v-navigation-drawer expand-on-hover rail>
      <v-list-item
        v-for="item in $store.startItems"
        :key="item.to"
        :to="item.to"
        router
        exact
        :prepend-icon="item.icon"
        :title="item.title"
      ></v-list-item>
      <v-spacer vertical></v-spacer>
      <v-list-item
        v-for="item in $store.endItems"
        :key="item.to"
        :to="item.to"
        router
        exact
        :prepend-icon="item.icon"
        :title="item.title"
      ></v-list-item>
    </v-navigation-drawer>
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

<style scoped>
.v-list-item {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
