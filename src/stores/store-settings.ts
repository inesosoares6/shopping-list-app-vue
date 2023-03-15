import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useSettingsStore = defineStore("storeSettings", {
  state: () => {
    return {
      settings: {
        show12HourTimeFormat: false,
        showTasksInOneList: false,
      },
    };
  },
  getters: {
    getSettings: (state) => {
      return state.settings;
    },
  },
  actions: {
    setShow12HourTimeFormat(value: boolean) {
      this.settings.show12HourTimeFormat = value;
      this.saveSettings();
    },
    setShowTasksInOneList(value: boolean) {
      this.settings.showTasksInOneList = value;
      this.saveSettings();
    },
    saveSettings() {
      LocalStorage.set("settings", this.settings);
    },
    getSettingsStored() {
      const settings = LocalStorage.getItem("settings");
      if(settings) {
        Object.assign(this.settings, settings);
      }
    },
  },
});
