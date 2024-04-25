<script setup>
import useGlobalStore from "~/store";

const { $fetchApi, $formatDateTime, $exportHymnary } = useNuxtApp();
const router = useRouter();
const globalStore = useGlobalStore();

const hymnaries = ref([]);

definePageMeta({
  name: "HymnaryList",
  layout: "default",
  requiresAuth: true,
});

onMounted(async () => {
  globalStore.setLoading(true);
  globalStore.setAppBarTitle("Aqui estão seus hinários!");
  hymnaries.value = await $fetchApi.get("/hymnary");
  globalStore.setLoading(false);
});

const deleteHymnaryDialog = ref(false);
const deleteHymnaryObject = ref(null);
function deleteHymnaryDialogOpen(hymnary) {
  deleteHymnaryDialog.value = true;
  deleteHymnaryObject.value = hymnary;
}

function deleteHymnaryDialogClose() {
  deleteHymnaryDialog.value = false;
}

function deleteHymnary() {
  globalStore.setLoading(true);
  $fetchApi
    .delete(`/hymnary/${deleteHymnaryObject.value.id}`)
    .then(async () => {
      hymnaries.value = await $fetchApi.get("/hymnary");
      globalStore.setLoading(false);
    });
  deleteHymnaryDialogClose();
}
</script>

<template>
  <template v-if="globalStore.isLoading">
    <Loading class="ma-2" />
    <Loading class="ma-2" />
  </template>
  <template v-else-if="hymnaries.length">
    <v-card class="ma-2" v-for="hymnary in hymnaries" :key="hymnary.id">
      <v-card-title primary-title>{{ hymnary.title }}</v-card-title>
      <v-card-text>
        <p>Criado em: {{ $formatDateTime(hymnary.created_at) }}</p>
        <p>Atualizado em: {{ $formatDateTime(hymnary.updated_at) }}</p>
        <p>Qtd de músicas: {{ hymnary.songs.length }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="accent"
          @click="router.push(`/hymnary/${hymnary.id}`)"
          :id="`hymnary-${hymnary.id}-edit-button`"
        >
          Editar
        </v-btn>
        <v-btn
          color="accent"
          @click="$exportHymnary(hymnary)"
          :id="`hymnary-${hymnary.id}-export-button`"
        >
          Baixar
        </v-btn>
        <v-btn
          color="error"
          @click="deleteHymnaryDialogOpen(hymnary)"
          :id="`hymnary-${hymnary.id}-delete-button`"
        >
          Excluir
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  <v-card v-else class="pa-4">
    <v-card-title primary-title>
      Ops, parece que você ainda não tem nenhum hinário cadastrado.
    </v-card-title>
    <v-card-text>
      Que tal criar um agora? Basta acessar o menu lateral e clicar em "Novo
      hinário".
    </v-card-text>
  </v-card>

  <v-dialog
    v-model="deleteHymnaryDialog"
    :overlay="true"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card class="pa-4 rounded-xl">
      <v-card-title>Excluir hinário</v-card-title>
      <v-card-text>
        <p>Tem certeza que deseja excluir este hinário?</p>
        <p>{{ deleteHymnaryObject.title }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="deleteHymnaryDialogClose()"
          id="cancel-delete-button"
          >Cancelar</v-btn
        >
        <v-btn color="error" @click="deleteHymnary()" id="confirm-delete-button">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
