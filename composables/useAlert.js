import { ref } from "vue";

const message = ref("");
const type = ref("success"); // success, danger, warning, info
const show = ref(false);

function showAlert(msg, alertType = "success", duration = 3000) {
  message.value = msg;
  type.value = alertType;
  show.value = true;

  // auto hide after duration
  setTimeout(() => {
    show.valuse = false;
  }, duration);
}

export function useAlert() {
  return { message, type, show, showAlert };
}
