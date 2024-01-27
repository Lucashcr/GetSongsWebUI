<script setup>
import useGlobalStore from "~/store";

const $route = useRoute();
const $router = useRouter();

const globalStore = useGlobalStore();
const backendURL = useRuntimeConfig().public.backendURL;

definePageMeta({
  name: "RecoverPassword",
  layout: "centered",
});

const token = $route.query.t;

onBeforeMount(async () => {
  if (!token) {
    $router.push("/");
  }
  $router.push("/auth/recover-password");
  const response = await $fetch(
    `${backendURL}/user/reset-password/?t=${token}`
  );
  if (!response.ok) {
    navigateTo("/");
  }
});

const formValid = ref(null);
const password = ref("");
const confirmPassword = ref("");

const messageDialog = reactive({
  show: false,
  title: "",
  messages: [],
});

async function onSubmit() {
  if (!formValid.value) return;

  globalStore.setLoading(true);

  const response = await $fetch(`${backendURL}/user/reset-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      password: password.value,
    }),
  });

  messageDialog.title = response.ok ? "Prontinho!" : "Ops!";
  messageDialog.messages = response.messages;
  messageDialog.show = true;

  globalStore.setLoading(false);
}

const rules = {
  password: [
    (v) => !!v || "Senha é obrigatória",
    (v) => v.length >= 8 || "Senha deve ter pelo menos 8 caracteres",
    (v) => !/\s/.test(v) || "Senha não deve conter espaços",
    (v) =>
      !/[^\x00-\x7F]/.test(v) ||
      "Senha deve conter letras maiúsculas, minúsculas e números",
  ],
  confirmPassword: [
    (v) => !!v || "Confirmação de senha é obrigatória",
    (v) =>
      v === password.value || "Confirmação de senha deve ser igual à senha",
  ],
};
</script>

<template>
  <Loading v-if="globalStore.isLoading" width="600px" />
  <v-card v-else width="600px" class="pa-2 rounded-xl">
    <v-card-title>Recuperar senha</v-card-title>
    <v-card-text> Insira a sua nova senha abaixo. </v-card-text>
    <v-container class="pa-4">
      <v-form
        class="text-center"
        v-model="formValid"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          label="Nova senha"
          type="password"
          v-model="password"
          :rules="rules.password"
        />
        <v-text-field
          label="Confirmar nova senha"
          type="password"
          v-model="confirmPassword"
          :rules="rules.confirmPassword"
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
</template>
