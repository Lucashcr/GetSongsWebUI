<template>
  <v-card width="400px" class="pa-2 rounded-xl">
    <v-card-title>Entrar</v-card-title>
    <v-card-text>
      <v-form class="d-flex flex-column align-center" @submit.prevent="login">
        <v-text-field label="Usuário" v-model="user.username" type="text" />
        <v-text-field label="Senha" v-model="user.password" type="password" />
        <v-btn type="submit" color="primary">Entrar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-text-field {
  width: 100%;
}
</style>

<script>
definePageMeta({
  layout: 'centered',
})

export default {
  name: "Login",
  layout: "centered",
  head: {
    title: "Entrar",
  },
  created() {
    // this.$store.global.setAppBarTitle('Bem-vindo de volta!')
    // this.$axios.get('/api/category/')
    //   .then(res => {
    //     console.log(res.data)
    //   })
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    async login() {
      // $fetch('http://localhost:8000/api/token/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(this.user)
      // })
      //   .then(res => res.json())
      //   .then(res => {
      //     console.log(res)
      //     // this.$auth.setUserToken(res.access)
      //     // this.$auth.setUser(res.user)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   }
      $fetch('http://localhost:8000/user/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.user)
      })
        .then(res => {
          console.log(res)
          // this.$auth.setUserToken(res.access)
          // this.$auth.setUser(res.user)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>