<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="storeSettings.settingsDownloaded">
        <div class="row q-mb-lg">
          <search />
          <sort />
        </div>

        <p
          v-if="
            storeCatalog.search && !Object.keys(storeCatalog.getProducts).length
          "
        >
          No search results.
        </p>

        <div class="row" v-if="Object.keys(storeCatalog.getProducts).length">
          <q-btn
            class="col q-mb-xs bg-orange-4"
            color="primary"
            icon="keyboard_double_arrow_left"
            label="Add to List"
            @click="addProductsToList(productsSelectedToList)"
            :disable="!Object.keys(productsSelectedToList).length"
          />
        </div>

        <q-scroll-area class="q-scroll-area-products">
          <no-products
            v-if="
              !Object.keys(storeCatalog.getProducts).length &&
              !storeCatalog.search
            "
            @showAddProduct="showAddProduct = true"
            :text="'Catalog is empty!'"
            :buttonText="'Add Product'"
            :showButton="true"
          />

          <list-catalog
            v-if="Object.keys(storeCatalog.getProducts).length"
            :catalogListItems="storeCatalog.getProducts"
          />
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="showAddProduct = true"
            class="all-pointer-events"
            round
            color="primary"
            size="17px"
            icon="add"
          />
        </div>

        <q-dialog v-model="showAddProduct">
          <add-product @close="showAddProduct = false" />
        </q-dialog>

        <q-dialog v-model="showUsernamePopup">
          <add-edit-settings :newList="false" />
        </q-dialog>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em" />
        </span>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import NoProducts from "src/components/Products/NoProducts.vue";
import ListCatalog from "src/components/Products/Catalog/ListCatalog.vue";
import AddProduct from "src/components/Products/Modals/AddProduct.vue";
import Search from "src/components/Products/Tools/Search.vue";
import Sort from "src/components/Products/Tools/Sort.vue";
import AddEditSettings from "src/components/Products/Modals/AddEditSettings.vue";
import { useCatalogStore } from "src/stores/store-catalog";
import { useSettingsStore } from "src/stores/store-settings";
import { ProductObject } from "src/models";

const storeSettings = useSettingsStore();
const storeCatalog = useCatalogStore();
const showAddProduct = ref(false);
const showUsernamePopup = computed(() => {
  return (
    storeSettings.settings.username === "" || storeSettings.settings.list === ""
  );
});

const productsSelectedToList = computed(() => {
  return storeCatalog.getProductsSelected;
});

const addProductsToList = (productsToList: ProductObject) => {
  storeCatalog.addProductsToList(productsToList);
};
</script>

<style scoped lang="scss">
.q-scroll-area-products {
  display: flex;
  flex-grow: 1;
  .scroll {
    height: auto !important;
  }
}
</style>
