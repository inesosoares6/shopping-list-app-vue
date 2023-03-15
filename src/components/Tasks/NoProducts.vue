<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      {{ props.text }}
      <template v-slot:action v-if="props.showButton">
        <q-btn
          flat
          color="primary"
          label="Add Product"
          @click="$emit('showAddTask')"
        />
      </template>
    </q-banner>
  </transition>
</template>

<script setup lang="ts">

const props = defineProps(['text', 'showButton'])
</script>
