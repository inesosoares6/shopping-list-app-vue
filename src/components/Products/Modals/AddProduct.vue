<template>
  <q-card>
    <modal-header>Add Product</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <modal-product-name
          v-model:name="productToSubmit.name"
          ref="nameProductRef"
        ></modal-product-name>

        <modal-product-keywords
          v-model:keywords="productToSubmit.keywords"
          ref="keywordsProductRef"></modal-product-keywords>

      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useCatalogStore } from "src/stores/store-catalog";
import ModalHeader from "components/Products/Modals/Shared/ModalHeader.vue";
import ModalProductName from "src/components/Products/Modals/Shared/ModalProductName.vue";
import ModalProductKeywords from "components/Products/Modals/Shared/ModalProductKeywords.vue";
import ModalButtons from "components/Products/Modals/Shared/ModalButtons.vue";
import { uid } from "quasar";

const storeCatalog = useCatalogStore();

const productToSubmit = ref({
  name: "",
  keywords: "",
  selected: false,
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
  storeCatalog.fbAddProduct({ id: uid(), product: productToSubmit.value });
  emit("close");
};

</script>
