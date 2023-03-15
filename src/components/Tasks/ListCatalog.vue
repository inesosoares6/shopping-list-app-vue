<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>

      <q-list separator bordered>
        <product-catalog
          v-for="(task, key) in tasksTodo"
          :key="key"
          :task="task"
          :id="key"
        ></product-catalog>
      </q-list>
    </div>
  </transition>
</template>

<script setup>
import ProductCatalog from "components/Tasks/ProductCatalog.vue";

const props = defineProps(["tasksTodo"]);
</script>
