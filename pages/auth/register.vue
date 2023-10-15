<template>
  <v-card width="600px" class="pa-4 rounded-xl">
    <v-card-title>Criar conta</v-card-title>
    <v-card-text>
      <v-form class="d-flex flex-column align-center" @submit.prevent="register">
        <v-text-field label="Nome" v-model="user.first_name" type="text" required />
        <v-text-field label="Sobrenome" v-model="user.last_name" type="text" />
        <v-text-field label="Usuário" v-model="user.username" type="text" />
        <v-text-field label="E-mail" v-model="user.email" type="email" :rules="[...rules.email]" />
        <v-text-field label="Senha" v-model="user.password" type="password" />
        <v-text-field label="Confirme a senha" v-model="user.password_confirmation" type="password"
          :rules="[rules.password_confirmation]" />
        <v-btn color="primary" type="submit">Enviar</v-btn>
      </v-form>
      <div v-if="errorMessages.length" class="mt-5">
        <v-alert type="error" dismissible>
          <p v-for="message in errorMessages">{{ message }}</p>
        </v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-text-field {
  width: 100%;
}
</style>

<script>
export default {
  name: 'Register',
  layout: 'centered',
  head: {
    title: 'Cadastre-se'
  },
  mounted() {
    this.$store.setAppBarTitle('Junte-se a nós!')
  },
  data() {
    return {
      user: {},
      rules: {
        password_confirmation: v => v === this.user.password || 'As senhas não conferem.',
        email: [
          v => /.+@.+\..+/.test(v) || 'E-mail inválido.',
          v => !!v || 'E-mail é obrigatório.'
        ]
      },
      errorMessages: []
    }
  },
  methods: {
    async register() {
      if (!this.validateData()) return

      await this.$axios.post('/user/register/', this.user)
        .then(res => {
          this.$toasted.global.defaultSuccess({
            msg: 'Usuário criado com sucesso!'
          })
          this.$router.push('/auth/login')
        })
        .catch(err => {
          if (err.response.status === 400)
            this.errorMessages = err.response.data
          else if (err.response.status === 500)
            this.$toasted.global.defaultError({
              msg: 'Erro ao criar usuário. Contate o administrador do sistema.'
            })
        })
    },
    validateData() {
      let error = false
      this.errorMessages = []

      if (!this.user.first_name) {
        this.errorMessages.push('Nome é obrigatório.')
        error = true
      }

      if (!this.user.username) {
        this.errorMessages.push('Usuário é obrigatório.')
        error = true
      }

      if (!this.user.email) {
        this.errorMessages.push('E-mail é obrigatório.')
        error = true
      }

      if (!this.user.password) {
        this.errorMessages.push('Senha é obrigatória.')
        error = true
      }

      if (!this.user.password_confirmation) {
        this.errorMessages.push('Confirmação de senha é obrigatória.')
        error = true
      }

      if (this.user.password !== this.user.password_confirmation) {
        this.errorMessages.push('As senhas não conferem.')
        error = true
      }

      if (error)
        return false
      else
        return true
    }
  }
}
</script>