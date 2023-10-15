<template>
  <v-main>
    <NuxtPage></NuxtPage>
  </v-main>
</template>

<style scoped>
.v-main {
  width: 1200px;
  margin: auto;
}
</style>

<script>
import ThemeToggleButton from "~/components/ThemeToggleButton.vue";
import MenuList from "~/components/MenuList.vue";

export default {
  name: "DefaultLayout",
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
};
</script>
