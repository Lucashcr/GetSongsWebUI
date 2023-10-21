<script setup>
definePageMeta({
  name: "Login",
  layout: "centered",
  auth: false,
});
</script>

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
import { useAuthStore } from "~/store/auth";

export default {
  created() {
    this.$store.setAppBarTitle("Bem-vindo de volta!");
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async login() {
      try {
        const auth = useAuthStore();
        const tokenData = await $fetch("http://localhost:8000/user/token/", {
          method: "POST",
          body: this.user,
        });
        auth.setToken(tokenData.access);
        const userData = await $fetch("http://localhost:8000/user/me/", {
          headers: {
            Authorization: `Bearer ${tokenData.access}`,
          },
        });
        auth.setUser(userData);
        this.$router.push("/");
      } catch (error) {
        alert("Usuário ou senha incorretos");
      }
    },
  },
};
</script>
