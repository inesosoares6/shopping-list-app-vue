<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="storeCatalog.tasksDownloaded">
        <div class="row q-mb-lg">
          <search></search>
          <sort></sort>
        </div>

        <p
          v-if="
            storeCatalog.search &&
            !Object.keys(storeCatalog.getTasksTodo).length &&
            !Object.keys(storeCatalog.getTasksCompleted).length
          "
        >
          No search results.
        </p>

        <q-scroll-area class="q-scroll-area-tasks">
          <no-tasks
            v-if="
              !Object.keys(storeCatalog.getTasksTodo).length &&
              !storeCatalog.search &&
              !storeSettings.settings.showTasksInOneList
            "
            @showAddTask="showAddTask = true"
            :text="'Catalog is empty!'"
            :showButton="true"
          ></no-tasks>

          <list-catalog
            v-if="Object.keys(storeCatalog.getTasksTodo).length"
            :tasksTodo="storeCatalog.getTasksTodo"
          ></list-catalog>
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="showAddTask = true"
            class="all-pointer-events"
            round
            color="primary"
            size="24px"
            icon="add"
          />
        </div>

        <q-dialog v-model="showAddTask">
          <add-task @close="showAddTask = false"></add-task>
        </q-dialog>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em" />
        </span>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NoTasks from "src/components/Tasks/NoProducts.vue";
import ListCatalog from "components/Tasks/ListCatalog.vue";
import AddTask from "src/components/Tasks/Modals/AddProduct.vue";
import Search from "components/Tasks/Tools/Search.vue";
import Sort from "components/Tasks/Tools/Sort.vue";
import { useCatalogStore } from "src/stores/store-catalog";
import { useSettingsStore } from "src/stores/store-settings";

const storeSettings = useSettingsStore();
const storeCatalog = useCatalogStore();

const showAddTask = ref(false);
</script>

<style scoped lang="scss">
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
  .scroll {
    height: auto !important;
  }
}
</style>
