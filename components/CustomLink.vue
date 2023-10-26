<script setup>
defineComponent({
  name: "CustomLink",
});

defineProps({
  to: { type: String, required: true },
});
</script>

<template>
  <NuxtLink :href="to" target="_blank">
    <slot></slot> <v-icon small>mdi-open-in-new</v-icon>
  </NuxtLink>
</template>

<style scoped lang="scss">
@import "~/assets/variables.scss";

a {
  background-color: $darkgray;
  color: $white;

  font-size: small;
  text-decoration: none;

  padding: 7px;
  border-radius: 50px;
}
</style>
