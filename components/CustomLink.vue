<template>
  <a :href="to" target="_blank">
    <slot></slot> <v-icon small>mdi-open-in-new</v-icon>
  </a>
</template>

<style scoped lang="scss">
@import '~/assets/variables.scss';

a {
  background-color: $darkgray;
  color: $white;

  font-size: small;
  text-decoration: none;

  padding: 7px;
  border-radius: 50px;
}
</style>

<script>
export default {
  name: 'CustomLink',
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>