<template>
  <div class="p-3">
      <div class="pt-5 pb-5">
    <div >
      <!-- Toast -->
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="successToast" class="toast align-items-center text-bg-success border-0" role="alert">
          <div class="d-flex">
            <div class="toast-body">{{ toastMessage }}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <h4 class="fw-bold mb-4">ភ្ជាប់មុខវិជ្ជាជាមួយថ្នាក់</h4>

          <!-- Custom Hover Dropdown (class) -->
          <div class="mb-4">
            <label class="form-label">ជ្រើសរើសថ្នាក់</label>

            <div class="dropdown-hover">
              <div class="dropdown-btn" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false">
                {{ selectedClassName || '-- ជ្រើសរើស --' }}
                <i class="bi bi-caret-down-fill float-end"></i>
              </div>

              <ul class="dropdown-menu">
                <!-- Reset / default -->
                <li class="dropdown-item" @click="clearSelectedClass">
                  -- ជ្រើសរើស --
                </li>

                <li
                  v-for="c in classes"
                  :key="c.id"
                  class="dropdown-item"
                  @click="selectClass(c)"
                >
                  {{ c.name }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Loading indicator -->
          <div v-if="loading" class="mb-3 text-muted">កំពុងផ្ទុក...</div>

          <!-- Assign panel -->
          <div v-if="selectedClass && !loading" class="mb-4 card">
            <div class="card-body">
              <h5 class="fw-bold mb-2">មុខវិជ្ជាដែលមិនទាន់ភ្ជាប់</h5>

              <div v-if="notAssignedSubjects.length === 0" class="text-muted">✅ មុខវិជ្ជាទាំងអស់បានភ្ជាប់រួច</div>

              <div v-else class="row">
                <div class="col-md-8">
                  <select multiple size="8" v-model="selectedSubjects" class="form-select select-multiple">
                    <option v-for="s in notAssignedSubjects" :key="s.subject_id" :value="s.subject_id">
                      {{ s.subject_name }}
                    </option>
                  </select>
                  <small class="text-muted">Hold Ctrl/Cmd to select multiple</small>
                </div>

                <div class="col-md-4 d-flex align-items-start">
                  <button class="btn btn-primary w-100" :disabled="selectedSubjects.length === 0" @click="assignSubjects">
                    <i class="bi bi-plus-circle"></i> បន្ថែម
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <!-- Assigned list -->
          <div v-if="selectedClass && !loading">
            <h5 class="fw-bold mb-2">មុខវិជ្ជាដែលបានភ្ជាប់</h5>
            <table class="table table-striped">
              <thead>
                <tr><th>#</th><th>មុខវិជ្ជា</th><th>ថ្នាក់</th><th>សកម្មភាព</th></tr>
              </thead>
              <tbody>
                <tr v-for="(a, idx) in assignedSubjects" :key="a.id">
                  <td>{{ idx + 1 }}</td>
                  <td>{{ a.subject_name }}</td>
                  <td>{{ a.class_name }}</td>
                  <td>
     <button class="btn btn-danger btn-sm" @click="handleDeleteClick(a.id)">
    <i class="bi bi-trash"></i> លុប
  </button>

                  </td>
                </tr>
                <tr v-if="assignedSubjects.length === 0">
                  <td colspan="4" class="text-center text-muted">មិនទាន់មាន</td>
                </tr>
              </tbody>
            </table>
            <!-- Delete Confirmation Modal -->

<ConfirmModal 
    :show="showDeleteModal" 
    @close="showDeleteModal = false" 
    @confirm="handleConfirmDelete" 
  />
          </div>

        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useclass } from "~/composables/useclass";
import { useClassSubject } from "#imports";
import ConfirmModal from '~/components/ConfirmModal.vue'
// composables
const { classes, fetchClasses } = useclass();
const {
  assignedSubjects,
  notAssignedSubjects,
  selectedClass,
  selectedClassName,
  selectedSubjects,
  loading,
  selectClass,
  clearSelectedClass,
  assignSubjects,
  confirmDelete,
  setDeleteId
} = useClassSubject();

// Reactive ref to handle modal
const showDeleteModal = ref(false)

const handleDeleteClick = (id) => {
  setDeleteId(id)
  showDeleteModal.value = true
}

const handleConfirmDelete = async () => {
  await confirmDelete()
  showDeleteModal.value = false
}

// fetch classes on mount
onMounted(async () => {
  await fetchClasses();
});
</script>




<style scoped>
* { font-family: 'Kantumruy Pro', sans-serif; }

/* custom hover dropdown styles */
.dropdown-hover {
  position: relative;
  width: 100%;
  max-width: 420px;
}

.dropdown-btn {
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 6px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 0;
  list-style: none;
  padding: 6px 0;
  display: none;
  z-index: 1000;
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f7f7f7;
}

.dropdown-hover:hover .dropdown-menu,
.dropdown-hover:focus-within .dropdown-menu {
  display: block;
}

/* multiple select height */
.select-multiple { height: 200px; }
</style>
