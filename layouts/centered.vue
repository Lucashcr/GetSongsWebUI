<template>
  <v-app dark>
    <v-hover v-slot="{ hover }" open-delay="200">
      <v-navigation-drawer :mini-variant="!hover" fixed app>
        <v-layout column fill-height>
          <MenuList :items="$store.startItems" />
          <!-- <MenuList :items="$store.hymaryItems" v-if="$auth.loggedIn" /> -->
          <v-spacer></v-spacer>
          <!-- <MenuList :items="$auth.loggedIn ? $store.authItems : $store.notAuthItems" /> -->
          <MenuList :items="$store.endItems" />
        </v-layout>
      </v-navigation-drawer>
    </v-hover>
    <v-app-bar fixed app>
      <img src="/logo.png" height="40px">
      <h1 class="ml-3">{{ $store.appBarTitle }}</h1>
      <v-spacer></v-spacer>
      <ThemeToggleButton />
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>

<script>
export default {
  name: 'CenteredLayout',
  // created() {
  //   if (localStorage.dark === undefined) {
  //     this.$vuetify.theme.dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  //     localStorage.setItem('dark', this.$vuetify.theme.dark)
  //   } else {
  //     this.$vuetify.theme.dark = localStorage.getItem('dark') === 'true'
  //   }
  // }
}
</script>
