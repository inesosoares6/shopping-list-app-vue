<template>
  <q-item
    @click="
      storeCatalog.fbUpdateTask({ id: id, updates: { completed: !task.completed } })
    "
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
    v-touch-hold:1000.mouse="showEditTaskModal"
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed" />
    </q-item-section>
    <q-item-section>
      <q-item-label
        :class="{ 'text-strike': task.completed }"
        v-html="filtered"
      >
      </q-item-label>
    </q-item-section>
    <!-- <q-item-section v-if="task.dueDate" side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">{{
            niceDate
          }}</q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{ taskDueTime }}</small></q-item-label
          >
        </div>
      </div>
    </q-item-section> -->
    <q-item-section side>
      <div class="row">
        <q-btn
          flat
          round
          dense
          color="primary"
          icon="edit"
          @click.stop="showEditTaskModal"
        />
        <q-btn
          flat
          round
          dense
          color="red"
          icon="delete"
          @click.stop="promptToDelete(id)"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task :task="task" :id="id" @close="showEditTask = false" />
    </q-dialog>
  </q-item>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar, date } from "quasar";
import EditTask from "components/Tasks/Modals/EditTask.vue";
import { useCatalogStore } from "src/stores/store-catalog";
import { useSettingsStore } from "src/stores/store-settings";

const storeSettings = useSettingsStore();
const storeCatalog = useCatalogStore();

const props = defineProps(["task", "id"]);

const $q = useQuasar();
const promptToDelete = (id) => {
  $q.dialog({
    title: "Confirm",
    message: "Really delete?",
    ok: {
      push: true,
    },
    cancel: {
      color: "negative",
    },
    persistent: true,
  }).onOk(() => {
    storeCatalog.fbDeleteTask(id);
  });
};

const showEditTask = ref(false);
const showEditTaskModal = () => {
  showEditTask.value = true;
};

const niceDate = computed(() => {
  return date.formatDate(props.task.dueDate, "MMM D");
});

const filtered = computed(() => {
  if (storeCatalog.search) {
    let searchRegExp = new RegExp(storeCatalog.search, "ig");
    return props.task.name.replace(searchRegExp, (match) => {
      return '<span class="bg-yellow-6">' + match + "</span>";
    });
  }
  return props.task.name;
});

const taskDueTime = computed(() => {
  if (storeSettings.settings.show12HourTimeFormat) {
    return date.formatDate(props.task.dueDate + ' ' + props.task.dueTime, 'h:mmA');
  }
  return props.task.dueTime;
});
</script>
