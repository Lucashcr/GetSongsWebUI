<script setup lang="ts">
defineComponent({
  name: "CustomLink",
});

defineProps({
  to: { type: String, required: true },
});

function openClickedLink(to: string) {
  window.open(to, "_blank");
}
</script>

<template>
  <v-btn
    color="gray"
    variant="text"
    @click="openClickedLink(to)"
    append-icon="mdi-open-in-new"
    size="small"
    class="py-0 px-1"
  >
    <slot />
  </v-btn>
</template>
