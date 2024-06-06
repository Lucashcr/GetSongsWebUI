<script setup>
defineComponent({
  name: "DateTimeSelector",
});

const { $formatDate } = useNuxtApp();

const menu = ref(false);

const props = defineProps({
  modelValue: {
    type: Date,
    required: false,
  },
  maxValue: {
    type: Date,
    required: false,
  },
  label: {
    type: String,
    default: "Data",
  },
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const formattedDate = computed(() => {
  return props.modelValue ? $formatDate(props.modelValue) : "";
});
</script>

<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        :model-value="formattedDate"
        :label="label"
        v-bind="props"
        prepend-inner-icon="mdi-calendar"
        readonly
        hide-details
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="computedValue"
      color="primary"
      no-title
      :max="props.maxValue"
    ></v-date-picker>
  </v-menu>
</template>
