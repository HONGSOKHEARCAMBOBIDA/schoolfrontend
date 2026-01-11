<template>
  <div
    v-if="show"
    class="position-fixed top-0 end-0 p-3"
    style="z-index: 2000"
  >
    <div
      class="toast align-items-center text-white border-0 show"
      :class="toastClass"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          @click="show = false"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAlert } from "~/composables/useAlert";

const { message, type, show } = useAlert();

const toastClass = computed(() => {
  switch (type.value) {
    case "success":
      return "bg-success";
    case "danger":
      return "bg-danger";
    case "warning":
      return "bg-warning text-dark";
    case "info":
      return "bg-info text-dark";
    default:
      return "bg-primary";
  }
});
</script>
