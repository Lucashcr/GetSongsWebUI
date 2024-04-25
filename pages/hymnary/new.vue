<script setup lang="ts">
import useGlobalStore from "~/store";
import type Hymnary from "~/types/hymnary";

const { $fetchApi } = useNuxtApp();

const globalStore = useGlobalStore();

const newHymnary = reactive({
  title: "",
});

const hymnaries = ref([] as Hymnary[]);

function setButtonDisabled() {
  if (newHymnary.title === "") return true;
  return hymnaries.value.some((hymnary) => hymnary.title === newHymnary.title);
}

const rules = [
  (v: string | null) => !!v || "O título é obrigatório",
  (v: string | null) =>
    !hymnaries.value.some((hymnary) => hymnary.title === v) ||
    "Já existe um hinário com esse título",
];

async function saveHymnary() {
  for (const rule of rules) {
    const result = rule(newHymnary.title);
    if (typeof result === "string") {
      return;
    }
  }
  globalStore.setLoading(true);
  const response = (await $fetchApi.post("/hymnary/", newHymnary)) as Hymnary;
  navigateTo(`/hymnary/${response.id}`);
}

definePageMeta({
  name: "HymnaryNewView",
  layout: "centered",
  requiresAuth: true,
});

onMounted(() => {
  globalStore.setLoading(true);
  globalStore.setAppBarTitle("Vamos criar um novo hinário!");
  $fetchApi.get("/hymnary").then((res) => {
    hymnaries.value = res as Hymnary[];
    globalStore.setLoading(false);
  });
});
</script>

<template>
  <Loading v-if="globalStore.isLoading" width="500px" />
  <v-card v-else width="500px" class="pa-4 rounded-xl">
    <v-form
      class="d-flex flex-column align-center"
      @submit.prevent="saveHymnary"
    >
      <v-text-field
        v-model="newHymnary.title"
        label="Título"
        id="new-hymnary-title-input"
        :rules="[
          (v) => !!v || 'O título é obrigatório',
          (v) =>
            !hymnaries.some((hymnary) => hymnary.title === v) ||
            'Já existe um hinário com esse título',
        ]"
      ></v-text-field>
      <v-btn type="submit" :disabled="setButtonDisabled()" color="primary">
        Salvar
      </v-btn>
    </v-form>
  </v-card>
</template>

<style scoped>
.v-text-field {
  width: 100%;
}
</style>
