<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="storeList.productsDownloaded">
        <q-scroll-area class="q-scroll-area-products">
          <no-products
            v-if="
              !Object.keys(storeList.getProductsTodo).length &&
              !storeSettings.settings.showProductsInOneList
            "
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
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em" />
        </span>
      </template>
    </div>

    <q-dialog v-model="showUsernamePopup">
      <add-username @close="showUsernamePopup = false"></add-username>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import NoProducts from "src/components/Products/NoProducts.vue";
import TodoList from "src/components/Products/TodoList.vue";
import CartList from "src/components/Products/CartList.vue";
import AddUsername from "src/components/Products/Modals/AddUsername.vue";
import { useAuthStore } from "src/stores/store-auth";
import { useListStore } from "src/stores/store-list";
import { useSettingsStore } from "src/stores/store-settings";

const storeAuth = useAuthStore();
const storeSettings = useSettingsStore();
const storeList = useListStore();

const showAddProduct = ref(false);
const showUsernamePopup = computed(() => {
  return storeAuth.username === "";
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
