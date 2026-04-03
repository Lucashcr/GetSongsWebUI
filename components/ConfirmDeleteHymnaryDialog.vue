<script setup>
import useGlobalStore from "~/store";

defineComponent({
  name: "ConfirmDeleteHymnaryDialog",
});

defineProps({ hymnary: Object });

const emit = defineEmits(["deleted"]);

const globalStore = useGlobalStore();
const { $fetchApi } = useNuxtApp();

const dialog = defineModel();

function close() {
  dialog.value = false;
}

function deleteHymnary(hymnary) {
  globalStore.setLoading(true);
  $fetchApi
    .delete(`/hymnary/${hymnary.id}/`)
    .then(async () => {
      globalStore.setLoading(false);
      emit("deleted", hymnary.id)
    });
  close();
}
</script>

<template>
  <v-no-ssr>
    <v-dialog v-model="dialog" :overlay="true" max-width="500px" transition="dialog-transition">
      <v-card class="pa-4 rounded-xl">
        <v-card-title>Excluir hinário</v-card-title>
        <v-card-text>
          <p>Tem certeza que deseja excluir este hinário?</p>
          <p>{{ hymnary.title }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="close" id="cancel-delete-button">Cancelar</v-btn>
          <v-btn color="error" @click="deleteHymnary(hymnary)" id="confirm-delete-button">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-no-ssr>
</template>