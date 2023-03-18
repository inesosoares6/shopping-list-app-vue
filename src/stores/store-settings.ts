import { PayloadSettings, PayloadSettingsUpdate, Settings } from './../models';
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

export const useSettingsStore = defineStore("storeSettings", {
  state: () => {
    return {
      settings: {
        // show12HourTimeFormat: false,
        // showProductsInOneList: false,
        username: "",
      },
      settingsDownloaded: false,
    };
  },
  getters: {
    getSettings: (state) => {
      return state.settings;
    },
  },
  actions: {
    updateSetting(payload: PayloadSettingsUpdate) {
      Object.assign(this.settings[payload.id  as keyof Settings], payload.updates);
    },
    addSetting(payload: PayloadSettings) {
      this.settings[payload.id as keyof Settings] = payload.setting;
    },
    // setShow12HourTimeFormat(value: boolean) {
    //   this.settings.show12HourTimeFormat = value;
    //   this.saveSettings();
    // },
    // setShowProductsInOneList(value: boolean) {
    //   this.settings.showProductsInOneList = value;
    //   this.saveSettings();
    // },
    saveSettings() {
      LocalStorage.set("settings", this.settings);
    },
    getSettingsStored() {
      const settings = LocalStorage.getItem("settings");
      if(settings) {
        Object.assign(this.settings, settings);
      }
    },
    setUsername(value: string) {
      const userId = firebaseAuth.currentUser?.uid;
      const userRef = firebaseDb.ref("users/" + userId);
      userRef.set({username: value}, (error) => {
        if (error) showErrorMessage(error.message);
      });
    },
    fbReadData() {
      const userId = firebaseAuth.currentUser?.uid;
      const listSettings = firebaseDb.ref("users/"+ userId);

      // initial check for data
      listSettings.once(
        "value",
        () => {
          this.settingsDownloaded = true;
        },
        (error) => {
          showErrorMessage(error.message);
        }
      );

      // child added
      listSettings.on("child_added", (snapshot) => {
        const setting = snapshot.val();
        this.addSetting({
          id: snapshot.key! as keyof Settings,
          setting: setting,
        });
      });

      //child changed
      listSettings.on("child_changed", (snapshot) => {
        const setting = snapshot.val();
        this.updateSetting({
          id: snapshot.key! as keyof Settings,
          updates: setting,
        });
      });
    },
  },
});
