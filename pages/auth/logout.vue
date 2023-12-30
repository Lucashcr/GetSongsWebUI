<script setup>
import useAuthStore from "~/store/auth";
import useGlobalStore from "~/store";

const authStore = useAuthStore();
const globalStore = useGlobalStore();

function logout() {
  globalStore.setLoading(true);
  authStore.logout();
  globalStore.setLoading(false);
  navigateTo("/");
}

definePageMeta({
  name: "Logout",
  layout: "centered",
  requiresAuth: true,
});

onMounted(() => {
  globalStore.setAppBarTitle("Já vai?");
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
