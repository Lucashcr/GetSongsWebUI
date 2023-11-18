<script setup>
import useglobalStore from "~/store";

const { $fetchApi, $formatDateTime, $exportHymnary } = useNuxtApp();
const router = useRouter();
const globalStore = useglobalStore();

const hymnaries = ref(await $fetchApi.get("/hymnary"));

definePageMeta({
  name: "HymnaryList",
  layout: "default",
  requiresAuth: true,
});

onMounted(() => {
  globalStore.setAppBarTitle("Aqui estão seus hinários!");
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
  $fetchApi.delete(`/hymnary/${deleteHymnaryObject.value.id}`);
  hymnaries.value = hymnaries.value.filter(
    (h) => h.id !== deleteHymnaryObject.value.id
  );
  deleteHymnaryDialog.value = false;
}
</script>

<template>
  <v-card
    class="ma-2"
    v-if="hymnaries.length"
    v-for="hymnary in hymnaries"
    :key="hymnary.id"
  >
    <v-card-title primary-title>{{ hymnary.title }}</v-card-title>
    <v-card-text>
      <p>Criado em: {{ $formatDateTime(hymnary.created_at) }}</p>
      <p>Atualizado em: {{ $formatDateTime(hymnary.updated_at) }}</p>
      <p>Qtd de músicas: {{ hymnary.songs.length }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="router.push(`/hymnary/${hymnary.id}`)"
        >Editar</v-btn
      >
      <v-btn color="success" @click="$exportHymnary(hymnary)">Baixar</v-btn>
      <v-btn color="error" @click="deleteHymnaryDialogOpen(hymnary)"
        >Excluir</v-btn
      >
    </v-card-actions>
  </v-card>
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
          >Cancelar</v-btn
        >
        <v-btn color="error" @click="deleteHymnary()">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
