<script setup lang="ts">
import useMainStore from "~/store";
const mainStore = useMainStore();

const backendURL = useRuntimeConfig().public.backendURL;

definePageMeta({
  name: "Register",
  layout: "centered",
});

onMounted(() => {
  mainStore.setAppBarTitle("Junte-se a nós!");
});

const user = reactive({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const errorMessages = ref([] as string[]);

function validateData() {
  let error = false;
  errorMessages.value = [];

  if (!user.first_name) {
    errorMessages.value.push("Nome é obrigatório.");
    error = true;
  }

  if (!user.username) {
    errorMessages.value.push("Usuário é obrigatório.");
    error = true;
  }

  if (!user.email) {
    errorMessages.value.push("E-mail é obrigatório.");
    error = true;
  }

  if (!user.password) {
    errorMessages.value.push("Senha é obrigatória.");
    error = true;
  }

  if (!user.password_confirmation) {
    errorMessages.value.push("Confirmação de senha é obrigatória.");
    error = true;
  }

  if (user.password !== user.password_confirmation) {
    errorMessages.value.push("As senhas não conferem.");
    error = true;
  }

  if (error) return false;
  else return true;
}

const EMAIL_REGEX = /^.+@.+\..+$/;

const rules = {
  email: [
    (v: string) => !!v || "E-mail é obrigatório.",
    (v: string) => EMAIL_REGEX.test(v) || "E-mail deve ser válido.",
  ],
};

async function register() {
  if (!validateData()) return;

  await $fetch("/user/register/", {
    method: "POST",
    body: user,
  })
    .then((res) => {
      alert("Usuário criado com sucesso!");
      navigateTo("/auth/login");
    })
    .catch((err) => {
      if (err.response.status === 400) {
        const errorMessages = err.response.data;
      } else if (err.response.status === 500) {
      }
    });
}
</script>

<template>
  <v-card width="600px" class="pa-4 rounded-xl">
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
          required
        />
        <v-text-field label="Sobrenome" v-model="user.last_name" type="text" />
        <v-text-field label="Usuário" v-model="user.username" type="text" />
        <v-text-field label="E-mail" v-model="user.email" type="email" />
        <v-text-field label="Senha" v-model="user.password" type="password" />
        <v-text-field
          label="Confirme a senha"
          v-model="user.password_confirmation"
          type="password"
        />
        <v-btn color="primary" type="submit">Enviar</v-btn>
      </v-form>
      <div v-if="errorMessages.length" class="mt-5">
        <v-alert type="error" dismissible>
          <p v-for="message in errorMessages">{{ message }}</p>
        </v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-text-field {
  width: 100%;
}
</style>
