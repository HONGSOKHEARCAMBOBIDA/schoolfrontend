<template>
  <div class="pb-5 pt-4">
    <div class="pt-5 p-3">
      <!-- Filters -->
       <div class="mb-3">
         <div class="card p-3">
            <div class="d-flex flex-wrap gap-3 align-items-center">
        <div class=" d-flex gap-3 align-items-center flex-wrap">
        <!-- Academic Year -->
        <select v-model="selectedAcademicYear" @change="fetchScores" class="form-select  shadow-sm " style="width: 200px;">
          <option value="">ឆ្នាំសិក្សា</option>
          <option v-for="year in academicYears" :key="year.id" :value="year.id">{{ year.year_name }}</option>
        </select>

        <!-- Class -->
        <select v-model="selectedClass" @change="fetchScores" class="form-select shadow-sm" style="width: 150px;">
          <option value="">ថ្នាក់</option>
          <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
        </select>

        <!-- Start Date -->
 



        <!-- End Date -->
       
      </div>
            <div class=" d-flex gap-3 align-items-center flex-wrap">
        <!-- Subject -->
        <select v-model="selectedSubject" @change="fetchScores" class="form-select shadow-sm " style="width: 200px;">
          <option value="">មុខវិជ្ជា</option>
          <option v-for="s in assignedSubjects" :key="s.subject_id" :value="s.subject_id">{{ s.subject_name }}</option>
        </select>

        <!-- Exam Component -->
        <select v-model="selectedExamComponent" @change="fetchScores" class="form-select shadow-sm " style="width: 200px;">
          <option value="">ការប្រឡង</option>
          <option v-for="cp in examComponents" :key="cp.id" :value="cp.id">{{ cp.name }}</option>
        </select>

        <!-- Type Exam -->
        <select v-model="selectedTypeExam" @change="fetchScores" class="form-select shadow-sm " style="width: 350px;">
          <option value="">ប្រចាំខែ/ឆមាស១/ឆមាស២</option>
          <option v-for="tx in typeExams" :key="tx.id" :value="tx.id">{{ tx.name }}</option>
        </select>
      </div>
          <div class="d-flex gap-3">
  <!-- Start Date -->
  <div class="form-floating flex-grow-1">
    <input type="date" v-model="startDate" @change="fetchScores"
           class="form-control shadow-sm" id="startDate" >
    <label for="startDate">ចាប់ពីថ្ងៃ</label>
  </div>

  <!-- End Date -->
  <div class="form-floating flex-grow-1">
    <input type="date" v-model="endDate" @change="fetchScores"
           class="form-control shadow-sm " id="endDate">
    <label for="endDate">រហូតដល់</label>
  </div>
</div>

       </div>

        </div>

       </div>


      <!-- Subject, Exam Component, Type Exam -->


      <!-- Table -->
      <div class="table-responsive bg-white shadow-sm card p-4">
        <table class="table table-hover align-middle text-center mb-0">
          <thead class="table-primary text-uppercase thead">
            <tr>
              <th>ល.រ</th>
              <th class="text-start">ឈ្មោះសិស្ស</th>
              <th>ថ្នាក់</th>
              <th>ឆ្នាំសិក្សា</th>
              <th>មុខវិជ្ជា</th>
              <th>ប្រភេទការប្រលង</th>
              <th>ការប្រឡង</th>
              <th>ពិន្ទុ</th>
              <th>ថ្ងៃប្រឡង</th>
              <th>សកម្មភាព</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="10" class="text-muted py-4">កំពុងទាញយកទិន្នន័យ... ⏳</td>
            </tr>

            <tr v-else v-for="(s, i) in scores" :key="s.id">
              <td>{{ (page - 1) * limit + i + 1 }}</td>
              <td class="text-start fw-medium">{{ s.student_name }}</td>
              <td>{{ s.class_name }}</td>
              <td>{{ s.academic_year_name }}</td>
              <td>{{ s.subject_name }}</td>
              <td>{{ s.component_name }}</td>
              <td>{{ s.type_exam_name }}</td>
              <td class="fw-bold text-primary">{{ parseFloat(s.mark).toFixed(2) }}</td>
              <td>{{ formatDate(s.exam_date) }}</td>
              <td>
                <button class="btn btn-outline-warning btn-sm me-1" @click="openEditModal(s)">កែប្រែ</button>
                <button class="btn btn-outline-danger btn-sm" @click="handleDeleteClick(s.id)">លុប</button>
              </td>
            </tr>

            <tr v-if="!loading && scores.length === 0">
              <td colspan="10" class="text-muted py-4">មិនមានពិន្ទុសិស្សនៅឡើយទេ 😢</td>
            </tr>
          </tbody>
        </table>
        
        <ConfirmModal 
    :show="showDeleteModal" 
    @close="showDeleteModal = false" 
    @confirm="handleConfirmDelete" 
  />
  <div class="modal fade" id="editScoreModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">កែប្រែពិន្ទុ</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="editingScore">
            <div class="mb-3">
              <label class="form-label">ពិន្ទុថ្មី</label>
              <input
                type="number"
                class="form-control shadow-sm"
                v-model="editingScore.mark"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">ជ្រេីសរេីសប្រឡង</label>
              <input
                type="date"
                class="form-control shadow-sm"
                v-model="editingScore.exam_date"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">បោះបង់</button>
            <button class="btn btn-primary" @click="saveEditScore">រក្សាទុក</button>
          </div>
        </div>
      </div>
    </div>
        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
          <div>
            Showing {{ (page - 1) * limit + 1 }} - {{ Math.min(page * limit, total) }} of {{ total }} records
          </div>
          <nav>
            <ul class="pagination mb-0">
              <li class="page-item" :class="{ disabled: page === 1 }">
                <button class="page-link" @click="page > 1 && changePage(page - 1)">Prev</button>
              </li>
              <li v-for="p in pages" :key="p" class="page-item" :class="{ active: p === page }">
                <button class="page-link" @click="changePage(p)">{{ p }}</button>
              </li>
              <li class="page-item" :class="{ disabled: page === pages }">
                <button class="page-link" @click="page < pages && changePage(page + 1)">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {

  font-family: 'Kantumruy Pro', sans-serif;
}
.thead th {
  position: sticky;
  top: 0;
  background: #1f497d;
  color: #fff;
  z-index: 2;
}

</style>

<script setup>
import { onMounted } from "vue";
import { useScores } from "@/composables/useScores";
import ConfirmModal from "~/components/ConfirmModal.vue";

const {
  scores,
  loading,
  formatDate,
  fetchScores,
  fetchAcademicYears,
  fetchClasses,
  fetchTypeExams,
  assignedSubjects,
  examComponents,
  academicYears,
  classes,
  typeExams,
  selectedAcademicYear,
  selectedClass,
  selectedSubject,
  selectedExamComponent,
  selectedTypeExam,
  startDate,
  endDate,
  page,
  limit,
  total,
  pages,
  updateScore,
  deleteScore,
  fetchAssignedSubjects,
  fetchExamComponents,
  changePage,
  setDeleteId,
  confirmDelete,
  editingScore,
  openEditModal,
  saveEditScore
} = useScores();

const showDeleteModal = ref(false)
const handleDeleteClick = (id) => {
  setDeleteId(id)
  showDeleteModal.value = true
}

const handleConfirmDelete = async () => {
   confirmDelete()
  showDeleteModal.value = false
}
onMounted(() => {
  fetchAcademicYears();
  fetchClasses();
  fetchTypeExams();
  fetchScores();
});
</script>
