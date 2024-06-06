<script setup>
defineComponent({
  name: "ListHymnaryFilters",
});

const { $fetchApi } = useNuxtApp();

const emit = defineEmits(["applyFilter", "goToPage"]);

const search = ref("");
const dateFilter = ref("created_at");
const fromDate = ref(null);
const toDate = ref(null);
const tags = ref([]);
const currentPage = ref(1);

const tagOptions = ref([]);

const props = defineProps({
  pageCount: {
    type: Number,
    required: false,
  },
});

function applyFilter() {
  currentPage.value = 1;
  emit("applyFilter", {
    search: search.value,
    dateFilter: dateFilter.value,
    fromDate: fromDate.value,
    toDate: toDate.value,
    tags: tags.value,
    currentPage: currentPage.value,
  });
}

function applyPagination(page) {
  emit("goToPage", page);
}

onMounted(async () => {
  const tags = await $fetchApi.get("/tag/");
  tagOptions.value = tags.map((tag) => {
    return {
      title: tag.name,
      value: tag.id,
    };
  });
});
</script>

<template>
  <v-card class="mx-2 pa-2">
    <v-card-title primary-title>Filtrar por:</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            label="Título do hinário"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
          />
        </v-col>
        <v-col cols="4">
          <v-autocomplete
            v-model="tags"
            :items="tagOptions"
            label="Tags"
            multiple
            clearable
            chips
            hide-details
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="align-center">
        <v-col>
          <v-radio-group v-model="dateFilter" hide-details>
            <v-radio label="Data de criação" value="created_at"></v-radio>
            <v-radio label="Data de atualização" value="updated_at"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col>
          <DateTimeSelector
            label="A partir de"
            v-model="fromDate"
            :max-value="toDate || new Date()"
          />
        </v-col>
        <v-col>
          <DateTimeSelector
            label="Até"
            v-model="toDate"
            :max-value="new Date()"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-pagination
        rounded
        :length="props.pageCount"
        :total-visible="6"
        v-model="currentPage"
        @update:model-value="applyPagination"
      />
      <v-spacer></v-spacer>
      <v-btn color="accent" @click="applyFilter">Buscar</v-btn>
    </v-card-actions>
  </v-card>
</template>
