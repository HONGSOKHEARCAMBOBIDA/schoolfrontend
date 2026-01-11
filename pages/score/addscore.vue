<template>
  <div class="pt-5 bg-light min-vh-100 d-flex flex-column">

    <!-- Toasts -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div id="successToast" class="toast align-items-center text-bg-success border-0 shadow-sm" role="alert">
        <div class="d-flex">
          <div class="toast-body">{{ toastMessage }}</div>
          <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
      <div id="errorToast" class="toast align-items-center text-bg-danger border-0 shadow-sm" role="alert">
        <div class="d-flex">
          <div class="toast-body">{{ toastMessage }}</div>
          <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    </div>


    <!-- Filters -->
<div class="pt-3 ps-3 pe-3">
  <div class="shadow-sm p-4 mb-3 card">
    <div class="d-flex flex-wrap gap-3 align-items-center">

      <!-- Academic Year -->
      <select v-model="selectedAcademicYear" @change="fetchStudents" 
              class="form-select shadow-sm" style="width: 200px;">
        <option value="">📅 ឆ្នាំសិក្សា</option>
        <option v-for="year in academicYears" :key="year.id" :value="year.id">{{ year.year_name }}</option>
      </select>

      <!-- Class -->
      <select v-model="selectedClass" @change="onClassChange" 
              class="form-select shadow-sm" style="width: 200px;">
        <option value="">🏫 ថ្នាក់</option>
        <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
      </select>

      <!-- Subjects -->
      <select v-model="selectedSubjects" @change="fetchExamComponents" 
              class="form-select shadow-sm" style="width: 200px;">
        <option value="">📚 មុខវិជ្ជា</option>
        <option v-for="s in assignedSubjects" :key="s.subject_id" :value="s.subject_id">{{ s.subject_name }}</option>
      </select>

      <!-- Exam Component -->
      <select v-model="selectexamcomponent" 
              class="form-select shadow-sm" style="width: 200px;">
        <option value="">📚 ការប្រឡង</option>
        <option v-for="cp in examComponents" :key="cp.id" :value="cp.id">{{ cp.name }}</option>
      </select>

      <!-- Type Exam -->
      <select v-model="selecttypeexam" 
              class="form-select shadow-sm" style="width: 250px;">
        <option value="">📚 ប្រចាំខែ/ឆមាស១/ឆមាស២</option>
        <option v-for="tx in tyeexam" :key="tx.id" :value="tx.id">{{ tx.name }}</option>
      </select>

      <!-- Exam Date -->
      <input type="date" v-model="selectedExamDate" 
             class="form-control shadow-sm" style="width: 200px;"
             placeholder="📅 ថ្ងៃប្រឡង" />

      <!-- Submit Button -->
      <button class="btn btn-outline-success" style="width: 245px;" @click="submitScores">
        💾 បញ្ចូលពិន្ទុ
      </button>

    </div>
  </div>
</div>

    

    <!-- Submit Scores Button -->


    <!-- Search -->
    <div class="p-3">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control flat-input shadow-sm"
        placeholder="🔍 ស្វែងរកសិស្សតាមឈ្មោះ..."
      />
    </div>

    <!-- Table -->
    <div class="flex-grow-1 overflow-auto p-3">
      <div class="table-responsive h-100">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-primary text-center sticky-top thead">
            <tr>
              <th>ល.រ</th>
              <th class="text-start">ឈ្មោះ</th>
              <th>ថ្នាក់</th>
              <th>ឆ្នាំសិក្សា</th>
              <th>ពិន្ទុ</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-if="loading">
              <td colspan="5" class="text-muted py-4">កំពុងទាញយកទិន្នន័យ... ⏳</td>
            </tr>

            <tr v-else v-for="(s, index) in filteredStudents" :key="s.id">
              <td>{{ index + 1 }}</td>
              <td class="text-start fw-semibold">{{ s.student_name }}</td>
              <td>{{ s.class_name }}</td>
              <td>{{ s.academic_year_name }}</td>
              <td>
                <input 
                  type="number" 
                  class="form-control flat-input" 
                  v-model.number="studentMarks[s.id]" 
                  placeholder="ពិន្ទុ" 
                  min="0"
                  max="100"
                />
              </td>
            </tr>

            <tr v-if="!loading && filteredStudents.length === 0">
              <td colspan="5" class="text-muted py-4">🙅 មិនមានសិស្សត្រូវគ្នា</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import studentController from '~/composables/score/controller/studentController';

export default {
  data() {
    return {
      students: [],
      searchQuery: "",
      studentMarks: {},
      selectedAcademicYear: "",
      selectedClass: "",
      selectedSubjects: "",
      selectexamcomponent: "",
      examComponents: [],
      assignedSubjects: [],
      academicYears: [],
      classes: [],
      tyeexam: [],
      selecttypeexam: "",
      toastMessage: "",
      loading: false,
      selectedExamDate: "",
    };
  },
  computed: {
    filteredStudents() {
      if (!this.searchQuery) return this.students;
      return this.students.filter(s =>
        s.student_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    studentController.loadAcademicYears(this);
    studentController.loadClasses(this);
    // studentController.loadStudents(this);
    studentController.loadTypeExam(this);
  },
  methods: {
    onClassChange() {
      studentController.loadSubjects(this);
    },
    fetchExamComponents() {
      studentController.loadExamComponents(this);
    },
    fetchStudents() {
      studentController.loadStudents(this);
    },
    submitScores() {
      studentController.submitScores(this);
    },
    showSuccess(msg) {
      this.toastMessage = msg;
      const toastEl = document.getElementById("successToast");
      new bootstrap.Toast(toastEl, { delay: 3000, autohide: true }).show();
    },
    showError(msg) {
      this.toastMessage = msg;
      const toastEl = document.getElementById("errorToast");
      new bootstrap.Toast(toastEl, { delay: 3000, autohide: true }).show();
    },
  },
};
</script>


<style scoped>
.thead th {
  position: sticky;
  top: 0;
  background: #1f497d;
  color: #fff;
  z-index: 2;
}
.flat-input {
  border-radius: 8px !important;
}
.flat-select {
  border-radius: 8px !important;
  box-shadow: none !important;
}

/* optional: remove focus shadow */
.flat-input:focus,
.flat-select:focus {
  box-shadow: none !important;
}
.table-responsive {
  border-radius: 8px;
}
thead.sticky-top {
  top: 0;
  z-index: 2;
}
</style>
