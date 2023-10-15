<template>
  <v-app dark>
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
      <img src="/logo.png" height="40px" class="mx-4" />
      <h2>{{ $store.appBarTitle }}</h2>
      <v-spacer></v-spacer>
      <ThemeToggleButton />
    </v-app-bar>
    <NuxtLayout />
  </v-app>
</template>
