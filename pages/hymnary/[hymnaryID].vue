<script setup>
import useglobalStore from "~/store";

const { $fetchApi } = useNuxtApp();

const route = useRoute();
const globalStore = useglobalStore();

const hymnary = reactive(
  await $fetchApi.get(`/hymnary/${route.params.hymnaryID}`)
);

const editHymnaryTitle = ref(false);

definePageMeta({
  name: "HymnaryEdit",
  layout: "default",
  requiresAuth: true,
});

onMounted(() => {
  globalStore.setAppBarTitle("Mãos à obra!");
});

async function updateHymnary(field, value) {
  await $fetchApi.patch(`/hymnary/${route.params.hymnaryID}/`, {
    [field]: value,
  });
}

async function exportHymnary(hymnaryID) {
  const data = await $fetchApi.get(`/hymnary/${hymnaryID}/export`);
  console.log(data);
  const blob = new Blob([data], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${hymnary.title}.pdf`;
  link.click();
}
</script>

<template>
  <v-card class="mb-2 pa-4">
    <div v-if="editHymnaryTitle" class="pa-4 d-flex ga-4 align-center">
      <v-text-field
        v-model="hymnary.title"
        label="Título do Hinário"
      ></v-text-field>
      <v-btn
        color="primary"
        @click="
          updateHymnary('title', hymnary.title);
          editHymnaryTitle = false;
        "
      >
        Salvar
      </v-btn>
      <v-btn color="secondary" @click="editHymnaryTitle = false">
        Cancelar
      </v-btn>
    </div>
    <div v-else class="pa-4 d-flex ga-4 align-center justify-space-between">
      <h2 @click="editHymnaryTitle = true" style="cursor: pointer">
        {{ hymnary.title }} <v-icon>mdi-note-edit-outline</v-icon>
      </h2>
      <v-btn color="primary" @click="exportHymnary(hymnary.id)">
        Exportar
      </v-btn>
    </div>
    <v-sheet class="d-flex flex-column">
      <v-sheet class="mx-4 mb-6">
        <p>Criado em: {{ $formatDateTime(hymnary.created_at) }}</p>
        <p>Atualizado em: {{ $formatDateTime(hymnary.updated_at) }}</p>
      </v-sheet>
      <v-sheet class="d-flex ga-4 mx-2">
        <v-select
          :items="templatesSelect"
          v-model="hymnary.template"
          label="Template"
          @update:model-value="updateHymnary('template', hymnary.template)"
          class="flex-1-1"
        ></v-select>
        <v-checkbox
          label="Exibir categoria"
          v-model="hymnary.print_category"
          @update:model-value="
            updateHymnary('print_category', hymnary.print_category)
          "
          class="flex-0-0"
        ></v-checkbox>
      </v-sheet>
    </v-sheet>
    <v-sheet class="ma-2">
      <v-card
        :elevation="2"
        rounded="lg"
        color="secondary"
        class="mb-2 pa-4"
        v-for="song in hymnary.songs"
      >
        <div class="d-flex justify-space-between align-start">
          <h3>{{ song.name }}</h3>
          <v-icon>mdi-close</v-icon>
        </div>
        <div class="d-flex justify-space-between align-center">
          <p>{{ song.artist.name }}</p>
          <p>{{ song.category.name }}</p>
        </div>
      </v-card>
    </v-sheet>
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
