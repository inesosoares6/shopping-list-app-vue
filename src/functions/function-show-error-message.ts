import { Dialog } from 'quasar';
import { Loading } from "quasar";

export function showErrorMessage(errorMessage: string) {
  Loading.hide();
  Dialog.create({
    title: 'Error',
    message: errorMessage
   });
}
