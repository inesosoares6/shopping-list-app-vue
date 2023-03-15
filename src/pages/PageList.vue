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
            :text="'No items in list!'"
            :show-button="false"
          ></no-tasks>

          <task-todo
            v-if="Object.keys(storeCatalog.getTasksTodo).length"
            :tasksTodo="storeCatalog.getTasksTodo"
          ></task-todo>

          <task-completed
            v-if="Object.keys(storeCatalog.getTasksCompleted).length"
            :tasksCompleted="storeCatalog.getTasksCompleted"
            class="q-mb-xl"
          ></task-completed>
        </q-scroll-area>
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
import TaskTodo from "src/components/Tasks/TodoList.vue";
import TaskCompleted from "src/components/Tasks/CartList.vue";
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
