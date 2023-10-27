<script setup>
import { useTheme } from "vuetify";
import useAuthStore from "~/store/auth";

const theme = useTheme();
const auth = useAuthStore();
const { $vuetify } = useNuxtApp();

auth.verifyToken();

theme.global.name.value = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : theme.global.name.value;
console.log("THEME:", theme.global.name.value);

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
      <v-list-item
        v-if="auth.isAuthenticated"
        v-for="item in $store.authItems"
        :key="item.to"
        :to="item.to"
        router
        exact
        :prepend-icon="item.icon"
        :title="item.title"
      >
      </v-list-item>
      <v-list-item
        v-else
        v-for="item in $store.notAuthItems"
        :key="item.to"
        :to="item.to"
        router
        exact
        :prepend-icon="item.icon"
        :title="item.title"
      >
      </v-list-item>
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
