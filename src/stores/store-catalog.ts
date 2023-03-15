import { showErrorMessage } from "src/functions/function-show-error-message";
import { defineStore } from "pinia";
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
import { Payload, PayloadUpdate, ProductObject, Product } from "src/models";
import { Notify } from "quasar";

export const useCatalogStore = defineStore("storeCatalog", {
  state: () => {
    return {
      tasks: {} as ProductObject,
      search: "",
      sort: "name" as keyof Product,
      tasksDownloaded: false,
    };
  },
  getters: {
    getTasksSorted: (state) => {
      let tasksSorted = {} as ProductObject,
        keysOrdered = Object.keys(state.tasks);

      keysOrdered.sort((a, b) => {
        let taskAProp = (state.tasks[a][state.sort] as string).toLowerCase(),
          taskBProp = (state.tasks[b][state.sort] as string).toLowerCase();
        if (taskAProp > taskBProp) return 1;
        else if (taskAProp < taskBProp) return -1;
        else return 0;
      });

      keysOrdered.forEach((key) => {
        tasksSorted[key] = state.tasks[key];
      });

      return tasksSorted;
    },
    getTasksFiltered(state): ProductObject {
      let tasksSorted = this.getTasksSorted;
      let tasksFiltered = {} as ProductObject;
      if (state.search) {
        Object.keys(tasksSorted).forEach((key) => {
          let task = tasksSorted[key],
            taskNameLowerCase = task.name.toLowerCase(),
            searchLowerCase = state.search.toLocaleLowerCase();
          if (taskNameLowerCase.includes(searchLowerCase)) {
            tasksFiltered[key] = task;
          }
        });
        return tasksFiltered;
      }
      return tasksSorted;
    },
    getTasksTodo(): ProductObject {
      let tasksFiltered = this.getTasksFiltered;
      let tasks = {} as ProductObject;
      Object.keys(tasksFiltered).forEach((key) => {
        let task = tasksFiltered[key];
        if (!task.completed) {
          tasks[key] = task;
        }
      });

      return tasks;
    },
    getTasksCompleted(): ProductObject {
      let tasksFiltered = this.getTasksFiltered;
      let tasks = {} as ProductObject;
      Object.keys(tasksFiltered).forEach((key) => {
        let task = tasksFiltered[key];
        if (task.completed) {
          tasks[key] = task;
        }
      });
      return tasks;
    },
  },
  actions: {
    updateTask(payload: PayloadUpdate) {
      Object.assign(this.tasks[payload.id], payload.updates);
    },
    deleteTask(id: string) {
      delete this.tasks[id];
    },
    addTask(payload: Payload) {
      this.tasks[payload.id] = payload.product;
    },
    clearTasks() {
      this.tasks = {};
    },
    setSearch(value: string) {
      this.search = value;
    },
    setSort(value: keyof Product) {
      this.sort = value;
    },
    setTasksDownloaded(value: boolean) {
      this.tasksDownloaded = value;
    },
    fbReadData() {
      // const userId = firebaseAuth.currentUser?.uid;
      const userTasks = firebaseDb.ref("lists/list1/catalog/");

      // initial check for data
      userTasks.once(
        "value",
        () => {
          this.tasksDownloaded = true;
        },
        (error) => {
          showErrorMessage(error.message);
        }
      );

      // child added
      userTasks.on("child_added", (snapshot) => {
        const product = snapshot.val();
        this.addTask({
          id: snapshot.key!,
          product: product,
        });
      });

      //child changed
      userTasks.on("child_changed", (snapshot) => {
        const product = snapshot.val();
        this.updateTask({
          id: snapshot.key!,
          updates: product,
        });
      });

      //child removed
      userTasks.on("child_removed", (snapshot) => {
        this.deleteTask(snapshot.key!);
      });
    },
    fbAddTask(payload: Payload) {
      console.log(payload);
      const productRef = firebaseDb.ref("lists/list1/catalog/" + payload.id);
      productRef.set(payload.product, (error) => {
        if (error) showErrorMessage(error.message);
        else Notify.create("Product added!");
      });
    },
    fbUpdateTask(payload: PayloadUpdate) {
      const userId = firebaseAuth.currentUser?.uid;
      const taskRef = firebaseDb.ref("tasks/" + userId + "/" + payload.id);
      taskRef.update(payload.updates, (error) => {
        if (error) showErrorMessage(error.message);
        else {
          const keys = Object.keys(payload.updates);
          if (!(keys.includes('completed') && keys.length == 1)) {
            Notify.create("Task updated!");
          }
        }
      });
    },
    fbDeleteTask(taskId: string) {
      const userId = firebaseAuth.currentUser?.uid;
      const taskRef = firebaseDb.ref("tasks/" + userId + "/" + taskId);
      taskRef.remove((error) => {
        if (error) showErrorMessage(error.message);
        else Notify.create("Task deleted!");
      });
    },
  },
});
