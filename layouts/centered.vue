<template>
  <v-main>
    <NuxtPage />
  </v-main>
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
  name: "CenteredLayout",
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
