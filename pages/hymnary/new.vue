<script setup lang="ts">
import useglobalStore from "~/store";
import Hymnary from "~/types/hymnary";

const { $fetchApi } = useNuxtApp();

const globalStore = useglobalStore();

const newHymnary = reactive({
  title: "",
});

const hymnaries = ref([] as Hymnary[]);

function setButtonDisabled() {
  if (newHymnary.title === "") return true;
  return hymnaries.value.some((hymnary) => hymnary.title === newHymnary.title);
}

async function saveHymnary() {
  const response = await $fetchApi.post("/hymnary/", newHymnary) as Hymnary;
  navigateTo(`/hymnary/${response.id}`);
}

definePageMeta({
  name: "HymnaryNewView",
  layout: "centered",
  requiresAuth: true,
});

onMounted(() => {
  globalStore.setAppBarTitle("Vamos criar um novo hinário!");
  $fetchApi.get("/hymnary").then((res) => {
    hymnaries.value = res as any[];
  });
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
      ></v-text-field>
      <v-btn type="submit" :disabled="setButtonDisabled()" color="primary"
        >Salvar</v-btn
      >
    </v-form>
  </v-card>
</template>

<style scoped>
.v-text-field {
  width: 100%;
}
</style>
