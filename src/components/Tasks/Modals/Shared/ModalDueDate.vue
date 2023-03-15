<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      label="Due date"
      :modelValue="dueDate"
      @update:modelValue="(event) => $emit('update:dueDate', event)"
    >
      <template v-slot:append>
        <q-icon
          v-if="dueDate"
          @click="$emit('clear')"
          class="cursor-pointer"
          name="close"
        />
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy">
            <q-date
              :model-value="dueDate"
              @update:modelValue="(event) => updateDueDate(event)"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["update:dueDate", "clear"]);
const props = defineProps(["dueDate"]);

const qDateProxy = ref(null);
const updateDueDate = (event) => {
  emit("update:dueDate", event);
  qDateProxy.value.hide();
};
</script>
