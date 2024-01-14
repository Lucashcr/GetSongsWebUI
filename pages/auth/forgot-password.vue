<script setup>
definePageMeta({
  name: "ForgotPassword",
  layout: "centered",
});
</script>

<template>
  <v-card width="600px" class="pa-2 rounded-xl">
    <v-card-title>Esqueci a senha</v-card-title>
    <v-card-text>
      Insira o seu email abaixo e enviaremos um link para você redefinir a sua
      senha.
    </v-card-text>
    <v-card-text>
      <v-form class="text-center">
        <v-text-field label="Email" type="email" />
        <v-btn type="submit" color="primary">Enviar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
