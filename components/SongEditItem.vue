<script setup>
defineComponent({
  name: "SongEditItem",
});

defineProps({
  song: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-card :elevation="2" rounded="lg" color="secondary" class="mb-2 pa-4">
    <div class="d-flex justify-space-between align-start">
      <h3>{{ song.name }}</h3>
      <v-icon @click="$emit('deleted')">mdi-close</v-icon>
    </div>
    <div class="d-flex justify-space-between align-center">
      <p>{{ song.artist.name }}</p>
      <p>{{ song.category.name }}</p>
    </div>
  </v-card>
</template>
