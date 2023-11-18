<script setup>
import useglobalStore from "~/store";
import draggable from "vuedraggable";

const { $fetchApi, $exportHymnary } = useNuxtApp();

const route = useRoute();
const globalStore = useglobalStore();

const hymnary = reactive(
  await $fetchApi.get(`/hymnary/${route.params.hymnaryID}`).catch(() => {
    navigateTo("/hymnary");
    return {};
  })
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

const addSongDialog = ref(false);

const categories = (await $fetchApi.get("/category/")).map((c) => ({
  title: c.name,
  value: c.id,
}));
categories.unshift({
  title: "Todas",
  value: 0,
});
const addSongCategory = ref(0);

const artists = ref([{ title: "Todos", value: 0 }]);
async function getArtists() {
  const result = (
    await $fetchApi.get(`/artist/?category_id=${addSongCategory.value}`)
  ).map((a) => ({
    title: a.name,
    value: a.id,
  }));
  result.unshift({
    title: "Todos",
    value: 0,
  });
  artists.value = result;
}
getArtists();
const addSongArtist = ref(0);

const songs = ref([]);
const addSongSong = ref(null);
async function getSongs() {
  const result = (
    await $fetchApi.get(
      `/song/?category_id=${addSongCategory.value}&artist_id=${addSongArtist.value}`
    )
  ).map((s) => ({
    title: `${s.name} - ${s.artist.name}`,
    value: s.id,
  }));
  songs.value = result;
  addSongSong.value = null;
}
getSongs();

const addSongPreview = ref(null);
async function fetchSong() {
  const result = await $fetchApi.get(`/song/${addSongSong.value}`);
  addSongPreview.value = result;
}

async function updateHymnary(field, value) {
  await $fetchApi.patch(`/hymnary/${route.params.hymnaryID}/`, {
    [field]: value,
    updated: true,
  });
}

function reorderSongs() {
  $fetchApi.post(`/hymnary/${route.params.hymnaryID}/reorder/`, {
    songs: hymnary.songs,
  });
}

function addSong() {
  $fetchApi
    .post("/hymnarysong/", {
      song: addSongSong.value,
      hymnary: route.params.hymnaryID,
      order: hymnary.songs.length + 1,
    })
    .then(() => {
      hymnary.songs.push(addSongPreview.value);
      addSongDialog.value = false;
    });
}

function removeSong(song) {
  $fetchApi.delete(`/hymnarysong/${song.hymnarysong}/`).then(() => {
    const index = hymnary.songs.findIndex((s) => s.id === song.id);
    hymnary.songs.splice(index, 1);
  });
}
</script>

<template>
  <v-card class="mb-2 mx-4 pa-4">
    <div
      v-if="editHymnaryTitle"
      class="pa-4 d-flex ga-4 align-center responsive-flex-dir"
    >
      <v-text-field
        v-model="hymnary.title"
        label="Título do Hinário"
        class="edit-hymnary-title-field"
      ></v-text-field>
      <v-btn
        color="primary"
        @click="
          updateHymnary('title', hymnary.title);
          editHymnaryTitle = false;
        "
        class="full-width"
      >
        Salvar
      </v-btn>
      <v-btn
        color="secondary"
        @click="editHymnaryTitle = false"
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
        <h2 @click="editHymnaryTitle = true" style="cursor: pointer">
          {{ hymnary.title }} <v-icon>mdi-note-edit-outline</v-icon>
        </h2>
      </v-sheet>
      <v-sheet class="full-width d-flex responsive-flex-dir ga-4">
        <v-btn color="primary" @click="addSongDialog = true">
          Adicionar música
        </v-btn>
        <v-btn color="primary" @click="$exportHymnary(hymnary)">
          Exportar
        </v-btn>
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
    <v-sheet class="ma-2">
      <draggable
        v-model="hymnary.songs"
        animation="200"
        @start="drag = true"
        @end="
          drag = false;
          reorderSongs();
        "
        @touchstart.native="drag = true"
        @touchend.native="
          drag = false;
          reorderSongs();
        "
        item-key="id"
      >
        <template #item="{ element }">
          <SongEditItem
            :song="element"
            :show-category="hymnary.print_category"
            @deleted="removeSong(element)"
          />
        </template>
      </draggable>
    </v-sheet>
  </v-card>

  <v-dialog
    v-model="addSongDialog"
    :overlay="true"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-sheet class="rounded-xl">
      <v-sheet class="responsive-flex-dir">
        <v-sheet class="ma-4">
          <v-card-title>Adicionar música</v-card-title>
          <v-sheet class="pa-2">
            <v-select
              :items="categories"
              v-model="addSongCategory"
              label="Categoria"
              @update:model-value="
                getArtists();
                getSongs();
              "
            ></v-select>
            <v-select
              :items="artists"
              v-model="addSongArtist"
              label="Artista"
              @update:model-value="getSongs()"
            ></v-select>
            <v-select
              :items="songs"
              v-model="addSongSong"
              label="Música"
              @update:model-value="fetchSong()"
            ></v-select>
          </v-sheet>
        </v-sheet>
        <v-sheet class="ma-4" v-if="addSongPreview">
          <v-card-title primary-title> Preview </v-card-title>
          <div class="px-4">
            <iframe
              style="border-radius: 15px"
              :src="addSongPreview.preview_url"
              width="100%"
              height="232"
              frameborder="0"
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </v-sheet>
      </v-sheet>
      <v-sheet class="mx-8 mb-8 d-flex justify-end ga-4">
        <v-btn color="success" @click="addSong"> Adicionar </v-btn>
        <v-btn color="error" @click="addSongDialog = false"> Cancelar </v-btn>
      </v-sheet>
    </v-sheet>
  </v-dialog>
</template>

<style scoped lang="scss">
@import "~/assets/variables.scss";

.sortable-ghost {
  background: transparent !important;
  color: transparent !important;
  border: 2px dashed $lightgray;
}

.responsive-flex-dir {
  flex-direction: row;
}

@media screen and (max-width: 800px) {
  .full-width,
  .edit-hymnary-title-field {
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
