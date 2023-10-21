<script setup lang="ts">
import useAuthStore from "~/store/auth";
import useMainStore from "~/store";

const auth = useAuthStore();
const mainStore = useMainStore();

const message = reactive({
  name: auth.isAuthenticated ? auth.user.full_name : "",
  email: auth.isAuthenticated ? auth.user.email : "",
  text: "",
});

function sendMessage() {
  const data = {
    name: message.name,
    email: message.email,
    message: message.text,
  };

  if (!EMAIL_REGEX.test(message.email)) {
    alert("Por favor, digite um email válido!");
    return;
  }

  navigateTo("/thanks");
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
});

onMounted(() => {
  mainStore.setAppBarTitle("Fale conosco!");
});
</script>

<template>
  <v-card class="pa-4 rounded-xl">
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
