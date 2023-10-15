<template>
  <v-app dark>
    <v-navigation-drawer fixed app>
      <!-- <v-layout column full-height> -->
      <v-list-item v-for="item in $store.startItems" :key="item.to" :to="item.to" router exact :prepend-icon="item.icon"
        :title="item.title"></v-list-item>
      <v-spacer></v-spacer>
      <v-list-item v-for="item in $store.endItems" :key="item.to" :to="item.to" router exact :prepend-icon="item.icon"
        :title="item.title"></v-list-item>
      <!-- <MenuList :items="$store.startItems" /> -->
      <!-- <MenuList :items="$store.hymaryItems" v-if="$auth.loggedIn" /> -->
      <!-- <v-spacer></v-spacer> -->
      <!-- <MenuList :items="$auth.loggedIn ? $store.authItems : $store.notAuthItems" /> -->
      <!-- <MenuList :items="$store.endItems" /> -->
      <!-- </v-layout> -->
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <img src="/logo.png" height="40px">
      <h1 class="ml-3">{{ $store.appBarTitle }}</h1>
      <v-spacer></v-spacer>
      <ThemeToggleButton />
    </v-app-bar>
    <v-main>
      <NuxtPage></NuxtPage>
    </v-main>
  </v-app>
  <!-- <v-app>
    <v-main>
      <NuxtPage></NuxtPage>
    </v-main>
  </v-app> -->
</template>

<style scoped>
.v-main {
  width: 1200px;
  margin: auto;
}
</style>

<script>
import ThemeToggleButton from '~/components/ThemeToggleButton.vue'
import MenuList from '~/components/MenuList.vue'

export default {
  name: 'DefaultLayout',
  components: {
    ThemeToggleButton,
    MenuList,
  },
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
