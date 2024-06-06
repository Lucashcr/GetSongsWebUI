<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  }
});

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>


<template>
  <v-dialog
    v-model="dialog"
    :overlay="true"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card>
      <v-card-title>
        Gerenciar tags
      </v-card-title>
      <v-card-text>
        <v-data-table
          headers="headers"
          items="items"
          hide-actions
          class="elevation-1"
          select-all
          pagination.sync="pagination"
          item-key="id"
          loading="true"
          search="search"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Tags</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              @click="removeTag(item)"
              class="mr-2"
              color="error"
              >mdi-close</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>