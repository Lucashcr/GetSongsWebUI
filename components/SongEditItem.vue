<script setup>
defineComponent({
  name: "SongEditItem",
});

defineProps({
  song: {
    type: Object,
    required: true,
  },
  showCategory: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <v-card
    :elevation="2"
    rounded="lg"
    color="secondary"
    class="d-flex align-center mx-2 mb-2 pa-4"
  >
    <div
      class="d-flex flex-column flex-grow-1 justify-space-between align-start"
    >
      <h3>{{ song.name }}</h3>
      <p>{{ song.artist.name }}</p>
    </div>
    <div
      class="d-flex flex-column flex-grow-1 justify-space-between align-end text-right"
    >
      <v-icon @click="$emit('deleted')">mdi-close</v-icon>
      <p>{{ showCategory ? song.category.name : "" }}</p>
    </div>
  </v-card>
</template>

<style scoped>
.v-card {
  cursor: grab
}

#drag-icon {
  display: none;
}

@media (max-width: 800px) {
  #drag-icon {
    display: block;
  }
  .v-card {
    margin: 0 24px 0 8px;
  }
}
</style>
