<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header
        v-if="!storeSettings.settings.showProductsInOneList"
        :bgColor="'bg-orange-4'"
        >
        <template v-slot:title>List</template>
      </list-header>

      <q-list separator bordered>
        <product-list
          v-for="(product, key) in productsTodo"
          :key="key"
          :product="product"
          :id="key"
        />
      </q-list>
    </div>
  </transition>
</template>

<script setup>
import ListHeader from "components/Shared/ListHeader.vue";
import ProductList from "src/components/Products/List/ProductList.vue";
import { useSettingsStore } from "src/stores/store-settings";

const storeSettings = useSettingsStore();
const props = defineProps(["productsTodo"]);
</script>
