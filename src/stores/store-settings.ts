import { PayloadSettings, PayloadSettingsUpdate, Settings } from './../models';
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

export const useSettingsStore = defineStore("storeSettings", {
  state: () => {
    return {
      settings: {
        username: "",
        list: "",
      },
      settingsDownloaded: false,
      lists: [] as string[],
    };
  },
  getters: {
    getSettings: (state) => {
      return state.settings;
    },
  },
  actions: {
    updateSetting(payload: PayloadSettingsUpdate) {
      this.settings[payload.id] = payload.updates;

    },
    addSetting(payload: PayloadSettings) {
      this.settings[payload.id] = payload.setting;
    },
    getSettingsStored() {
      const settings = LocalStorage.getItem("settings");
      if(settings) {
        Object.assign(this.settings, settings);
      }
    },
    getLists() {
      const listArray: string[] = [];
      const listSettings = firebaseDb.ref("lists/");
      listSettings.on('value', (snapshot) => {
        const data = snapshot.val();
        Object.keys(data).forEach((key) => {
          listArray.push(key);
        });
        this.lists = listArray;

      });
    },
    setList(value: string) {
      const userId = firebaseAuth.currentUser?.uid;
      const userRef = firebaseDb.ref("users/" + userId);
      userRef.update({list: value}, (error) => {
        if (error) showErrorMessage(error.message);
      });
    },
    setUsername(value: string) {
      const userId = firebaseAuth.currentUser?.uid;
      const userRef = firebaseDb.ref("users/" + userId);
      userRef.update({username: value}, (error) => {
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
