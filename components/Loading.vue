<script setup>
defineProps({
  width: {
    type: String,
    default: "100%",
  },
});
</script>

<template>
  <v-card class="pa-4">
    <v-skeleton-loader type="paragraph" :width="width"></v-skeleton-loader>
  </v-card>
</template>

<style scoped>
.container {
  padding: 15px;
  background-color: white;
}
</style>
