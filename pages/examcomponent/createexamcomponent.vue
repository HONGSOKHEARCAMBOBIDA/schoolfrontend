<template>
  <div class="pt-5">
      <div class="p-3">
     <div class="card-body">
    <!-- Toast -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div id="successToast" class="toast align-items-center text-bg-success border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body">{{ toastMessage }}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hideToast"></button>
        </div>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">

        <!-- Select Class -->
        <div class="mb-3">
          <label class="form-label">ជ្រើសរើសថ្នាក់</label>
          <div class="dropdown" @mouseenter="classDropdown = true" @mouseleave="classDropdown = false">
            <button class="btn btn-outline-primary w-100 text-start dropdown-toggle" type="button"
                    :class="{ show: classDropdown }" aria-expanded="false">
              {{ selectedClassName || '-- ជ្រើសរើស --' }}
            </button>
     <ul class="dropdown-menu w-100" :class="{ show: classDropdown }">
  <li v-for="c in classes" :key="c.id" @click="selectClass(c)">
    <a class="dropdown-item" href="#">{{ c.name }}</a>
  </li>
</ul>

          </div>
        </div>

        <!-- Assigned Subjects -->
        <div v-if="selectedClass && !loading" class="mb-3">
          <label class="form-label">មុខវិជ្ជាដែលបានភ្ជាប់</label>
          <div class="dropdown" @mouseenter="subjectDropdown = true" @mouseleave="subjectDropdown = false">
            <button class="btn btn-outline-primary w-100 text-start dropdown-toggle" type="button"
                    :class="{ show: subjectDropdown }" aria-expanded="false">
              {{ selectedSubjectName || '-- ជ្រើសរើសមុខវិជ្ជា --' }}
            </button>
            <ul class="dropdown-menu w-100" :class="{ show: subjectDropdown }">
              <li v-for="s in assignedSubjects" :key="s.subject_id" @click="selectSubject(s)">
                <a class="dropdown-item" href="#">{{ s.subject_name }}</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="my-2 text-muted">កំពុងផ្ទុក...</div>

        <!-- Exam Components Table -->
        <div v-if="examComponents.length > 0" class="mt-4">
          <h5>ប្រភេទនៃការប្រឡង</h5>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ល.រ</th>
                <th>ឈ្មោះ</th>
                <th>សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ec, idx) in examComponents" :key="ec.id">
                <td>{{ idx + 1 }}</td>
                <td v-if="editId !== ec.id">{{ ec.name }}</td>
                <td v-else>
                  <input v-model="editName" class="form-control form-control-sm" />
                </td>
                <td>
                  <div v-if="editId !== ec.id">
                    <button class="btn btn-sm btn-outline-warning me-2" @click="startEdit(ec)">កែប្រែ</button>
                  </div>
                  <div v-else>
                    <button class="btn btn-sm btn-outline-success me-2" @click="updateExamComponent(ec.id)">រក្សាទុក</button>
                    <button class="btn btn-sm btn-outline-danger" @click="cancelEdit">បោះបង់</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else-if="selectedSubject && !loading" class="text-muted mt-2">មិនទាន់មាន Exam Component</div>

        <!-- Create Exam Component -->
<!-- Create Exam Component -->
<div class="mt-4">
  <div class="input-group mb-2">
    <input
      v-model="newComponentName"
      type="text"
      class="form-control"
      placeholder="បញ្ចូលឈ្មោះ ប្រភេទនៃការប្រឡង"
    />
    <button class="btn btn-success" @click="createExamComponent">បង្កើត</button>
  </div>
</div>


      </div>
    </div>
  </div>

  </div>

  </div>
</template>
<script setup>
import { useExamComponent } from '~/composables/useExamComponent';
import { useclass } from '#imports';
const {

  assignedSubjects,
  examComponents,
  selectedClass,
  selectedClassName,
  selectedSubjectName,
  classDropdown,
  subjectDropdown,
  selectClass,
  selectSubject,
  editId,
  editName,
      startEdit,
    cancelEdit,
    newComponentName,
    createExamComponent,
  updateExamComponent,
  selectedSubjectId
} = useExamComponent();
const {classes,fetchClasses} = useclass();
onMounted(async () => {
  await fetchClasses();
});
</script>



<style scoped>
table thead th {
  position: sticky;
  top: 0;
  background: #1f497d; /* your desired color */
  color: #fff;
  z-index: 2;
}


* { font-family: 'Kantumruy Pro', sans-serif; }
.dropdown-menu.show { display: block; }
</style>
