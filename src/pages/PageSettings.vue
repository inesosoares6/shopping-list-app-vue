<template>
  <q-page padding>
    <q-list class="q-mb-md" bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Add/Select list</q-item-label>
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
          <q-item-label>Change username</q-item-label>
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

      <q-item
        tag="label"
        v-ripple
        @click="
          showDialog({
            action: 'change_email',
            message: 'Write the new email address',
          })
        "
      >
        <q-item-section>
          <q-item-label>Change email</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right"></q-icon>
        </q-item-section>
      </q-item>

      <q-item
        tag="label"
        v-ripple
        @click="
          showDialog({
            action: 'change_password',
            message: 'Write the new password',
          })
        "
      >
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
        @click="
          showDialog({
            action: 'delete_account',
            message: 'Are you sure you want to delete your account?',
          })
        "
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

const $q = useQuasar();
const showDialog = (payload: { action: string; message: string }) => {
  switch (payload.action) {
    case "change_email":
      $q.dialog({
        title: "Update email",
        message: payload.message,
        prompt: {
          model: "",
          type: "text",
        },
        ok: {
          push: true,
        },
        cancel: {
          color: "negative",
        },
        persistent: true,
      }).onOk((data) => {
        storeAuth.emailUpdate(data);
      });
      break;
    case "change_password":
      $q.dialog({
        title: "Update password",
        message: payload.message,
        prompt: {
          model: "",
          type: "password",
        },
        ok: {
          push: true,
        },
        cancel: {
          color: "negative",
        },
        persistent: true,
      }).onOk((data) => {
        storeAuth.passwordUpdate(data);
      });
      break;
    case "delete_account":
      $q.dialog({
        title: "Delete account",
        message: payload.message,
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
      break;
  }
};
</script>
