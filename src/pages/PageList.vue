<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="storeSettings.settingsDownloaded">
        <q-scroll-area class="q-scroll-area-products">
          <no-products
            v-if="!Object.keys(storeList.getProductsTodo).length"
            @showAddProduct="showAddProduct = true"
            :text="'No items in list!'"
            :show-button="false"
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

        <q-dialog v-model="showUsernamePopup">
          <add-edit-settings
            :newList="false"
            @close="showUsernamePopup = false"
          ></add-edit-settings>
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
import { ref, computed, watch } from "vue";
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

const showAddProduct = ref(false);

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
