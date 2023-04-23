<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="storeSettings.settingsDownloaded">
        <q-scroll-area class="q-scroll-area-products">
          <no-products
            v-if="!Object.keys(storeList.getProductsTodo).length"
            @showAddProduct="
              storeCatalog.addProductsToList(productsFavoritesToList)
            "
            :text="'No items in list!'"
            :buttonText="'Add Favorites'"
            :showButton="showButtonFavorites"
          ></no-products>

          <todo-list
            v-if="Object.keys(storeList.getProductsTodo).length"
            :productsTodo="storeList.getProductsTodo"
          ></todo-list>

          <cart-list
            v-if="Object.keys(storeList.getProductsCompleted).length"
            :productsCompleted="storeList.getProductsCompleted"
            class="q-mb-xl"
          ></cart-list>
        </q-scroll-area>

        <div
          class="absolute-bottom text-right q-mb-lg no-pointer-events q-mr-md"
          v-if="Object.keys(storeList.getProductsTodo).length"
        >
          <q-btn
            @click="storeCatalog.addProductsToList(productsFavoritesToList)"
            :disable="!Object.keys(productsFavoritesToList).length"
            class="all-pointer-events"
            color="primary"
            icon-right="favorite"
            label="Add"
            rounded
            stack
          />
        </div>

        <q-dialog v-model="showUsernamePopup">
          <add-edit-settings :newList="false"></add-edit-settings>
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

<script setup>
import { computed, watch } from "vue";
import NoProducts from "src/components/Products/NoProducts.vue";
import TodoList from "src/components/Products/TodoList.vue";
import CartList from "src/components/Products/CartList.vue";
import AddEditSettings from "src/components/Products/Modals/AddEditSettings.vue";
import { useListStore } from "src/stores/store-list";
import { useSettingsStore } from "src/stores/store-settings";
import { useCatalogStore } from "src/stores/store-catalog";

const storeCatalog = useCatalogStore();
const storeSettings = useSettingsStore();
const storeList = useListStore();

watch(storeSettings.settings, () => {
  if (storeSettings.settings.list !== "") {
    storeList.fbReadData();
    storeCatalog.fbReadData();
  }
});

const productsFavoritesToList = computed(() => {
  return storeCatalog.getProductsFavorites;
});

const showButtonFavorites = computed(() => {
  return Object.keys(productsFavoritesToList.value).length;
});

const showUsernamePopup = computed(() => {
  return (
    storeSettings.settings.username === "" || storeSettings.settings.list === ""
  );
});
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
