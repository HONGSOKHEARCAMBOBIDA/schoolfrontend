<template>
  <div class="excel-container p-3">

    <!-- Form -->
    <form @submit.prevent="onSubmit" class="mb-3">
      <div class="mb-2">
        <input
          type="text"
          v-model="academicItem.year_name"
          class="form-control form-control-sm"
          placeholder="បញ្ចូលឆ្នាំសិក្សា"
          :class="{ 'is-invalid': errors.year_name }"
        />
        <div v-if="errors.year_name" class="invalid-feedback d-block">
          {{ errors.year_name }}
        </div>
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-sm btn-outline-success">
          <i class="bi bi-check-circle"></i>
          {{ editingId ? "កែប្រែ" : "បន្ថែម" }}
        </button>
        <button
          v-if="editingId"
          type="button"
          class="btn btn-sm btn-outline-danger"
          @click="cancelEdit"
        >
          <i class="bi bi-x-circle"></i> ថយក្រោយ
        </button>
      </div>
    </form>

    <!-- Table -->
    <div class="table-container border rounded">
      <table class="table table-sm table-bordered align-middle mb-0">
        <thead>
          <tr >
            <th style="width: 80px;">លេខកូដ</th>
            <th>ឆ្នាំសិក្សា</th>
            <th style="width: 120px;">ស្ថានភាព</th>
            <th style="width: 160px;" class="text-center">សកម្មភាព</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in academicyears" :key="a.id">
            <td>{{ a.id }}</td>
            <td>{{ a.year_name }}</td>
            <td class="text-center">
              <span class="badge" :class="a.is_active ? 'bg-success' : 'bg-danger'">
                {{ a.is_active ? "សកម្ម" : "អសកម្ម" }}
              </span>
            </td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-outline-primary me-1"
                @click="editAcademicYear(a)"
              >
                ✏️
              </button>
              <button
                class="btn btn-sm"
                :class="a.is_active ? 'btn-outline-danger' : 'btn-outline-success'"
                @click="toggleStatus(a.id)"
              >
                {{ a.is_active ? "បិទ" : "បើក" }}
              </button>
            </td>
          </tr>
          <tr v-if="academicyears.length === 0">
            <td colspan="4" class="text-center text-muted py-3">
              មិនមានទិន្នន័យ
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Toast -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="successToast"
        class="toast align-items-center text-bg-success border-0"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">{{ toastMessage }}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AcademicYearController from "~/composables/academic/controller/AcademicYearController";

const academicItem = ref({ id: 0, year_name: "" });
const academicyears = ref([]);
const editingId = ref(null);
const errors = ref({});
const toastMessage = ref("");

const fetchYears = () => {
  AcademicYearController.fetchYears(
    (data) => (academicyears.value = data),
    
  );
};

const onSubmit = () => {
  errors.value = {};
  if (!academicItem.value.year_name.trim()) {
    errors.value.year_name = "សូមបញ្ចូលឆ្នាំសិក្សា";
    return;
  }
  AcademicYearController.save(
    academicItem.value,
    editingId.value,
    resetForm,
    fetchYears,
    
  );
};

const editAcademicYear = (a) => {
  academicItem.value = { ...a };
  editingId.value = a.id;
};

const cancelEdit = () => {
  resetForm();
};

const resetForm = () => {
  academicItem.value = { id: 0, year_name: "" };
  editingId.value = null;
  errors.value = {};
};

const toggleStatus = (id) => {
  AcademicYearController.toggle(id, fetchYears, );
};



onMounted(() => {
  fetchYears();
});
</script>

<style scoped>
.excel-container {
  font-size: 14px;
  margin-top: 50px;
}

.table-container {
  max-height: 600px;
  overflow-y: auto;
}

.table-container thead th {
  position: sticky;
  top: 0;
  background: #e9ecef; /* Excel-like light gray */
  color: #000;
  z-index: 2;
}

.table-bordered td,
.table-bordered th {
  border: 1px solid #dee2e6 !important;
}
</style>
