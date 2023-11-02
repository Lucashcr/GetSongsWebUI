<script setup>
defineComponent({
  name: "CustomLink",
});

defineProps({
  to: { type: String, required: true },
});
</script>

<template>
  <v-btn color="gray" variant="text" :to="to" append-icon="mdi-open-in-new" size="small" class="py-0 px-1">
    <slot />
  </v-btn>
</template>
