<template>
  <q-card>
    <modal-header :close="false">Add Username</modal-header>
    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">

        <modal-product-name
          :label="'Username'"
          v-model:name="username"
          ref="nameProductRef"
        ></modal-product-name>

      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "src/stores/store-settings";
import ModalHeader from "components/Products/Modals/Shared/ModalHeader.vue";
import ModalProductName from "src/components/Products/Modals/Shared/ModalProductName.vue";
import ModalButtons from "components/Products/Modals/Shared/ModalButtons.vue";

const storeSettings = useSettingsStore();
const nameProductRef = ref(null);
const username = ref("");
const emit = defineEmits(["close"]);

const submitForm = () => {
  nameProductRef.value.nameRef.validate();
  if (!nameProductRef.value.nameRef.hasError) {
    storeSettings.setUsername(username.value);
    emit("close");
  }
};

</script>
