<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div :class="{ 'q-mt-lg': !storeSettings.settings.showTasksInOneList }">
      <list-header
        v-if="!storeSettings.settings.showTasksInOneList"
        :bgColor="'bg-green-4'"
      >
        <template v-slot:title>Cart</template>
        <template v-slot:button
          ><q-btn
            flat
            round
            dense
            color="green-10"
            icon="shopping_cart"
            @click.stop="promptToDelete()"
        /></template>
      </list-header>

      <q-list separator bordered>
        <task
          v-for="(task, key) in tasksCompleted"
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
import { useQuasar } from "quasar";

const storeSettings = useSettingsStore();

const props = defineProps(["tasksCompleted"]);

const $q = useQuasar();
const promptToDelete = () => {
  $q.dialog({
    title: "Confirm",
    message: "Really delete cart?",
    ok: {
      push: true,
    },
    cancel: {
      color: "negative",
    },
    persistent: true,
  }).onOk(() => {
    console.log("delete cart");
  });
};
</script>
