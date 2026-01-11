<template>
  <div class="pt-5">
      <div class="p-4">
    <div class="login-container">
      <!-- Header & Search -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="fw-bold text-primary">សិស្សត្រូវបញ្ចូលតាមថ្នាក់</h3>
        <input
          v-model="searchQuery"
          @input="filterStudents"
          type="text"
          class="form-control w-50 shadow-sm px-3"
          placeholder="🔍 ស្វែងរកដោយឈ្មោះ..."
        />
      </div>

      <!-- Table -->
      <div class="table-responsive border overflow-auto">
        <table class="table table-hover mb-0 align-middle text-center simple-table">
          <thead>
            <tr>
              <th>ល.រ</th>
              <th class="text-start ps-3">ឈ្មោះ</th>
              <th>ភេទ</th>
              <th>លេខទូរស័ព្ទ</th>
              <th class="text-end pe-3">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in filteredStudents" :key="student.id">
              <td>{{ index + 1 }}</td>
              <td class="text-start ps-3 fw-semibold">{{ student.name }}</td>
              <td>
                <span
                  class="badge"
                  :class="
                    Number(student.Gender) === 1
                      ? 'text-bg-info'
                      : Number(student.Gender) === 2
                      ? 'text-bg-danger'
                      : 'text-bg-secondary'
                  "
                >
                  {{
                    Number(student.Gender) === 1
                      ? 'ប្រុស'
                      : Number(student.Gender) === 2
                      ? 'ស្រី'
                      : 'មិនបញ្ជាក់'
                  }}
                </span>
              </td>
              <td>{{ student.phone }}</td>
              <td class="text-end pe-3">
                <div class="d-flex align-items-center justify-content-end gap-2">
                  <!-- Dropdown Class -->
                  <select
                    v-model="form.class_id"
                    class="form-select form-select-sm w-auto"
                  >
                    <option disabled value="">-- ជ្រើសថ្នាក់ --</option>
                    <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                      {{ cls.name }}
                    </option>
                  </select>

                  <!-- Dropdown Academic Year -->
                  <select
                    v-model="form.academic_year_id"
                    class="form-select form-select-sm w-auto"
                  >
                    <option disabled value="">-- ឆ្នាំសិក្សា --</option>
                    <option
                      v-for="year in academicYears"
                      :key="year.id"
                      :value="year.id"
                    >
                      {{ year.year_name }}
                    </option>
                  </select>

                  <!-- Button -->
                  <button
                    class="btn btn-sm btn-success px-3"
                    @click="assignStudent(student.id)"
                  >
                    បញ្ចូលថ្នាក់
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredStudents.length === 0">
              <td colspan="5" class="text-muted py-4">មិនមានទិន្នន័យ 😢</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- End Table -->
    </div>
  </div>

  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStudentClass } from "~/composables/usestudentclass";
import { useclass } from "#imports";
import { useAcademic } from "#imports";

const {
  searchQuery,
  filteredStudents,
  form,
  fetchStudents,
  filterStudents,
  assignStudent: assignBase,
} = useStudentClass();

const { classes, fetchClasses } = useclass();
const { academicYears, fetchAcademicYears } = useAcademic();

const assignStudent = async (studentId) => {
  form.value.student_id = studentId;
  await assignBase();
};

onMounted(() => {
  fetchStudents();
  fetchClasses();
  fetchAcademicYears();
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: 'Kantumruy Pro', sans-serif;
}

.login-container {
  border: 1px solid #cbd5e1;
  width: 100%;
  min-height: 80vh;
  padding: 10px 10px;
  border-radius: 0;
  display: flex;
  flex-direction: column;
}

.table th,
.table td {
  vertical-align: middle;
}

table thead th {
  position: sticky;
  top: 0;
  background: #1f497d; /* dark blue header */
  color: #fff;
  z-index: 2;
}
.simple-table thead th {
  background: #1f497d;
  color: #fff;
}
</style>
