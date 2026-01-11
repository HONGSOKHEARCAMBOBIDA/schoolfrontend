<template>
  <div class="pt-3 px-3">
    <div class="container-fluid p-4">
      <!-- Filters Section -->
      <div class=" pt-4">
        <div class="card p-4 mb-4">
          <div class="row g-3">
            <div class="col-md-3">
              <input 
              type="text"
              v-model="studentName"
              @input="fetchScore"
              placeholder="ស្វែងរកដោយឈ្មោះសិស្ស"
              class="form-control shadow-sm"
              >
            </div>
            <!-- Academic Year -->
            <div class="col-md-2">
              <select v-model="selectedAcademicYear" @change="fetchScores" class="form-select shadow-sm">
                <option value="">ឆ្នាំសិក្សា</option>
                <option v-for="year in academicYears" :key="year.id" :value="year.id">
                  {{ year.year_name }}
                </option>
              </select>
            </div>

            <!-- Class -->
            <div class="col-md-2">
              <select v-model="selectedClass" @change="onClassChange" class="form-select shadow-sm">
                <option value="">ថ្នាក់</option>
                <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                  {{ cls.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Scores Table -->
      <div class="">
        <div class="card p-3 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold text-primary mb-0">សិស្សត្រូវតំឡើងថ្នាក់</h5>
          </div>

          <div class="">
              <div class="table-container">
                            <table class="table table-hover align-middle text-center mb-0">
              <thead class="table-primary text-uppercase">
                <tr>
                  <th style="width: 60px">ល.រ</th>
                  <th class="text-start">ឈ្មោះសិស្ស</th>
                  <th>មធ្យមភាគ</th>
                  <th>លទ្ធិផល</th>
                  <th class="text-start">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="10" class="text-muted py-4">កំពុងទាញយកទិន្នន័យ... ⏳</td>
                </tr>

                <tr v-else v-for="(s, index) in scores" :key="s.student_id">
                  <td>{{ index + 1 }}</td>
                  <td class="text-start fw-semibold">{{ s.student_name }}</td>
                  <td class="fw-bold text-primary">{{ parseFloat(s.avg_mark).toFixed(2) }}</td>
                  <td :class="[s.type === 'ជាប់' ? 'text-success' : 'text-danger', 'py-2', 'px-3']">
                    {{ s.type }}
                  </td>
                  <td>
                    <div class="d-flex gap-2 align-items-center">
                      <!-- Dropdown -->
                      <div class="dropdown class-dropdown" :class="{ show: s.dropdownOpen, 'force-close': s.forceClose }">
                        <button class="btn bg-warning border d-flex align-items-center px-3 py-1" @click="s.dropdownOpen = !s.dropdownOpen">
                          <span class="me-2 small">{{ getClassNameById(s.toClassID) || '-- ជ្រើសថ្នាក់ --' }}</span>
                        </button>
                        <ul class="dropdown-menu" :class="{ show: s.dropdownOpen }">
                          <li v-for="cls in classes" :key="cls.id">
                            <a
                              href="#"
                              class="dropdown-item"
                              @click.prevent="selectClass(s, cls.id)"
                            >
                              {{ cls.name }}
                            </a>
                          </li>
                        </ul>
                      </div>

                      <button class="btn btn-sm btn-success px-3" @click="promoteStudent(s.student_id, s.toClassID)">
                        បញ្ចូលថ្នាក់
                      </button>
                    </div>
                  </td>
                </tr>

                <tr v-if="!loading && scores.length === 0">
                  <td colspan="10" class="text-muted py-4">មិនមានពិន្ទុសិស្សនៅឡើយទេ 😢</td>
                </tr>
              </tbody>
            </table>

              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useclass } from "#imports";
import { useAcademic } from "#imports";
import { usePromote } from "#imports";

const { classes, fetchClasses } = useclass();
const { academicYears, fetchAcademicYears } = useAcademic();
const { scores, loading, selectedAcademicYear, selectedClass, fetchScore, promoteStudent,studentName } = usePromote();

const getClassNameById = (id) => {
  const c = classes.value.find(x => x.id === id);
  return c ? c.name : "";
};

const onClassChange = async () => {
  scores.value = [];
  if (!selectedClass.value) return;
  await fetchScore(); // ✅ call destructured function directly
};

const selectClass = (student, classId) => {
  student.toClassID = classId;
  student.dropdownOpen = false;
  student.forceClose = false;
  setTimeout(() => (student.forceClose = false), 200);
};

onMounted(() => {
  fetchAcademicYears();
  fetchClasses();
  fetchScore(); // ✅ call destructured function directly
});
</script>


<style scoped>
.table-container {
  max-height: 500px; /* adjust height as needed */
  overflow-y: auto;
}

.table-container thead th {
  position: sticky;
  top: 0;
  background: #1f497d;
  color: #fff;
  z-index: 5; /* higher than dropdowns/buttons */
}

.class-dropdown {
  position: relative;
  display: inline-block;
}
.class-dropdown .dropdown-menu {
  display: none;
  min-width: 10rem;
  z-index: 1050;
  max-height: 220px;
  overflow: auto;
}
.class-dropdown:hover .dropdown-menu,
.class-dropdown:focus-within .dropdown-menu {
  display: block;
}
.class-dropdown.force-close:hover .dropdown-menu {
  display: none !important;
}

.class-dropdown .btn {
  white-space: nowrap;
}
</style>
