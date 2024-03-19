<script setup>
import useGlobalStore from "~/store";
import draggable from "vuedraggable";

const { $fetchApi } = useNuxtApp();

const route = useRoute();
const globalStore = useGlobalStore();

const hymnary = reactive(
  await $fetchApi.get(`/hymnary/${route.params.hymnaryID}`).catch(() => {
    return navigateTo("/hymnary");
  })
);

definePageMeta({
  name: "HymnaryEdit",
  layout: "default",
  requiresAuth: true,
});

onMounted(() => {
  globalStore.setAppBarTitle("Mãos à obra!");
  globalStore.setLoading(false);
});

const addSongDialog = ref(false);

function reorderSongs() {
  $fetchApi.post(`/hymnary/${route.params.hymnaryID}/reorder/`, {
    songs: hymnary.songs.map((s) => s.id),
  });
}

function removeSong(song) {
  $fetchApi.delete(`/hymnarysong/${song.song_hymnaries}/`).then(() => {
    const index = hymnary.songs.findIndex((s) => s.id === song.id);
    hymnary.songs.splice(index, 1);
  });
}
</script>

<template>
  <Loading v-if="globalStore.isLoading" />
  <v-card v-else class="mb-2 mx-2 pa-4">
    <EditHymnaryConfigheader
      :hymnary="hymnary"
      @openAddSongDialog="addSongDialog = true"
    />
    <v-sheet class="ma-2">
      <draggable
        v-model="hymnary.songs"
        animation="200"
        @start="drag = true"
        @end="
          drag = false;
          reorderSongs();
        "
        @touchstart="drag = true"
        @touchend="
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
  <EditHymnaryAddSongDialog
    v-model="addSongDialog"
    :hymnary="hymnary"
  />
</template>

<style scoped lang="scss">
@import "~/assets/variables.scss";

.sortable-ghost {
  background: transparent !important;
  color: transparent !important;
  border: 2px dashed $lightgray;
}
</style>
