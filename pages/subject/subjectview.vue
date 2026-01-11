<template>
  <div class="p-3">
    <div class="py-5">
      <!-- Toast -->
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="successToast" class="toast align-items-center text-bg-success border-0" role="alert">
          <div class="d-flex">
            <div class="toast-body">{{ toastMessage }}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

      <!-- Card -->
      <div class="card shadow-sm rounded-1">
        <div class="card-body">
          <h4 class="fw-bold mb-3">គ្រប់គ្រងមុខវិជ្ជា</h4>

          <!-- Form -->
          <form @submit.prevent="saveSubject" class="mb-4">
            <div class="mb-3">
              <label class="form-label fw-semibold">ឈ្មោះមុខវិជ្ជា</label>
              <input
                type="text"
                v-model="subject.name"
                class="form-control shadow-sm"
                placeholder="បញ្ចូលឈ្មោះមុខវិជ្ជា"
                :class="{ 'is-invalid': errors.name }"
              />
              <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
            </div>

            <button type="submit" class="btn btn-sm btn-outline-success px-4" >
              <i class="bi bi-check-circle"></i>
              {{ editingId ? "កែប្រែ" : "បង្កើតថ្មី" }}
            </button>
            <button v-if="editingId" type="button" class="btn btn-sm btn-outline-warning ms-2 px-4" @click="cancelEdit">
              <i class="bi bi-x-circle"></i> ថយក្រោយ
            </button>
          </form>

          <hr />

          <!-- Table -->
          <h5 class="fw-bold mb-3">បញ្ជីមុខវិជ្ជាទាំងអស់</h5>
          <div class="table-container">
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th>លេខកូដ</th>
                  <th>ឈ្មោះ</th>
                  <th>ស្ថានភាព</th>
                  <th class="text-center">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="s in subjects" :key="s.id">
                  <td>{{ s.id }}</td>
                  <td class="fw-semibold">{{ s.name }}</td>
                  <td>
                    <span class="badge px-3 py-2" :class="s.is_active ? 'bg-success' : 'bg-danger'">
                      {{ s.is_active ? "សកម្ម" : "អសកម្ម" }}
                    </span>
                  </td>
                  <td class="text-center">
                    <button class="btn btn-sm btn-warning me-2" @click="editSubject(s)">
                      <i class="bi bi-pencil-square"></i> កែប្រែ
                    </button>
                    <button class="btn btn-sm"
                            :class="s.is_active ? 'btn-danger' : 'btn-success'"
                            @click="toggleStatus(s)">
                      <i :class="s.is_active ? 'bi bi-x-circle' : 'bi bi-check-circle'"></i>
                      {{ s.is_active ? "បិទ" : "បើក" }}
                    </button>
                  </td>
                </tr>
                <tr v-if="subjects.length === 0">
                  <td colspan="4" class="text-center text-muted py-4">មិនមានទិន្នន័យ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import useSubjectController from "~/composables/subject/controllers/SubjectController";

const {
  subject,
  subjects,
  editingId,
  errors,
  toastMessage,
  fetchSubjects,
  saveSubject,
  editSubject,
  cancelEdit,
  toggleStatus,
} = useSubjectController();

onMounted(fetchSubjects);
</script>

<style scoped>
* {
  font-family: 'Kantumruy Pro', sans-serif;
  font-size: 16px;
}
.table-container {
  max-height: 400px;
  overflow-y: auto;
}
.table-container thead th {
  position: sticky;
  top: 0;
  background: #f8f9fa;
  z-index: 2;
}
</style>
