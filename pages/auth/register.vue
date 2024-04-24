<script setup lang="ts">
import useGlobalStore from "~/store";
const globalStore = useGlobalStore();

const backendURL = useRuntimeConfig().public.backendURL;

definePageMeta({
  name: "Register",
  layout: "centered",
});

onMounted(() => {
  globalStore.setAppBarTitle("Junte-se a nós!");
});

const user = reactive({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const EMAIL_REGEX = /^.+@.+\..+$/;

const rules = {
  first_name: [(v: string) => !!v || "Nome é obrigatório."],
  email: [
    (v: string) => !!v || "E-mail é obrigatório.",
    (v: string) => EMAIL_REGEX.test(v) || "E-mail deve ser válido.",
  ],
  password: [
    (v: string) => !!v || "Senha é obrigatória.",
    (v: string) => v.length >= 8 || "Senha deve ter no mínimo 8 caracteres.",
  ],
  password_confirmation: [
    (v: string) => !!v || "Confirmação de senha é obrigatória.",
    (v: string) => v === user.password || "As senhas não conferem.",
  ],
};

const errorMessages = ref([] as string[]);

function validateData() {
  let error = false;
  errorMessages.value = [];

  for (const rule of rules.first_name) {
    const message = rule(user.first_name);
    if (typeof message === "string") {
      errorMessages.value.push(message);
      error = true;
    }
  }

  if (!user.username) {
    errorMessages.value.push("Usuário é obrigatório.");
    error = true;
  }

  for (const rule of rules.email) {
    const message = rule(user.email);
    if (typeof message === "string") {
      errorMessages.value.push(message);
      error = true;
    }
  }

  for (const rule of rules.password) {
    const message = rule(user.password);
    if (typeof message === "string") {
      errorMessages.value.push(message);
      error = true;
    }
  }

  for (const rule of rules.password_confirmation) {
    const message = rule(user.password_confirmation);
    if (typeof message === "string") {
      errorMessages.value.push(message);
      error = true;
    }
  }

  if (error) return false;
  else return true;
}

async function register() {
  if (!validateData()) return;

  globalStore.setLoading(true);
  await $fetch(`${backendURL}/user/register/`, {
    method: "POST",
    body: JSON.stringify(user),
  })
    .then((res) => {
      alert("Usuário criado com sucesso!");
      navigateTo("/auth/login");
    })
    .catch((err) => {
      if (err.response.status === 400) {
        errorMessages.value = err.response._data;
      }
    });
  globalStore.setLoading(false);
}
</script>

<template>
  <Loading v-if="globalStore.isLoading" width="800px" />
  <v-card v-else width="600px" class="pa-4 rounded-xl">
    <v-card-title>Criar conta</v-card-title>
    <v-card-text>
      <v-form
        class="d-flex flex-column align-center"
        @submit.prevent="register"
      >
        <v-text-field
          label="Nome"
          v-model="user.first_name"
          type="text"
          :rules="rules.first_name"
          id="first_name"
        />
        <v-text-field
          label="Sobrenome"
          v-model="user.last_name"
          type="text"
          id="last_name"
        />
        <v-text-field
          label="Usuário"
          v-model="user.username"
          type="text"
          id="username"
        />
        <v-text-field
          label="E-mail"
          v-model="user.email"
          type="email"
          :rules="rules.email"
          id="email"
        />
        <v-text-field
          label="Senha"
          v-model="user.password"
          type="password"
          :rules="rules.password"
          id="password"
        />
        <v-text-field
          label="Confirme a senha"
          v-model="user.password_confirmation"
          type="password"
          :rules="rules.password_confirmation"
          id="confirm_password"
        />
        <v-btn color="primary" type="submit">Enviar</v-btn>
      </v-form>
      <v-sheet v-if="errorMessages.length" class="mt-5">
        <v-alert type="error" dismissible>
          <p v-for="message in errorMessages">{{ message }}</p>
        </v-alert>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-text-field {
  width: 100%;
}
</style>
