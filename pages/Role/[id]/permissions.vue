<template>
  <div class="pt-5">
       <div class=" py-5">
    <!-- Page Header -->
<div
  class="d-flex justify-content-between align-items-center mb-4 px-3 py-2 shadow-sm bg-white"
>
  <h3 class="fw-bold  mb-0">
     ការគ្រប់គ្រងសិទ្ធិ
  </h3>

  <div class="d-flex gap-2">
    <button
      class="btn btn-outline-danger d-flex align-items-center gap-2"
      @click="removePermissions"
    >
      <i class="bi bi-x-circle"></i> ដក Permission
    </button>
    <button
      class="btn btn-outline-success d-flex align-items-center gap-2"
      @click="savePermissions"
    >
      <i class="bi bi-check-circle"></i> រក្សា Permission
    </button>
  </div>
</div>


    <!-- Loading State -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3 text-muted">កំពុងទាញយកទិន្នន័យ...</p>
    </div>

    <!-- Permissions Table -->
    <div v-else class="card shadow-sm border-0 rounded-4">
      <div class="card-body p-4 position-relative">
        <div class="table-responsive">
            <div class="table-container">
              <div class="mb-3">
  <input
    v-model="search"
    type="text"
    class="form-control"
    placeholder="ស្វែងរកតាមឈ្មោះ ឬ ឈ្មោះបង្ហាញ..."
  />
</div>
                <table class="table table-hover align-middle">
            <thead class="table-primary">
              <tr >
                <th scope="col" class="text-start">ID</th>
                <th scope="col">ឈ្មោះសិទ្ធិ</th>
                <th scope="col">ឈ្មោះបង្ហាញ</th>
                <th scope="col">មានសិទ្ធិ?</th>
              </tr>
            </thead>
            <tbody>
              <tr
               v-for="p in filteredPermissions"
                :key="p.id"
                class="hover-row"
              >
                <td class="fw-semibold">{{ p.id }}</td>
                <td>{{ p.name }}</td>
                <td>{{ p.display_name }}</td>
                <td class="text-center">
                  <div class="form-check d-flex justify-content-center">
                    <input
                      class="form-check-input custom-checkbox"
                      type="checkbox"
                      :checked="p.assigned"
                      @change="togglePermission(p, $event)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

            </div>
        </div>
      </div>

      <!-- Footer Actions -->

    </div>
  </div>

  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useRolePermission } from "~/composables/rolehaspermission/controller/rolehaspermission";
import { ref, computed } from "vue";
const route = useRoute();
const roleId = Number(route.params.id);
const search = ref("");
const {
  permissions,
  loading,
  fetchPermissions,
  togglePermission,
  savePermissions,
  removePermissions,
} = useRolePermission(roleId);

onMounted(fetchPermissions);
const filteredPermissions = computed(() => {
  if (!search.value) return permissions.value;

  return permissions.value.filter((p) => {
    const keyword = search.value.toLowerCase();

    return (
      p.name?.toLowerCase().includes(keyword) ||
      p.display_name?.toLowerCase().includes(keyword)
    );
  });
});
</script>

<style scoped>
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1050; /* higher than table */
  border-bottom: 1px solid #3797f7;
}


.table thead th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.hover-row:hover {
  background-color: #f8f9fa;
  transition: background-color 0.2s ease-in-out;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.card-footer {
  border-top: 1px solid #eee;
}
* {
  font-family: 'Kantumruy Pro', sans-serif;
}
.table-container {
  max-height: 700px;   /* or whatever height you want */
  overflow-y: auto;
}
.table-container thead th {
  position: sticky;
  top: 0;
  z-index: 10;              /* must be higher than tbody */
  background-color: #3664aa; /* solid background */
  color: #fff;              /* text visible */
  box-shadow: 0 2px 2px rgba(0,0,0,0.05); /* optional */
}
</style>
