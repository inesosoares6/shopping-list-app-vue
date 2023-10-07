<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div :class="{ 'q-mt-lg': !storeSettings.settings.showProductsInOneList }">
      <list-header
        v-if="!storeSettings.settings.showProductsInOneList"
        :bgColor="'bg-green-4'"
      >
        <template v-slot:title>Cart</template>
        <template v-slot:button>
          <q-btn
            flat
            round
            dense
            color="green-10"
            icon="shopping_cart"
            @click.stop="promptToDelete()"
          />
      </template>
      </list-header>

      <q-list separator bordered>
        <product-list
          v-for="(product, key) in productsCompleted"
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
import { useListStore } from "src/stores/store-list";
import { useQuasar } from "quasar";

const storeSettings = useSettingsStore();
const storeList = useListStore();

const props = defineProps(["productsCompleted"]);

const $q = useQuasar();
const promptToDelete = () => {
  $q.dialog({
    title: "Confirm",
    message: "Really empty cart?",
    ok: {
      push: true,
    },
    cancel: {
      color: "negative",
    },
    persistent: true,
  }).onOk(() => {
    Object.keys(props.productsCompleted).forEach((key) => {
      storeList.fbDeleteProduct(key, true);
    });
  });
};
</script>
