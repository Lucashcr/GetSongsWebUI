<script setup>
defineComponent({
  name: "MessageDialog",
});

defineProps(
  {
    title: String,
    messages: Array,
  },
  {
    default: () => ({
      title: "",
      messages: [],
    }),
  }
);

const dialog = defineModel();
</script>

<template>
  <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
    <v-card class="pa-4 rounded-xl">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text v-for="(message, index) in messages" :key="index">
        <p>{{ message }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text="true" @click="dialog = false">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
