<template>
  <q-card>
    <modal-header :close="false">Add Initial Settings</modal-header>
    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <modal-product-name
          v-if="storeSettings.settings.username === ''"
          :label="'Username'"
          v-model:name="username"
          ref="nameProductRef"
        ></modal-product-name>

        <div v-if="storeSettings.settings.list === ''">
          <q-select
            v-if="options"
            outlined
            v-model="list"
            :options="options"
            label="List Name"
          />

          <modal-product-name
            v-if="!options"
            :label="'List Name'"
            v-model:name="listName"
            ref="listProductRef"
          ></modal-product-name>
        </div>
      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useSettingsStore } from "src/stores/store-settings";
import ModalHeader from "components/Products/Modals/Shared/ModalHeader.vue";
import ModalProductName from "src/components/Products/Modals/Shared/ModalProductName.vue";
import ModalButtons from "components/Products/Modals/Shared/ModalButtons.vue";

const storeSettings = useSettingsStore();
const nameProductRef = ref(null);
const username = ref("");
const list = ref("");

onMounted(() => {
  storeSettings.getLists();
});

const options = computed(() => {
  return storeSettings.lists;
});

const emit = defineEmits(["close"]);
const submitForm = () => {
  nameProductRef.value.nameRef.validate();
  if (!nameProductRef.value.nameRef.hasError) {
    storeSettings.setUsername(username.value);
    storeSettings.setList(list.value);
    emit("close");
  }
};
</script>
