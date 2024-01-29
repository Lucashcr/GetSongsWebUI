<script setup>
import { useTheme } from "vuetify";
import useAuthStore from "~/store/auth";

const auth = useAuthStore();

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
    <client-only>
      <v-navigation-drawer app expand-on-hover rail permanent>
        <v-container class="fill-height pa-0 flex-column">
          <v-col>
            <v-row>
              <v-list>
                <v-list-item
                  v-for="item in $store.startItems"
                  :key="item.to"
                  :to="item.to"
                  router
                  exact
                  :prepend-icon="item.icon"
                  :title="item.title"
                ></v-list-item>
              </v-list>
              <v-list>
                <v-list-item
                  v-if="auth.isAuthenticated"
                  v-for="item in $store.hymnaryItems"
                  :key="item.to"
                  :to="item.to"
                  router
                  exact
                  :prepend-icon="item.icon"
                  :title="item.title"
                ></v-list-item>
              </v-list>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="flex-grow-0">
            <v-row>
              <v-list>
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
                  v-if="!auth.isAuthenticated"
                  v-for="item in $store.notAuthItems"
                  :key="item.to"
                  :to="item.to"
                  router
                  exact
                  :prepend-icon="item.icon"
                  :title="item.title"
                >
                </v-list-item>
                <v-list-item
                  v-for="item in $store.endItems"
                  :key="item.to"
                  :to="item.to"
                  router
                  exact
                  :prepend-icon="item.icon"
                  :title="item.title"
                ></v-list-item>
              </v-list>
            </v-row>
          </v-col>
        </v-container>
      </v-navigation-drawer>
    </client-only>
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
.v-list {
  width: 100%;
}

.v-list-item {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
