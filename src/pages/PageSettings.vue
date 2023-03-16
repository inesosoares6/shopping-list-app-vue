<template>
  <q-page padding>
    <q-list class="q-mb-md" bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="show12HourTimeFormat" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show products in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="showProductsInOneList" />
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
import { computed } from "vue";
import { openURL } from "quasar";
import { useSettingsStore } from "src/stores/store-settings";
const storeSettings = useSettingsStore();

const show12HourTimeFormat = computed({
  get() {
    return storeSettings.getSettings.show12HourTimeFormat;
  },
  set(value) {
    storeSettings.setShow12HourTimeFormat(value);
  },
});

const showProductsInOneList = computed({
  get() {
    return storeSettings.getSettings.showProductsInOneList;
  },
  set(value) {
    storeSettings.setShowProductsInOneList(value);
  },
});

const visitOurWebsite = () => {
  openURL("http://www.google.com");
};

const emailUs = () => {
  window.location.href =
    "mailto:hello@awsometodo?subject=Awesome Todo Feedback";
};
</script>
