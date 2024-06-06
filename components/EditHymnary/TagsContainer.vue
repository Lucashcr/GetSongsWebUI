<script setup lang="ts">
import type Tag from '~/types/tag';

defineComponent({
  name: 'TagsContainer',
});

const emit = defineEmits(['update:modelValue']);

const { $fetchApi } = useNuxtApp();
const route = useRoute();

const tagOptions = await $fetchApi.get('/tag/') as Tag[];

const props = defineProps({
  modelValue: {
    type: Array<Tag>,
    required: true,
  }
});

const notUsedTags = computed(() => {
    return tagOptions.filter((tag) => !props.modelValue.some((t) => t.id === tag.id));
});

const usedTags = computed(() => {
  return tagOptions.filter((tag) => props.modelValue.some((t) => t.id === tag.id));
});

let dragTagInfo = {
  action: '' as 'add' | 'remove',
  tagId: 0,
};

function onDragStart(action: 'add' | 'remove', tagId: number) {
  dragTagInfo = { action, tagId };
}

async function onDrop() {
  const response = await $fetchApi.post(`/hymnary/${route.params.hymnaryID}/${dragTagInfo.action}_tag/`, {
    tag: dragTagInfo.tagId,
  });
  emit('update:modelValue', response);
}

const manageTagsDialog = ref(false);
</script>


<template>
<v-expansion-panels class="pa-4">
  <v-expansion-panel>
    <v-expansion-panel-title color="secondary"> Tags </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div class="d-flex align-center ga-4">
        <v-card
          min-height="200px"
          flat
          border
          class="flex-grow-1 pa-2"
          @dragover.prevent
          @drop="onDrop()"
        >
          <v-chip
            v-for="tag in notUsedTags"
            :key="tag.id"
            draggable
            class="ma-1 cursor-grab"
            color="gray"
            @dragstart="onDragStart('add', tag.id)"
          >
            {{ tag.name }}
          </v-chip>
        </v-card>
        <v-icon color="primary">
          mdi-swap-horizontal
        </v-icon>
        <v-card
          min-height="200px"
          flat
          border
          class="flex-grow-1 pa-2"
          @dragover.prevent
          @drop="onDrop()"
        >
          <v-chip
            v-for="tag in usedTags"
            :key="tag.id"
            draggable
            @dragstart="onDragStart('remove', tag.id)"
            class="ma-1 cursor-grab"
            :color="$vuetify.theme.name == 'dark' ? 'accent' : 'primary'"
          >
            {{ tag.name }}
          </v-chip>
        </v-card>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</v-expansion-panels>
</template>