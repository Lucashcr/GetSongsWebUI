<script setup>
const { $fetchApi } = useNuxtApp();
const route = useRoute();

let hymnaries = reactive([]);
async function getHymnariesTitle() {
  hymnaries.value = (await $fetchApi.get("/hymnary/")).map((h) => h.title);
}

onMounted(() => {
  getHymnariesTitle();
});

const props = defineProps({
  hymnary: Object,
  modelValue: Boolean,
});

const emit = defineEmits([
  "update:modelValue",
  "openAddSongDialog",
]);

const newHymnaryTitle = ref(props.hymnary.title);
const editHymnaryTitle = ref(false);

const rules = {
  name: [
    (v) => !!v || "O título é obrigatório",
    (v) =>
      !hymnaries.some((hymnary) => hymnary === v) ||
      "Já existe um hinário com esse título",
  ],
};

async function updateHymnary(field, value) {
  await $fetchApi.patch(`/hymnary/${route.params.hymnaryID}/`, {
    [field]: value,
    updated: true,
  });
}
</script>

<template>
  <div
    v-if="editHymnaryTitle"
    class="pa-4 d-flex ga-4 align-center responsive-flex-dir"
  >
    <v-text-field
      v-model="newHymnaryTitle"
      label="Título do Hinário"
      id="edit-hymnary-title-input"
      :rules="rules.name"
    ></v-text-field>
    <v-btn
      color="primary"
      @click="
        () => {
          for (const rule of rules.name) {
            const result = rule(newHymnaryTitle);
            if (typeof result === 'string') {
              return;
            }
          }
          updateHymnary('title', newHymnaryTitle);
          hymnary.title = newHymnaryTitle;
          getHymnariesTitle();
          editHymnaryTitle = false;
        }
      "
      id="edit-hymnary-title-confirm"
      class="full-width"
    >
      Salvar
    </v-btn>
    <v-btn
      color="secondary"
      @click="
        newHymnaryTitle = hymnary.title;
        editHymnaryTitle = false;
      "
      class="full-width"
    >
      Cancelar
    </v-btn>
  </div>
  <div
    v-else
    class="pa-4 d-flex ga-4 align-center justify-space-between responsive-flex-dir"
  >
    <v-sheet class="full-width">
      <h2 id="edit-hymnary-title" @click="editHymnaryTitle = true" style="cursor: pointer">
        {{ hymnary.title }} <v-icon>mdi-note-edit-outline</v-icon>
      </h2>
    </v-sheet>
    <v-sheet class="full-width d-flex responsive-flex-dir ga-4">
      <v-btn color="primary" @click="emit('openAddSongDialog')">
        Adicionar música
      </v-btn>
      <v-btn color="primary" @click="$exportHymnary(hymnary)"> Exportar </v-btn>
    </v-sheet>
  </div>
  <v-sheet class="d-flex flex-column">
    <v-sheet class="d-flex mx-2 responsive-flex-dir">
      <v-select
        :items="templatesSelect"
        v-model="hymnary.template"
        label="Template"
        @update:model-value="updateHymnary('template', hymnary.template)"
        class="flex-1-1 mx-2"
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
</template>

<style>
.responsive-flex-dir {
  flex-direction: row;
}

@media screen and (max-width: 800px) {
  .full-width,
  #edit-hymnary-title-input {
    width: 100%;
  }
  .responsive-flex-dir {
    flex-direction: column;
  }
}
</style>

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
