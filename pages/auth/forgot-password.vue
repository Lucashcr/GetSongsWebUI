<script setup>
import useGlobalStore from "~/store";

definePageMeta({
  name: "ForgotPassword",
  layout: "centered",
});

const globalStore = useGlobalStore();
const backendURL = useRuntimeConfig().public.backendURL;

const formValid = ref(null);
const email = ref("");
const messageDialog = reactive({
  show: false,
  title: "",
  messages: [""],
});

async function onSubmit() {
  if (!formValid.value) return;

  globalStore.setLoading(true);
  const response = await $fetch(`${backendURL}/user/forgot-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
    }),
  });

  if (response.ok) {
    messageDialog.title = "Prontinho!";
    messageDialog.messages = [
      "Um email foi enviado para você com um link para redefinir a sua senha.",
      "Caso não encontre o email, verifique a sua caixa de spam.",
      "Mas corre lá, que o link expira em 30 minutos!",
    ];
  } else {
    messageDialog.title = "Ops!";
    messageDialog.messages = [
      "Ocorreu um erro ao enviar o email. Por favor, tente novamente.",
    ];
  }

  globalStore.setLoading(false);
  messageDialog.show = true;
}

const rules = {
  email: [
    (v) => !!v || "Email é obrigatório",
    (v) => /.+@.+\..+/.test(v) || "Email deve ser válido",
  ],
};
</script>

<template>
  <div>
    <Loading v-if="globalStore.isLoading" width="600px" />
    <v-card v-else width="600px" class="pa-2 rounded-xl">
      <v-card-title>Esqueci a senha</v-card-title>
      <v-card-text>
        Insira o seu email abaixo e enviaremos um link para você redefinir a sua
        senha.
      </v-card-text>
      <v-container class="py-0">
        <v-form
          class="text-center"
          @submit.prevent="onSubmit"
          v-model="formValid"
        >
          <v-text-field
            label="Email"
            type="email"
            v-model="email"
            :rules="rules.email"
          />
          <v-btn type="submit" color="primary">Enviar</v-btn>
        </v-form>
      </v-container>
    </v-card>

    <MessageDialog
      v-model="messageDialog.show"
      :title="messageDialog.title"
      :messages="messageDialog.messages"
    />
  </div>
</template>
