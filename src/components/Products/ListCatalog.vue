<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <div class="row">
        <q-btn
          class="col q-mb-xs bg-orange-4"
          color="primary"
          icon="arrow_back_ios"
          label="Add to List"
          @click="addProductsToList"
          :disable="!Object.keys(storeCatalog.getProductsSelected).length"
        />
      </div>

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
import { computed } from "vue";
import { uid, date } from "quasar";
import { useCatalogStore } from "src/stores/store-catalog";
import { useListStore } from "src/stores/store-list";
import { useSettingsStore } from "src/stores/store-settings";
import ProductCatalog from "components/Products/ProductCatalog.vue";

const storeSettings = useSettingsStore();
const storeCatalog = useCatalogStore();
const storeList = useListStore();
const props = defineProps(["catalogListItems"]);

const productsToList = computed(() => {
  return storeCatalog.getProductsSelected;
});

const addProductsToList = () => {
  Object.keys(productsToList.value).forEach((key) => {
    let product = productsToList.value[key];
    storeCatalog.fbUpdateProduct({
      id: key,
      updates: {
        selected: false,
        owner:
          "added by " +
          storeSettings.settings.username +
          " @ " +
          date.formatDate(Date.now(), "DD-MM"),
      },
    });
    storeList.fbAddProduct({ id: uid(), product: product });
  });
};
</script>
