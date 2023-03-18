<template>
  <q-page padding>
    <q-list class="q-mb-md" bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Select List</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-select
            outlined
            v-model="model"
            :options="options"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered padding>
      <q-item-label header>More</q-item-label>

      <q-item tag="label" v-ripple to="/settings/help">
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple @click="visitOurWebsite">
        <q-item-section>
          <q-item-label>Visit our website</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple @click="emailUs">
        <q-item-section>
          <q-item-label>Email us</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { openURL } from "quasar";
import { useCatalogStore } from "src/stores/store-catalog";
import { useListStore } from "src/stores/store-list";
import { useSettingsStore } from "src/stores/store-settings";
const storeSettings = useSettingsStore();
const storeCatalog = useCatalogStore();
const storeList = useListStore();

onMounted(() => {
  storeSettings.getLists();
});

const options = computed(() => {
  return storeSettings.lists;
});

const model = ref(storeSettings.getSettings.list);

watch(model, (newValue, oldValue) => {
  storeSettings.setList(newValue);
});

const visitOurWebsite = () => {
  openURL("http://www.google.com");
};

const emailUs = () => {
  window.location.href =
    "mailto:hello@awsometodo?subject=Awesome Todo Feedback";
};
</script>
