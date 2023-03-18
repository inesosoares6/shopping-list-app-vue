<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import { useSettingsStore } from "src/stores/store-settings";
import { useAuthStore } from "src/stores/store-auth";
import { useIpcRenderer } from "@vueuse/electron";
import { useRouter } from "vue-router";

const router = useRouter();

const storeSettings = useSettingsStore();
const storeAuth = useAuthStore();
const $q = useQuasar();

onMounted(() => {
  if ($q.platform.is.electron) {
    useIpcRenderer().on("show-settings", () => {
      router.push("/settings");
    });
  }

  storeSettings.getSettingsStored();
  storeAuth.handleAuthStateChange();
});


</script>
