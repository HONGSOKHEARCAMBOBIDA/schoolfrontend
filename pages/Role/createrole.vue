<template>
  <div class="pt-2 pb-2">
    <div class="main-container">

      <!-- Toast -->
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div
          id="successToast"
          class="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="d-flex">
            <div class="toast-body">
              {{ toastMessage }}
            </div>
            <button
              type="button"
              class="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>

      <div class="pt-3">
        <!-- Card -->
        <div class="login-container">
          <div class="card-body">

            <!-- Loading -->
            <div v-if="isLoading" class="text-center py-5">
              <Loading />
            </div>

            <!-- Form -->
            <div v-else>
              <form @submit.prevent="saveRole" class="mb-4">
                <div class="mb-3 text-start">
                  <label class="form-label fw-semibold">ឈ្មោះតួនាទី</label>
                  <input
                    type="text"
                    v-model="role.name"
                    class="form-control"
                    placeholder="បញ្ចូលឈ្មោះតួនាទី"
                    :class="{ 'is-invalid': errors.name }"
                  />
    


                  
                  
                  <div v-if="errors.name" class="invalid-feedback">
                    {{ errors.name }}
                  </div>
                </div>

                <div class="mt-3 d-flex gap-2">
                  <!-- Submit / Save button -->
                  <button
                    type="submit"
                    class="btn btn-outline-success d-flex align-items-center gap-1"
                  >
                    <i class="bi bi-check-circle"></i>
                    {{ editingId ? "កែប្រែ" : "បង្កេីតថ្មី" }}
                  </button>

                  <!-- Cancel button -->
                  <button
                    v-if="editingId"
                    type="button"
                    class="btn btn-outline-warning d-flex align-items-center gap-1"
                    @click="cancelEdit"
                  >
                    <span>ថយក្រោយ</span>
                    <i class="bi bi-x-circle"></i>
                  </button>
                </div>
              </form>

              <hr />

              <!-- Table -->
              <h5 class="fw-bold mb-3 text-start">បញ្ជីតួនាទីទាំងអស់</h5>
              <div class="table-container">
                <table class="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th scope="col">លេខកូដ</th>
                      <th scope="col">ឈ្មោះ</th>
                      <th scope="col">ស្ថានភាព</th>
                      <th scope="col" class="text-center">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="r in roles" :key="r.id">
                      <td>{{ r.id }}</td>
                      <td class="fw-semibold">{{ r.name }}</td>
                      <td>
                        <span
                          class="badge px-3 py-2"
                          :class="r.is_active ? 'bg-success' : 'bg-danger'"
                        >
                          {{ r.is_active ? "សកម្ម" : "អសកម្ម" }}
                        </span>
                      </td>
                      <td class="text-center">
                        <!-- Edit button -->
                        <button
                          class="btn btn-sm btn-outline-warning me-2"
                          @click="editRole(r)"
                        >
                          <i class="bi bi-pencil-square"></i> កែប្រែ
                        </button>

                        <!-- Toggle status button -->
                        <button
                          class="btn btn-sm me-2"
                          :class="r.is_active ? 'btn-outline-danger' : 'btn-outline-success'"
                          @click="toggleRoleStatus(r)"
                          :disabled="r.loading"
                        >
                          <i :class="r.is_active ? 'bi bi-x-circle' : 'bi bi-check-circle'"></i>
                          {{ r.is_active ? "បិទ" : "បើក" }}
                        </button>

                        <!-- Permissions link -->
                        <NuxtLink
                          :to="`/Role/${r.id}/permissions`"
                          class="btn btn-sm btn-outline-warning"
                        >
                          <i class="bi bi-plus-circle"></i> កែប្រែសិទ្ធ
                        </NuxtLink>
                      </td>
                    </tr>

                    <!-- No data -->
                    <tr v-if="roles.length === 0">
                      <td colspan="4" class="text-center text-muted py-4">
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRole } from '~/composables/useRole';
import Loading from '~/components/Loading.vue'; // your loading component

// Toast message
const toastMessage = ref('');

// Form state
const role = reactive({ name: '' });
const errors = reactive({});
const editingId = ref(null);

// Use role composable
const { roles, loading: isLoading, fetchRoles, createRole, updateRole, toggleStatus } = useRole();

// Fetch roles on mount
onMounted(() => {
  fetchRoles();
});

// Save role (create or update)
const saveRole = async () => {
  errors.name = '';
  if (!role.name) {
    errors.name = 'សូមបញ្ចូលឈ្មោះតួនាទី';
    return;
  }

  try {
    if (editingId.value) {
      await updateRole(editingId.value, role);
      toastMessage.value = 'កែប្រែតួនាទីបានជោគជ័យ';
      // await fetchRoles();
    } else {
      await createRole(role);
      toastMessage.value = 'បង្កើតតួនាទីថ្មីបានជោគជ័យ';
      await fetchRoles();
    }
    cancelEdit();
  } catch (err) {
    console.error(err);
  } finally {
    // Show bootstrap toast
    const toastEl = document.getElementById('successToast');
    const bsToast = bootstrap.Toast.getOrCreateInstance(toastEl);
    bsToast.show();
  }
};

// Cancel edit
const cancelEdit = () => {
  editingId.value = null;
  role.name = '';
  errors.name = '';
};

// Edit role
const editRole = (r) => {
  editingId.value = r.id;
  role.name = r.name;
};

// Toggle role status
const toggleRoleStatus = async (r) => {
  r.loading = true;
  try {
    await toggleStatus(r);
    // await fetchRoles();
  } finally {
    r.loading = false;
  }
};
</script>

<style scoped>
* {
  font-family: 'Kantumruy Pro', sans-serif;
  font-size: 18px;
}

.main-container {
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px 30px;
}

.login-container {
  background: #fff;
  border: 1px solid #cbd5e1;
  width: 100%;
  min-height: 80vh;
  padding: 40px 30px;
  text-align: center;
  border-radius: 0;  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.table-container {
  max-height: 400px;
  overflow-y: auto;
}

.table-container thead th {
  position: sticky;
  top: 0;
  background: #1f497d;
  color: #fff;
  z-index: 2;
}

.table-container td:nth-child(2),
.table-container th:nth-child(2) {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

.badge {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
