<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :modelValue="name"
      @update:modelValue="(event) => $emit('update:name', event)"
      :rules="[(val) => !!val || 'Field is required']"
      label="Product name"
      class="col"
      autofocus
      v-select-all
      ref="nameRef"
    >
      <template v-slot:append>
        <q-icon
          v-if="name"
          @click="emit('update:name', '')"
          class="cursor-pointer"
          name="close"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vSelectAll } from "src/directives/vSelectAll";

const emit = defineEmits(["update:name"]);
const props = defineProps(["name"]);

const nameRef = ref(null);
defineExpose({ nameRef });
</script>
