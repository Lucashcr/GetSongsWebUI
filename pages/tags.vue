<script setup lang="ts">
import useGlobalStore from "~/store";
import type Tag from "~/types/tag";

definePageMeta({
  name: "Tags",
  layout: "default",
  requiresAuth: true,
});

const globalStore = useGlobalStore();

const { $fetchApi } = useNuxtApp();

onMounted(() => {
  globalStore.setAppBarTitle("Vamos gerenciar suas tags!");
});

const headers = [
  { title: "Nome", value: "name" },
  { title: "Ações", value: "actions", sortable: false, width: "120px" },
];

const headerProps = { color: "primary", dense: true };

const loading = ref(false);
const search = ref("");
const tags = ref<Tag[]>([]);

async function fetchTags() {
  loading.value = true;
  tags.value = (await $fetchApi.get(`/tag/?mine=true`)) as Tag[];
  loading.value = false;
}

fetchTags();

const createOrEditDialog = ref(false);
const createOrEditTag = ref<Tag | undefined>(undefined);

const confirmDeleteDialog = ref(false);
const confirmDeleteTag = ref<Tag | undefined>(undefined);

function openCreateTagDialog() {
  createOrEditTag.value = undefined;
  createOrEditDialog.value = true;
}

function openEditTagDialog(tag: Tag) {
  createOrEditTag.value = { ...tag };
  createOrEditDialog.value = true;
}

function openDeleteTagDialog(tag: Tag) {
  confirmDeleteTag.value = tag;
  confirmDeleteDialog.value = true;
}
</script>

<template>
  <v-card class="pa-4">
    <v-container>
      <v-row>
        <v-btn color="primary" @click="openCreateTagDialog()">
          Criar tag
        </v-btn>
        <v-spacer />
        <v-text-field
          label="Pesquisar"
          v-model="search"
          append-icon="mdi-magnify"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </v-row>
    </v-container>
    <v-data-table
      :headers="headers"
      :header-props="headerProps"
      :items="tags"
      :search="search"
      :loading="loading"
      item-key="id"
      loading-text="Carregando tags..."
      no-data-text="Nenhuma tag encontrada."
      items-per-page-text="Itens por página:"
      page-text="Itens {0} a {1} | Total: {2}"
    >
      <template v-slot:headers="{ columns }">
        <tr>
          <th v-for="column in columns">
            <strong>{{ column.title }}</strong>
          </th>
        </tr>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                @click="openEditTagDialog(item)"
                color="primary"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar tag: {{ item.name }}</span>
          </v-tooltip>
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                @click="openDeleteTagDialog(item)"
                color="error"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Deletar tag: {{ item.name }}</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
  </v-card>
  <TagsCreateOrEditDialog
    :tag="createOrEditTag"
    v-model="createOrEditDialog"
    @success="fetchTags"
  />
  <TagsConfirmDeleteDialog
    :tag="confirmDeleteTag"
    v-model="confirmDeleteDialog"
    @success="fetchTags"
  />
</template>
