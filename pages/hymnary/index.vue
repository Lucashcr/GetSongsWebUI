<script setup>
const { $fetchApi } = useNuxtApp();

const router = useRouter();

const hymnaries = await $fetchApi.get("/hymnary");

definePageMeta({
  name: "HymnaryList",
  layout: "default",
});
</script>

<template>
  <v-card
    class="mb-2"
    v-for="hymnary in hymnaries"
    @click="router.push(`/hymnary/${hymnary.id}`)"
  >
    <v-card-title primary-title>{{ hymnary.title }}</v-card-title>
    <v-card-text>
      <p>Criado em: {{ hymnary.created_at }}</p>
      <p>Atualizado em: {{ hymnary.updated_at }}</p>
      <p>Qtd de músicas: {{ hymnary.songs.length }}</p>
    </v-card-text>
  </v-card>
</template>
