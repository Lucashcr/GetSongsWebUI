<script setup>
import useAuthStore from "~/store/auth";
import useMainStore from "~/store";

const auth = useAuthStore();
const mainStore = useMainStore();

definePageMeta({
  name: "Profile",
  layout: "centered",
  middleware: ["auth"],
});

onMounted(() => {
  mainStore.setAppBarTitle("Deseja editar o seu perfil?");
});
</script>

<template>
  <section>
    <v-card class="d-flex flex-column align-center rounded-lg">
      <v-card-title>Perfil</v-card-title>
      <v-card-text>Nome: {{ auth.user.full_name }}</v-card-text>
      <v-card-text>Usuário: {{ auth.user.username }}</v-card-text>
      <v-card-text>Email: {{ auth.user.email }}</v-card-text>
    </v-card>
  </section>
</template>
