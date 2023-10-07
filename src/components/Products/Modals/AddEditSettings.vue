<template>
  <q-card>
    <modal-header :close="false">Update Settings</modal-header>
    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <modal-product-name
          v-if="storeSettings.settings.username === ''"
          :label="'Username'"
          v-model:name="username"
          ref="nameProductRef"
        />

        <div>
          <q-select
            v-if="storeSettings.settings.list === '' && options.length"
            outlined
            v-model="list"
            :options="options"
            label="List Name"
            required
          />

          <modal-product-name
            v-if="
              (storeSettings.settings.list === '' && !options.length) || newList
            "
            :label="'List Name'"
            v-model:name="list"
            ref="listProductRef"
          />
        </div>
      </q-card-section>

      <modal-buttons />
    </form>
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useSettingsStore } from "src/stores/store-settings";
import ModalHeader from "components/Products/Modals/Shared/ModalHeader.vue";
import ModalProductName from "src/components/Products/Modals/Shared/ModalProductName.vue";
import ModalButtons from "components/Products/Modals/Shared/ModalButtons.vue";

const props = defineProps(["newList"]);

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
  if (storeSettings.settings.username === "") {
    nameProductRef.value.nameRef.validate();
    if (!nameProductRef.value.nameRef.hasError) {
      storeSettings.setUsername(username.value);
    }
  }
  if (storeSettings.settings.list === "" || props.newList) {
    storeSettings.setList(list.value);
    emit("close", list.value);
  } else {
    emit("close");
  }
};
</script>
