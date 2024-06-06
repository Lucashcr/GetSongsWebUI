<script setup>
import useGlobalStore from "~/store";

const { $fetchApi, $formatDateTime, $exportHymnary } = useNuxtApp();
const router = useRouter();
const globalStore = useGlobalStore();

const hymnaries = ref([]);
const pageCount = ref(1);

const filters = ref({
  search: "",
  tags: [],
  dateFilter: "created_at",
  fromDate: null,
  toDate: null,
  currentPage: 1,
});

definePageMeta({
  name: "HymnaryList",
  layout: "default",
  requiresAuth: true,
});

async function listHymnaries() {
  globalStore.setLoading(true);

  const queryParams = new URLSearchParams({
    dateFilter: filters.value.dateFilter,
    page: filters.value.currentPage,
  });

  if (filters.value.search) {
    queryParams.append("search", filters.value.search);
  }

  if (filters.value.fromDate) {
    queryParams.append("fromDate", filters.value.fromDate.toISOString());
  }

  if (filters.value.toDate) {
    queryParams.append("toDate", filters.value.toDate.toISOString());
  }

  if (filters.value.tags.length) {
    queryParams.append("tags", JSON.stringify(filters.value.tags));
  }

  const response = await $fetchApi.get("/hymnary?".concat(queryParams.toString()));

  hymnaries.value = response.results;
  pageCount.value = Math.ceil(response.count / 20);

  globalStore.setLoading(false);
}

onMounted(() => {
  globalStore.setAppBarTitle("Aqui estão seus hinários!");
  listHymnaries();
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

function applyFilter(filterData) {
  filters.value = filterData;
  listHymnaries();
}

function applyPagination(page) {
  filters.value.currentPage = page;
  listHymnaries();
}
</script>

<template>
  <ListHymnaryFilters
    @apply-filter="applyFilter"
    @go-to-page="applyPagination"
    :pageCount="pageCount"
  />
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
  <v-card v-else class="ma-2 pa-4 text-center">
    <v-card-title>
      Nenhum hinário encontrado
    </v-card-title>
    <v-card-text>
      Ops, parece que você ainda não tem nenhum hinário cadastrado ou não encontramos nenhum resultado com os filtros fornecidos.<br/>Que tal criar um agora? Basta acessar o menu lateral e clicar em "Novo hinário".
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
