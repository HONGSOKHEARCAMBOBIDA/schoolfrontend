<template>
  <div class="p-3">
    <div class="py-5">
      <!-- Card -->
      <div class="card">
        <div class="card-body">
          <h4 class="fw-bold mb-3">បញ្ជីការតំឡេីងថ្នាក់</h4>

          <!-- Filters -->
          <div class="row g-3 align-items-center mb-4">
            <!-- Student Name -->
            <div class="col-md-3">
              <input
                v-model="name"
                type="text"
                class="form-control shadow-sm"
                placeholder="ឈ្មោះសិស្ស"
                @input="fetchPromote"
              />
            </div>

            <!-- Old Academic Year -->
            <div class="col-md-2">
              <select v-model="oldacademic" class="form-select shadow-sm" @change="fetchPromote">
                <option value="">-- ឆ្នាំសិក្សាចាស់ --</option>
                <option v-for="y in academicYears" :key="y.id" :value="y.id">
                  {{ y.year_name }}
                </option>
              </select>
            </div>

            <!-- New Academic Year -->
            <div class="col-md-2">
              <select v-model="newacademic" class="form-select shadow-sm" @change="fetchPromote">
                <option value="">-- ឆ្នាំសិក្សាថ្មី --</option>
                <option v-for="y in academicYears" :key="y.id" :value="y.id">
                  {{ y.year_name }}
                </option>
              </select>
            </div>

            <!-- Old Class -->
            <div class="col-md-2">
              <select v-model="oldclasss" class="form-select shadow-sm" @change="fetchPromote">
                <option value="">-- ថ្នាក់ចាស់ --</option>
                <option v-for="c in classes" :key="c.id" :value="c.id">
                  {{ c.name }}
                </option>
              </select>
            </div>

            <!-- New Class -->
            <div class="col-md-2">
              <select v-model="newclass" class="form-select shadow-sm" @change="fetchPromote">
                <option value="">-- ថ្នាក់ថ្មី --</option>
                <option v-for="c in classes" :key="c.id" :value="c.id">
                  {{ c.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="text-center py-4">
            កំពុងទាញទិន្នន័យ...
          </div>

          <!-- Error -->
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <!-- Table -->
          <div v-if="!loading && !error">
            <div class="table-container">
              <table class="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>លេខកូដ</th>
                    <th>សិស្ស</th>
                    <th>ថ្នាក់ចាស់</th>
                    <th>ថ្នាក់ថ្មី</th>
                    <th>ឆ្នាំសិក្សាចាស់</th>
                    <th>ឆ្នាំសិក្សាថ្មី</th>
                    <th>អ្នកបង្កេីត</th>
                    <th>កាលបរិច្ឆេទ</th>
                    <th>សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in promotes" :key="p.id">
                    <td>{{ p.id }}</td>
                    <td>{{ p.student_name }}</td>
                    <td>{{ p.from_class_name }}</td>
                    <td>{{ p.to_class_name }}</td>
                    <td>{{ p.from_academic_year_name }}</td>
                    <td>{{ p.to_academic_year_name }}</td>
                    <td>{{ p.promote_name }}</td>
                    <td>{{ p.promote_date.split('T')[0] }}</td>
                    <td>
                      <button class="btn btn-sm btn-danger" @click="() => deletePromotion(p.id)">
                        លុប
                      </button>
                    </td>
                  </tr>
                  <tr v-if="promotes.length === 0">
                    <td colspan="9" class="text-center text-muted py-4">
                      មិនមានទិន្នន័យ
                    </td>
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
import { onMounted } from "vue"
import { useclass } from "#imports"
import { useAcademic } from "#imports"
import { usePromote } from "~/composables/usePromote"

// Composables
const { classes, fetchClasses } = useclass()
const { academicYears, fetchAcademicYears } = useAcademic()
const {
  promotes,
  oldacademic,
  newacademic,
  oldclasss,
  newclass,
  name,
  loading,
  error,
  fetchPromote,
  deletePromotion
} = usePromote()

// Initialize data
onMounted(() => {
  fetchPromote()
  fetchClasses()
  fetchAcademicYears()
})
</script>

<style scoped>
* {
  font-family: "Kantumruy Pro", sans-serif;
}
.table-container {
  max-height: 500px;
  overflow-y: auto;
}

.table-container thead th {
  position: sticky;
  top: 0;
  background: #1f497d;
  color: #fff;
  z-index: 5;
}
</style>
