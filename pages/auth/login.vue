<script setup>
import useGlobalStore from "~/store";
import useAuthStore from "~/store/auth";

const backendURL = useRuntimeConfig().public.backendURL;

const auth = useAuthStore();
const globalStore = useGlobalStore();

definePageMeta({
  name: "Login",
  layout: "centered",
});

onMounted(() => {
  globalStore.setAppBarTitle("Bem-vindo de volta!");
});

const user = reactive({
  username: "",
  password: "",
});

async function login() {
  globalStore.setLoading(true);
  try {
    const tokenData = await $fetch(`${backendURL}/user/token/`, {
      method: "POST",
      body: user,
    });
    auth.setToken(tokenData);
    const userData = await $fetch(`${backendURL}/user/me/`, {
      headers: {
        Authorization: `Bearer ${tokenData.access}`,
      },
    });
    auth.setUser(userData);
    auth.isAuthenticated = true;

    const next = useRoute().query.next;
    if (next) {
      return navigateTo(next);
    } else {
      navigateTo("/hymnary");
    }
  } catch (error) {
    alert("Usuário ou senha incorretos");
    globalStore.setLoading(false);
  }
}
</script>

<template>
  <Loading v-if="globalStore.isLoading" width="400px" />
  <v-card v-else width="400px" class="pa-2 rounded-xl">
    <v-card-title>Entrar</v-card-title>
    <v-card-text>
      <v-form class="d-flex flex-column align-center" @submit.prevent="login">
        <v-text-field label="Usuário" v-model="user.username" type="text" />
        <v-text-field label="Senha" v-model="user.password" type="password" />
        <v-btn type="submit" color="primary">Entrar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-text-field {
  width: 100%;
}
</style>
