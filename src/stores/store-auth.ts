import { defineStore } from "pinia";
import { Loading } from "quasar";
import { firebaseAuth } from "../boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { LoginInfo } from "src/models";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { useCatalogStore } from "src/stores/store-catalog";
import { useListStore } from "src/stores/store-list";

export const useAuthStore = defineStore("storeAuth", {
  state: () => {
    return {
      loggedIn: false,
      username: "",
    };
  },
  getters: {},
  actions: {
    setLoggedIn(value: boolean) {
      this.loggedIn = value;
    },
    setUsername(value: string) {
      this.username = value;
    },
    handleAuthStateChange() {
      firebaseAuth.onAuthStateChanged((user) => {
        Loading.hide();
        const storeCatalog = useCatalogStore();
        const storeList = useListStore();
        if (user) {
          this.setLoggedIn(true);
          this.router.push("/");
          storeCatalog.fbReadData();
          storeList.fbReadData();
        } else {
          storeCatalog.clearProducts();
          storeCatalog.setProductsDownloaded(false);
          storeList.clearProducts();
          storeList.setProductsDownloaded(false);
          this.setLoggedIn(false);
          this.router.replace("/auth");
        }
      });
    },
    registerUser(payload: LoginInfo) {
      Loading.show();
      createUserWithEmailAndPassword(
        firebaseAuth,
        payload.email,
        payload.password
      )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.message);
          showErrorMessage(error.message);
        });
    },
    loginUser(payload: LoginInfo) {
      Loading.show();
      signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.message);
          showErrorMessage(error.message);
        });
    },
    logoutUser() {
      signOut(firebaseAuth);
    },
  },
});
