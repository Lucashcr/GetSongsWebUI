<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
      <!-- <v-list-item-action> -->
      <v-icon>{{ item.icon }}</v-icon>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
      <!-- </v-list-item-action> -->
      <!-- <v-list-item-content>
      </v-list-item-content> -->
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'MenuList',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.v-list {
  padding: 0;
}
</style>