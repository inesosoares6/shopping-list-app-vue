<template>
  <div class="row">
    <q-input
      outlined
      :modelValue="keywords"
      @update:modelValue="(event) => $emit('update:keywords', event)"
      label="Keywords"
      class="col"
      ref="nameRef"
    >
    </q-input>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:keywords"]);
const props = defineProps(["keywords"]);

const keywordsRef = ref(null);
defineExpose({ keywordsRef });
</script>
