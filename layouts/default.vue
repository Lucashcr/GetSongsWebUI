<script setup>
import useAuthStore from "~/store/auth";

const auth = useAuthStore();
</script>

<template>
  <v-main>
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
    <NuxtPage></NuxtPage>
  </v-main>
</template>

<style scoped>
.v-main {
  width: 1200px;
  margin: auto;
}

.v-list {
  width: 100%;
}

.v-list-item {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
