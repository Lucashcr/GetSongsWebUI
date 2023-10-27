<script setup>
import useglobalStore from "~/store";

const { $fetchApi } = useNuxtApp();

const route = useRoute();
const globalStore = useglobalStore();

const hymnary = reactive(
  await $fetchApi.get(`/hymnary/${route.params.hymnaryID}`)
);

definePageMeta({
  name: "HymnaryEdit",
  layout: "default",
});

onMounted(() => {
  globalStore.setAppBarTitle("Mãos à obra!");
});

async function updateHymnary(field, value) {
  await $fetchApi.patch(`/hymnary/${route.params.hymnaryID}/`, {
    [field]: value,
  });
}
</script>

<template>
  <v-card class="mb-2 pa-4">
    <h1 primary-title>{{ hymnary.title }} <v-icon>mdi-edit</v-icon></h1>
    <div class="d-flex flex-column">
      <p>Criado em: {{ $formatDateTime(hymnary.created_at) }}</p>
      <p>Atualizado em: {{ $formatDateTime(hymnary.updated_at) }}</p>
      <v-select
        :items="templatesSelect"
        v-model="hymnary.template"
        label="Template"
        @update:model-value="updateHymnary('template', $event)"
      ></v-select>
      <v-checkbox
        label="Exibir categoria"
        v-model="hymnary.print_category"
        @update:model-value="updateHymnary('print_category', $event)"
      ></v-checkbox>
    </div>
  </v-card>
  <v-card class="mb-2 pa-4" v-for="song in hymnary.songs">
    <div class="d-flex justify-space-between align-start">
      <h3>{{ song.name }}</h3>
      <v-icon>mdi-close</v-icon>
    </div>
    <div class="d-flex justify-space-between align-center">
      <p>{{ song.artist.name }}</p>
      <p>{{ song.category.name }}</p>
    </div>
  </v-card>
</template>

<script>
const templatesSelect = [
  {
    title: "Uma coluna",
    value: "single-column",
  },
  {
    title: "Duas colunas",
    value: "two-columns",
  },
  {
    title: "Uma música por página",
    value: "each-song-by-page",
  },
];
</script>
