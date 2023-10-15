<template>
  <v-btn icon @click="toggleTheme">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ThemeToggleButton',
  computed: {
    icon() {
      return this.$vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark', this.$vuetify.theme.dark)
    }
  }
}
</script>