<template>
  <q-card>
    <modal-header :close="true">Edit Product</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <modal-product-name
          :label="'Product Name'"
          v-model:name="productToSubmit.name"
          ref="nameProductRef"
        ></modal-product-name>

        <modal-product-notes
          v-if="list"
          v-model:notes="productToSubmit.notes"
          ref="notesProductRef"
        ></modal-product-notes>

        <modal-product-keywords
          v-if="!list"
          v-model:keywords="productToSubmit.keywords"
          ref="keywordsProductRef"
        ></modal-product-keywords>
      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { date } from "quasar";
import { useCatalogStore } from "src/stores/store-catalog";
import { useListStore } from "src/stores/store-list";
import { useAuthStore } from "src/stores/store-auth";
import ModalHeader from "components/Products/Modals/Shared/ModalHeader.vue";
import ModalProductName from "src/components/Products/Modals/Shared/ModalProductName.vue";
import ModalProductKeywords from "components/Products/Modals/Shared/ModalProductKeywords.vue";
import ModalProductNotes from "components/Products/Modals/Shared/ModalProductNotes.vue";
import ModalButtons from "components/Products/Modals/Shared/ModalButtons.vue";

const storeAuth = useAuthStore();
const storeCatalog = useCatalogStore();
const storeList = useListStore();
const props = defineProps(["product", "id", "list"]);

let productToSubmit = ref({});

onMounted(() => {
  productToSubmit.value = Object.assign({}, props.product);
});

const nameProductRef = ref(null);

const submitForm = () => {
  nameProductRef.value.nameRef.validate();
  if (!nameProductRef.value.nameRef.hasError) {
    submitProduct();
  }
};

const emit = defineEmits(["close"]);
const submitProduct = () => {
  if (props.list) {
    productToSubmit.value.owner =
      "edited by "+ storeAuth.username + " @ " + date.formatDate(Date.now(), "DD-MM");
    storeList.fbUpdateProduct({
      id: props.id,
      updates: productToSubmit.value,
    });
  } else {
    storeCatalog.fbUpdateProduct({
      id: props.id,
      updates: productToSubmit.value,
    });
  }
  emit("close");
};
</script>
