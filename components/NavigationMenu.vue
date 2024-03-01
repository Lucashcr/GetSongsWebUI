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
  <v-navigation-drawer app expand-on-hover rail permanent>
    <client-only>
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
            <v-list v-if="auth.isAuthenticated">
              <v-list-item
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
              <template v-if="auth.isAuthenticated">
                <v-list-item
                  v-for="item in $store.authItems"
                  :key="item.to"
                  :to="item.to"
                  router
                  exact
                  :prepend-icon="item.icon"
                  :title="item.title"
                >
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item
                  v-for="item in $store.notAuthItems"
                  :key="item.to"
                  :to="item.to"
                  router
                  exact
                  :prepend-icon="item.icon"
                  :title="item.title"
                >
                </v-list-item>
              </template>
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
    </client-only>
  </v-navigation-drawer>
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
