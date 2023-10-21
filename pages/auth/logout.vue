<script setup>
definePageMeta({
  layout: "centered",
});
</script>

<template>
  <v-card class="d-flex flex-column align-center rounded-lg">
    <v-card-title>Tem certeza que deseja sair?</v-card-title>
    <v-form @submit.prevent="logout">
      <v-btn type="submit" color="primary" class="mb-4">Confirmar</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { useAuthStore } from "~/store/auth";

export default {
  name: "LogoutView",
  middleware: ["auth"],
  created() {
    this.$store.setAppBarTitle("Já vai? 😢");
  },
  methods: {
    async logout() {
      const auth = useAuthStore();
      await auth.logout();
      this.$router.push("/");
    },
  },
};
</script>
