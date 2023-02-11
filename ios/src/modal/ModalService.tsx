import { Keyboard } from "react-native";

class ModalService {
  _modal: any;
  _listener: any;

  constructor() {
    this._modal = null;
  }

  showModal({ action, visible = true }) {
    Keyboard.dismiss();
    this._listener &&
      this._listener({
        action,
        visible,
      });
  }

  dismissModal({ visible = false }) {
    Keyboard.dismiss();
    this._listener &&
      this._listener({
        visible,
      });
  }

  setOnShowModalListener(listener: any) {
    this._listener = listener;
  }
}

export default new ModalService();
