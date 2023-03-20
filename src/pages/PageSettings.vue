<template>
  <q-page padding>
    <q-list class="q-mb-md" bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Add/Select List</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="row">
            <q-btn
              flat
              round
              color="primary"
              icon="add"
              @click="showAddNewList = true"
            />
            <div style="min-width: 200px">
              <q-select outlined v-model="model" :options="options" />
            </div>
          </div>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Change Username</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div style="min-width: 200px">
            <q-input
              outlined
              v-model="username"
              :rules="[(val) => !!val || 'Field is required']"
              class="col"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list class="q-mb-md" bordered padding>
      <q-item-label header>Account</q-item-label>

      <q-item tag="label" v-ripple @click="changePassword">
        <q-item-section>
          <q-item-label>Change password</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"></q-icon>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
        @click="showDialog('Are you sure you want to delete your account?')"
      >
        <q-item-section>
          <q-item-label>Delete account</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="showAddNewList">
      <add-edit-settings
        :newList="true"
        @close="updateList"
      ></add-edit-settings>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import AddEditSettings from "src/components/Products/Modals/AddEditSettings.vue";
import { useCatalogStore } from "src/stores/store-catalog";
import { useListStore } from "src/stores/store-list";
import { useSettingsStore } from "src/stores/store-settings";
import { useAuthStore } from "src/stores/store-auth";
import { useQuasar } from "quasar";
const storeSettings = useSettingsStore();
const storeCatalog = useCatalogStore();
const storeList = useListStore();
const storeAuth = useAuthStore();

onMounted(() => {
  storeSettings.getLists();
});

const options = computed(() => {
  return storeSettings.lists;
});

const model = ref(storeSettings.getSettings.list);
const username = ref(storeSettings.getSettings.username);

watch(model, (newValue) => {
  storeCatalog.clearProducts();
  storeCatalog.setProductsDownloaded(false);
  storeList.clearProducts();
  storeList.setProductsDownloaded(false);
  storeSettings.setList(newValue);
  storeList.fbReadData();
  storeCatalog.fbReadData();
});

watch(username, (newValue) => {
  storeSettings.setUsername(newValue);
});

const showAddNewList = ref(false);
const updateList = (value: string) => {
  model.value = value;
  showAddNewList.value = false;
};

const changePassword = () => {
  console.log("change password");
};

const $q = useQuasar();
const showDialog = (message: string) => {
  $q.dialog({
    title: "Confirm",
    message: message,
    ok: {
      push: true,
    },
    cancel: {
      color: "negative",
    },
    persistent: true,
  }).onOk(() => {
    storeAuth.deleteAccount();
  });
};
</script>
