<template>
  <v-card class="d-flex flex-column align-center rounded-lg">
    <v-card-title>Tem certeza que deseja sair?</v-card-title>
    <v-form @submit.prevent="logout">
      <v-btn type="submit" color="primary" class="mb-4">Confirmar</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'Logout',
  layout: 'centered',
  head: {
    title: 'Sair'
  },
  middleware: ['auth'],
  created() {
    this.$store.setAppBarTitle('Já vai? 😢')
  },
  methods: {
    async logout() {
      this.$toast.global.defaultSuccess({
        msg: `Até a próxima, ${this.$auth.user.first_name}! 😉`
      })
      await this.$auth.logout()
      this.$router.push('/')
    }
  }
}
</script>