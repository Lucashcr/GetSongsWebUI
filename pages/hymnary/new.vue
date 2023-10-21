<script setup lang="ts">
import useglobalStore from "~/store";

const { $fetchApi } = useNuxtApp();

const globalStore = useglobalStore();

const backendURL = useRuntimeConfig().public.backendURL;

const newHymnary = reactive({
  title: "",
});

const hymnaries = ref([] as any[]);

function setButtonDisabled() {
  if (newHymnary.title === "") return true;
  return hymnaries.value.some((hymnary) => hymnary.title === newHymnary.title);
}

async function saveHymnary() {
  const response = await $fetchApi.post("/hymnary/", newHymnary);
  console.log(response);
  // if (response?.status === 200) {
  //   navigateTo("/hymnary/");
  // }
}

definePageMeta({
  name: "HymnaryNewView",
  layout: "centered",
  head: {
    title: "Novo Hinário",
  },
  middleware: ["auth"],
});

onMounted(() => {
  globalStore.setAppBarTitle("Vamos criar um novo hinário!");
  $fetchApi.get("/hymnary").then((res) => {
    console.log(res);
    hymnaries.value = res as any[];
    console.log(hymnaries.value);
  });
  // $fetch(`${backendURL}/api/hymnary`, {}).then((res) => {
  //   console.log(res);
  // });
});
</script>

<template>
  <v-card width="500px" class="pa-4 rounded-xl">
    <v-form
      class="d-flex flex-column align-center"
      @submit.prevent="saveHymnary"
    >
      <v-text-field
        v-model="newHymnary.title"
        label="Título"
        required
        width="100%"
      ></v-text-field>
      <v-btn
        type="submit"
        :disabled="setButtonDisabled()"
        color="primary"
        width="100%"
        >Salvar</v-btn
      >
    </v-form>
  </v-card>
</template>
