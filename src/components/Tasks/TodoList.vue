<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header
        v-if="!storeSettings.settings.showTasksInOneList"
        :bgColor="'bg-orange-4'"
        ><template v-slot:title>List</template></list-header
      >

      <q-list separator bordered>
        <task
          v-for="(task, key) in tasksTodo"
          :key="key"
          :task="task"
          :id="key"
        ></task>
      </q-list>
    </div>
  </transition>
</template>

<script setup>
import ListHeader from "components/Shared/ListHeader.vue";
import Task from "components/Tasks/Task.vue";
import { useSettingsStore } from "src/stores/store-settings";

const storeSettings = useSettingsStore();

const props = defineProps(["tasksTodo"]);
</script>
