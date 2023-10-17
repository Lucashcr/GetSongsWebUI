<template>
  <section>
    <v-card class="d-flex flex-column align-center rounded-lg">
      <v-card-title>Perfil</v-card-title>
      <v-card-text>Nome: {{ $auth.user.full_name }}</v-card-text>
      <v-card-text>Usuário: {{ $auth.user.username }}</v-card-text>
      <v-card-text>Email: {{ $auth.user.email }}</v-card-text>
    </v-card>
  </section>
</template>

<script>
definePageMeta({
  layout: "centered",
});

export default {
  name: "ProfileView",
  middleware: ["auth"],
  created() {
    this.$store.setAppBarTitle("Deseja editar seu perfil?");
  },
};
</script>
