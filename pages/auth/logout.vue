<script setup>
import useAuthStore from "~/store/auth";
const auth = useAuthStore();

definePageMeta({
  name: "Logout",
  layout: "centered",
  middleware: ["auth"],
});

function logout() {
  auth.logout();
  navigateTo("/");
}
</script>

<template>
  <v-card class="d-flex flex-column align-center rounded-lg">
    <v-card-title>Tem certeza que deseja sair?</v-card-title>
    <v-form @submit.prevent="logout">
      <v-btn type="submit" color="primary" class="mb-4">Confirmar</v-btn>
    </v-form>
  </v-card>
</template>
