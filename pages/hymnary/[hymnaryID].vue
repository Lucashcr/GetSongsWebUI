<script setup>
const { $fetchApi } = useNuxtApp();

const route = useRoute();

const hymnary = await $fetchApi.get(`/hymnary/${route.params.hymnaryID}`);

definePageMeta({
  name: "HymnaryEdit",
  layout: "default",
});
</script>

<template>
  <v-card class="mb-2">
    <v-card-title primary-title>{{ hymnary.title }}</v-card-title>
    <div class="d-flex flex-column px-3">
      <p>Criado em: {{ $formatDateTime(hymnary.created_at) }}</p>
      <p>Atualizado em: {{ $formatDateTime(hymnary.updated_at) }}</p>
      <v-select
        :items="templatesSelect"
        v-model="hymnary.template"
        label="Template"
        class="flex-grow-1"
      ></v-select>
      <v-checkbox
        label="Exibir categoria"
        v-model="hymnary.print_category"
        class="flex-shrink-1"
      ></v-checkbox>
    </div>
  </v-card>
  <v-card class="mb-2 pa-4" v-for="song in hymnary.songs">
    <div class="d-flex justify-space-between align-center">
      <p>{{ song.name }}</p>
      <v-icon>mdi-close</v-icon>
    </div>
    <div class="d-flex justify-space-between align-center">
      <p>{{ song.artist.name }}</p>
      <p>{{ song.category.name }}</p>
    </div>
    <!-- <v-card-text>
      <p>Criado em: {{ hymnary.created_at }}</p>
      <p>Atualizado em: {{ hymnary.updated_at }}</p>
      <p>Qtd de músicas: {{ hymnary.songs.length }}</p>
    </v-card-text> -->
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
    value: "double-column",
  },
  {
    title: "Uma música por página",
    value: "each-song-by-page",
  },
];
</script>
