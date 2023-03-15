<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      label="Due time"
      :modelValue="dueTime"
      @update:modelValue="(event) => $emit('update:dueTime', event)"
      class="col"
    >
      <template v-slot:append>
        <q-icon
          v-if="dueTime"
          @click="$emit('update:dueTime', '')"
          class="cursor-pointer"
          name="close"
        />
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time
              :model-value="dueTime"
              @update:modelValue="(event) => $emit('update:dueTime', event)"
            >
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:dueTime"]);
const props = defineProps(['dueTime']);
</script>
