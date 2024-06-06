<script setup lang="ts">
import type Tag from "~/types/tag";

const { $fetchApi } = useNuxtApp();

defineComponent({
  name: "CreateOrEditDialog",
});

const props = defineProps({
  tag: {
    type: Object as PropType<Tag>,
    default: {
      name: "",
    }
  }
});

const dialog = defineModel();

const message = ref<string>("");

const emit = defineEmits(["success", "error", "update:model-value"]);

async function createTag() {
  try {
    await $fetchApi.post(`/tag/`, props.tag) as Tag;
  } catch (error) {
    message.value = `Erro ao criar tag`;
    return;
  }
  emit("success");
  emit("update:model-value", false);
}

async function updateTag() {
  try {
    await $fetchApi.put(`/tag/${props.tag.id}/`, props.tag) as Tag;
  } catch (error) {
    message.value = `Erro ao editar tag`;
    return;
  }
  emit("success");
  emit("update:model-value", false);
}

function createOrEditTag() {
  if (props.tag.id) {
    updateTag();
  } else {
    createTag();
  }
}
</script>


<template>
  <v-dialog
    v-model="dialog"
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card class="pa-2">
      <v-card-title>
        {{ props.tag.id ? "Editar" : "Criar" }} tag
      </v-card-title>
      <v-card-text class="pa-4">
        <v-text-field
          v-model="props.tag.name"
          label="Nome"
          outlined
          dense
          required
          :error-messages="message"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn color="primary" @click="createOrEditTag()">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>