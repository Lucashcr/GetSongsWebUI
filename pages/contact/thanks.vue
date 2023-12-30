<script setup>
import useGlobalStore from "~/store";
const globalStore = useGlobalStore();

definePageMeta({
  name: "ThanksContactView",
  layout: "centered",
});

onMounted(() => {
  globalStore.setAppBarTitle("Mensagem enviada!");
});
</script>

<template>
  <v-card class="pa-4 rounded-xl" width="600px">
    <h2>Obrigado por entrar em contato</h2>

    <p class="mt-4">
      Assim que possível visualizaremos a mensagem enviada e retornaremos pelo
      email disponibilizado. Até a próxima! ;)
    </p>
  </v-card>
</template>
