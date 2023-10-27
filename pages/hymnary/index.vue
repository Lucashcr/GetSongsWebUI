<script setup>
import useglobalStore from "~/store";

const { $fetchApi, $formatDateTime } = useNuxtApp();
const router = useRouter();
const globalStore = useglobalStore();

const hymnaries = await $fetchApi.get("/hymnary");

definePageMeta({
  name: "HymnaryList",
  layout: "default",
  requiresAuth: true,
});

onMounted(() => {
  globalStore.setAppBarTitle("Aqui estão seus hinários!");
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
      <p>Criado em: {{ $formatDateTime(hymnary.created_at) }}</p>
      <p>Atualizado em: {{ $formatDateTime(hymnary.updated_at) }}</p>
      <p>Qtd de músicas: {{ hymnary.songs.length }}</p>
    </v-card-text>
  </v-card>
</template>
