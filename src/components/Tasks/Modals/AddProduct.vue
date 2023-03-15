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
import ModalHeader from "components/Tasks/Modals/Shared/ModalHeader.vue";
import ModalProductName from "src/components/Tasks/Modals/Shared/ModalProductName.vue";
import ModalProductKeywords from "components/Tasks/Modals/Shared/ModalProductKeywords.vue";
import ModalButtons from "components/Tasks/Modals/Shared/ModalButtons.vue";
import { uid } from "quasar";

const storeCatalog = useCatalogStore();

const productToSubmit = ref({
  name: "",
  keywords: "",
});

const nameProductRef = ref(null);

const submitForm = () => {
  nameProductRef.value.nameRef.validate();
  if (!nameProductRef.value.nameRef.hasError) {
    submitTask();
  }
};

const emit = defineEmits(["close"]);
const submitTask = () => {
  storeCatalog.fbAddTask({ id: uid(), product: productToSubmit.value });
  emit("close");
};

</script>
