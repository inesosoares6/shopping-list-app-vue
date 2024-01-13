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
        <template v-slot:button>
          <q-btn
            flat
            round
            color="orange-9"
            icon="content_copy"
            :disable="!Object.keys(props.productsTodo)"
            @click.stop="shareList()"
          />
        </template>
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
// import { Share } from "@capacitor/share";
import { Notify } from "quasar";
import { copyToClipboard } from "quasar";

const storeSettings = useSettingsStore();
const props = defineProps(["productsTodo"]);

const createList = () => {
  let messageText = `Shopping List - ${new Date().toLocaleDateString()}`;
  for (const product of Object.values(props.productsTodo)) {
    messageText =
      `${messageText} \n - ${product.name}` +
      (product.notes ? ` (${product.notes})` : "");
  }
  return messageText;
};

const shareList = () => {
  // Share.share({
  //   title: "Shopping List",
  //   text: createList(),
  // });
  copyToClipboard(createList())
    .then(() => {
      Notify.create("List copied to clipboard.");
    })
    .catch(() => {
      Notify.create("Failed to copy list.");
    });
};
</script>
