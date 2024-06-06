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
      id: 0,
      name: "",
      owner_id: 0,
    }
  }
});

const dialog = defineModel();

const message = ref<string>("");

const emit = defineEmits(["success", "error", "update:model-value"]);

async function deleteTag() {
  try {
    await $fetchApi.delete(`/tag/${props.tag.id}/`);
  } catch (error) {
    message.value = "Erro ao deletar tag";
    return;
  }
  emit("success");
  emit("update:model-value", false);
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
        Deletar tag
      </v-card-title>
      <v-card-text class="pa-4">
        Tem certeza que deseja deletar a tag <strong>{{ props.tag?.name }}</strong>?
      </v-card-text>
      <p class="text-red pa-4" v-if="message">
        {{ message }}
      </p>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn color="primary" @click="deleteTag()">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>