<script setup lang="js">

defineComponent({
  name: "AddSongDialog",
})

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: Boolean,
  hymnary: Object,
})

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const hymnary = computed(() => props.hymnary)

const { $fetchApi } = useNuxtApp();

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
  if (!result.some((a) => a.value === addSongArtist.value)) {
    addSongArtist.value = 0;
  }
}
getArtists();
const addSongArtist = ref(0);

const songs = ref([]);
const addSongSong = ref(null);
const songByLyrics = ref([]);
async function getSongs() {
  songByLyrics.value = "";
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

async function fetchByLyrics() {
  const queryParams = new URLSearchParams();
  queryParams.append("q", songByLyrics.value);
  if (addSongArtist.value) {
    queryParams.append("artist_id", addSongArtist.value);
  }
  if (addSongCategory.value) {
    queryParams.append("category_id", addSongCategory.value);
  }
  const result = (
    await $fetchApi.get(`/song-search?${queryParams.toString()}`)
  ).map((s) => ({
    title: `${s.name} - ${s.artist.name}`,
    value: s.id,
  }));
  songs.value = result;
  addSongSong.value = null;
}

function addSong() {
  $fetchApi
    .post(`/hymnary/${hymnary.value.id}/add/${addSongSong.value}/`, {})
    .then((song) => {
      hymnary.value.songs.push(song);
      emit('update:modelValue', false);
    });
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    :overlay="true"
    max-width="1000px"
    transition="dialog-transition"
    eager
  >
    <v-sheet class="rounded-xl">
      <v-sheet class="d-flex responsive-flex-dir">
        <v-sheet class="pa-4 flex-grow-1 h-100">
          <v-card-title>Adicionar música</v-card-title>
          <v-sheet class="pa-2">
            <v-autocomplete
              :items="categories"
              v-model="addSongCategory"
              label="Categoria"
              @update:model-value="
                async () => {
                  await getArtists();
                  await getSongs();
                }
              "
            ></v-autocomplete>
            <v-autocomplete
              :items="artists"
              v-model="addSongArtist"
              label="Artista"
              @update:model-value="getSongs()"
            ></v-autocomplete>
            <v-autocomplete
              :items="songs"
              v-model="addSongSong"
              label="Música"
              @update:model-value="fetchSong"
            ></v-autocomplete>
            <div class="d-flex flex-row align-center ga-4">
              <v-text-field
                v-model="songByLyrics"
                label="Pesquisar trecho de música"
                clearable
                hint="Digite um trecho da música para pesquisar e clicar no botão ao lado. O resultado será exibido no seletor de músicas."
              ></v-text-field>
              <v-btn color="secondary" @click="fetchByLyrics">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </div>
          </v-sheet>
          <v-sheet class="mx-2 mb-2 d-flex justify-space-between ga-4">
            <v-btn color="primary" @click="addSong"> Adicionar </v-btn>
            <v-btn color="error" @click="$emit('update:modelValue', false)"> Cancelar </v-btn>
          </v-sheet>
        </v-sheet>
        <v-sheet class="pa-4" v-if="addSongPreview">
          <div class="pa-4 w-100 h-100">
            <iframe 
              class="w-100 h-100"
              :src="addSongPreview.preview_url"
              frameborder="0"
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-dialog>
</template>