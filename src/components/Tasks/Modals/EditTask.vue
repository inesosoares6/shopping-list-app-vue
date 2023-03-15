<template>
  <q-card>
    <modal-header>Edit Task</modal-header>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <modal-task-name
          v-model:name="taskToSubmit.name"
          ref="nameTaskName"
        ></modal-task-name>

        <modal-due-date
          v-model:dueDate="taskToSubmit.dueDate"
          @clear="clearDueDate()"
        ></modal-due-date>

        <modal-due-time
          v-if="taskToSubmit.dueDate"
          v-model:dueTime="taskToSubmit.dueTime"
        ></modal-due-time>
      </q-card-section>

      <modal-buttons></modal-buttons>
    </form>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCatalogStore } from "src/stores/store-catalog";
import ModalHeader from "components/Tasks/Modals/Shared/ModalHeader.vue";
import ModalTaskName from "src/components/Tasks/Modals/Shared/ModalProductName.vue";
import ModalDueDate from "components/Tasks/Modals/Shared/ModalDueDate.vue";
import ModalDueTime from "components/Tasks/Modals/Shared/ModalDueTime.vue";
import ModalButtons from "components/Tasks/Modals/Shared/ModalButtons.vue";

const storeCatalog = useCatalogStore();
const props = defineProps(["task", "id"]);

let taskToSubmit = ref({});

onMounted(() => {
  taskToSubmit.value = Object.assign({}, props.task);
});

const nameTaskName = ref(null);

const submitForm = () => {
  nameTaskName.value.nameRef.validate();
  if (!nameTaskName.value.nameRef.hasError) {
    submitTask();
  }
};

const emit = defineEmits(["close"]);
const submitTask = () => {
  storeCatalog.fbUpdateTask({
    id: props.id,
    updates: taskToSubmit.value,
  });
  emit("close");
};

const clearDueDate = () => {
  taskToSubmit.value.dueDate = "";
  taskToSubmit.value.dueTime = "";
};
</script>
