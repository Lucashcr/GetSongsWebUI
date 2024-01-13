<script setup lang="ts">
import useAuthStore from "~/store/auth";
import useGlobalStore from "~/store";
import type User from "~/types/user";

const auth = useAuthStore();
const globalStore = useGlobalStore();
const { $fetchApi } = useNuxtApp();

const user = auth.user as User;

console.log(user);

const message = reactive({
  name: user.full_name,
  email: user.email,
  text: "",
});

function sendMessage() {
  globalStore.setLoading(true);

  const data = {
    name: message.name,
    email: message.email,
    message: message.text,
  };

  if (!EMAIL_REGEX.test(message.email)) {
    alert("Por favor, digite um email válido!");
    return;
  }

  $fetchApi
    .post("/sendmail/", data)
    .then(() => {
      navigateTo("/contact/thanks");
    })
    .catch((error) => {
      alert("Ocorreu um erro ao enviar a mensagem!");
      globalStore.setLoading(false);
      console.error(error);
    });
}

const EMAIL_REGEX = /^.+@.+\..+$/;

const rules = {
  email: [
    (v: string) => !!v || "E-mail é obrigatório.",
    (v: string) => EMAIL_REGEX.test(v) || "E-mail deve ser válido.",
  ],
};

definePageMeta({
  name: "Contact",
  layout: "centered",
  requiresAuth: true,
});

onMounted(() => {
  globalStore.setAppBarTitle("Fale conosco!");
  globalStore.setLoading(false);
});
</script>

<template>
  <Loading v-if="globalStore.isLoading" width="500px" />
  <v-card v-else class="pa-4 rounded-xl">
    <v-card-title>
      Se você tem alguma dúvida ou sugestão, pode entrar em contato conosco
      através do formulário abaixo:
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="sendMessage">
        <v-text-field
          label="Nome"
          required
          v-model="message.name"
        ></v-text-field>
        <v-text-field
          label="E-mail"
          required
          v-model="message.email"
          :rules="rules.email"
        ></v-text-field>
        <v-textarea
          label="Mensagem"
          required
          v-model="message.text"
        ></v-textarea>
        <div class="d-flex justify-center">
          <v-btn type="submit" color="primary">Enviar</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
