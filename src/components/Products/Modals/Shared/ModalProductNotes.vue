<template>
  <div class="row">
    <q-input
      outlined
      :modelValue="notes"
      @update:modelValue="(event) => $emit('update:notes', event)"
      label="Notes"
      class="col"
      ref="nameRef"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:notes"]);
const props = defineProps(["notes"]);

const notesRef = ref(null);
defineExpose({ notesRef });
</script>
