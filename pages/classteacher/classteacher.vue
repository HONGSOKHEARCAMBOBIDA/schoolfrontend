<template>
  <div class="pt-5">
      <div class="p-4 min-vh-100 bg-light">
    <!-- Header & Search -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="fw-bold">គ្រូបង្រៀនទាំងអស់</h3>
<input
  v-model="searchQuery"
  @input="filterTeachers"
  type="text"
  class="form-control w-50 shadow-sm px-3 flat-input"
  placeholder="🔍 ស្វែងរកដោយឈ្មោះ..."
/>
    </div>

    <!-- Table -->
    <div class="table-responsive  shadow-sm border-0 ">
      <table v-if="!loading && filteredTeachers.length" class="table table-striped table-hover mb-0 align-middle simple-table">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>ឈ្មោះ</th>
            <th>តួនាទី</th>
            <th>ថ្នាក់បង្រៀន</th>
            <th class="text-end">សកម្មភាព</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in filteredTeachers" :key="teacher.id">
            <td>{{ teacher.id }}</td>
            <td class="fw-semibold">{{ teacher.name }}</td>
            <td><span>គ្រូ</span></td>
            <td>
              <div v-if="teacher.classes?.length">
                <div
                  v-for="cls in teacher.classes"
                  :key="cls.class_teacher_id"
                  class="d-inline-flex align-items-center me-2 mb-1"
                >
                  <span class="m-2">{{ cls.name }} ({{ cls.academic_year }})</span>
                  <button class="btn btn-sm btn-outline-danger p-1" @click="handleDeleteClick(cls.class_teacher_id)">❌</button>
                </div>
              </div>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-success p-2 m-2" @click="openAssign(teacher)">➕ អោយកាន់ថ្នាក់</button>
            </td>
          </tr>
        </tbody>
      </table>
<ConfirmModal 
    :show="showDeleteModal" 
    @close="showDeleteModal = false" 
    @confirm="handleConfirmDelete" 
  />
      <!-- Loading -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2">Loading teachers...</p>
      </div>

      <!-- Empty -->
      <div v-if="!loading && !filteredTeachers.length" class="text-center py-5 text-muted">
        No teachers found 👀
      </div>
    </div>

    <!-- Assign Modal -->
<div v-if="showModal" class="custom-modal-backdrop">
  <div class="custom-modal">
    <!-- Header -->
    <div class="custom-modal-header">
      <h5 class="fw-bold">
        បន្ថែមថ្នាក់អោយគ្រូ <span class="text-primary">{{ selectedTeacher?.name }}</span>
      </h5>
      <button class="btn-close" @click="closeModal"></button>
    </div>

    <!-- Body -->
    <div class="custom-modal-body">
      <div class="mb-3">
        <label class="form-label fw-semibold pb-2">ជ្រើសរើសថ្នាក់</label>
        <select v-model="form.class_id" class="form-select flat-select p-2">
          <option disabled value="">-- ជ្រើសថ្នាក់ --</option>
          <option v-for="cls in classes" :key="cls.id" :value="cls.id">
            {{ cls.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label fw-semibold pb-2">ឆ្នាំសិក្សាដែលត្រូវបង្រៀន</label>
        <select v-model="form.academic_year_id" class="form-select flat-select p-2">
          <option disabled value="">-- ជ្រើសឆ្នាំសិក្សា --</option>
          <option v-for="year in academicYears" :key="year.id" :value="year.id">
            {{ year.year_name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Footer -->
    <div class="custom-modal-footer">
      <button class="btn btn-outline-danger p-2" @click="closeModal">ចាកចេញ</button>
      <button class="btn btn-outline-success p-2" @click="assignClassTeacher">រក្សាទុក</button>
    </div>
  </div>
</div>

    <!-- Toast -->
    <div v-if="toast.show" class="toast-container position-fixed bottom-0 end-0 p-3">
      <div class="toast show bg-{{ toast.type }} text-white shadow-sm">
        <div class="toast-body">{{ toast.message }}</div>
      </div>
    </div>
  </div>

  </div>
</template>

<style scoped>
.flat-select {
  border-radius: 8px !important;
  box-shadow: none !important;
}
.flat-input {
  border-radius: 5px !important; /* remove border radius */
  box-shadow: none !important;  /* remove shadow if you want */
}
.custom-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.custom-modal {
  background: #fff;
  border-radius: 1rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideDown 0.25s ease-out;
}

.custom-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}

.custom-modal-header h5 {
  margin: 0;
  font-size: 1.25rem;
}

.btn-close {
  border: none;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
}

.custom-modal-body {
  padding: 1.5rem;
}

.custom-modal-body .form-label {
  font-weight: 600;
}

.custom-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e5e5;
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.simple-table thead th {
  background: #1f497d;
  color: #fff;
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Kantumruy Pro', sans-serif;
}

.table-hover tbody tr:hover {
  background-color: #e9f7ff;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background: #fff;
  padding: 1.5rem;
}

.badge {
  font-size: 0.8rem;
}

.btn-sm {
  font-size: 0.85rem;
}

input.form-control {
  border-radius: 50px;
  height: 38px;
}

.card {
  overflow-x: auto;
}

.toast-container {
  z-index: 2000;
}
</style>


<script setup>
import { useTeacherController } from "~/composables/useTeacherController";
import { useclass } from "#imports";
import { useAcademic } from "#imports";
import ConfirmModal from "~/components/ConfirmModal.vue";
const {
  teachers,
  filteredTeachers,
  showModal,
  selectedTeacher,
  searchQuery,
  loading,
  toast,
  form,
  filterTeachers,
  openAssign,
  closeModal,
  assignClassTeacher,
  deactivateClassTeacher,
  setDeleteId,
  comfirmDelete
} = useTeacherController();
const showDeleteModal = ref(false)
const handleDeleteClick = (id) => {
  setDeleteId(id)
  showDeleteModal.value = true
}

const handleConfirmDelete = async () => {
  await comfirmDelete()
  showDeleteModal.value = false
}
const {classes,fetchClasses} = useclass();
const {academicYears,fetchAcademicYears} = useAcademic()
onMounted(() => {
  fetchClasses();
  fetchAcademicYears();
});

</script>


