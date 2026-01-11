<template>
  <div class="pt-5">
       <div class="p-3">
        <div class="maincontainer">
      <div class="card mt-3 border-1">
    <div class="p-4">
      <!-- Form -->
      <form @submit.prevent="saveClass" class="mb-3 d-flex gap-2 align-items-end">
        <div class="flex-grow-1">
          <label class="form-label fw-bold">ឈ្មោះថ្នាក់</label>
          <input
            type="text"
            v-model="classItem.name"
            class="form-control form-control-sm"
            placeholder="បញ្ចូលឈ្មោះថ្នាក់"
            :class="{ 'is-invalid': errors.name }"
          />
          <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
        </div>

        <div>
          <button type="submit" class="btn btn-sm btn-primary">
            <i class="bi bi-check-circle"></i>
            {{ editingId ? "កែប្រែ" : "បង្កើតថ្មី" }}
          </button>
          <button
            v-if="editingId"
            type="button"
            class="btn btn-sm btn-outline-warning ms-2"
            @click="cancelEdit"
          >
            <i class="bi bi-x-circle"></i> ថយក្រោយ
          </button>
        </div>
      </form>

      <!-- Table -->
      <h6 class="fw-bold mb-2">បញ្ជីថ្នាក់</h6>
      <div class="table-container border-1 rounded">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th style="width: 80px;">លេខកូដ</th>
              <th>ឈ្មោះ</th>
              <th style="width: 120px;">ស្ថានភាព</th>
              <th style="width: 150px;" class="text-center">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in classes" :key="c.id">
              <td>{{ c.id }}</td>
              <td>{{ c.name }}</td>
              <td>
                <span
                  class="badge"
                  :class="c.is_active ? 'bg-success' : 'bg-danger'"
                >
                  {{ c.is_active ? "សកម្ម" : "អសកម្ម" }}
                </span>
              </td>
              <td class="text-center">
                <button class="btn btn-sm btn-outline-warning me-1" @click="editClass(c)">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  class="btn btn-sm"
                  :class="c.is_active ? 'btn-outline-danger' : 'btn-outline-success'"
                  @click="toggleStatus(c.id)"
                >
                  <i :class="c.is_active ? 'bi bi-x-circle' : 'bi bi-check-circle'"></i>
                </button>
              </td>
            </tr>
            <tr v-if="classes.length === 0">
              <td colspan="4" class="text-center text-muted py-3">
                មិនមានទិន្នន័យ
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ✅ Toast -->
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
  </div>
  </div>

    </div>

  </div>
</template>

<style scoped>
*{
  font-size: 18px;

}
.table-container thead th {
  position: sticky;
  top: 0;
  background-color: #1f497d !important; /* force override */
  color: #fff !important;
  z-index: 10; /* higher than table body */
}

.maincontainer {
  margin-top: 40px; 
}

.table-container thead th {
  position: sticky;
  top: 0;
  background: #1f497d;
  color: #fff;
  z-index: 2;
}


</style>

<script>
import ClassController from '~/composables/class/controllers/ClassController';

export default {
  name: "ClassCrud",
  mixins: [ClassController],
};
</script>
