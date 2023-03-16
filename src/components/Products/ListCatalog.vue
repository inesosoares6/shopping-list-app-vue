<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>

      <q-list separator bordered>
        <product-catalog
          v-for="(product, key) in catalogListItems"
          :key="key"
          :product="product"
          :id="key"
        ></product-catalog>
      </q-list>
    </div>
  </transition>
</template>

<script setup>
import ProductCatalog from "components/Products/ProductCatalog.vue";

const props = defineProps(["catalogListItems"]);
</script>
