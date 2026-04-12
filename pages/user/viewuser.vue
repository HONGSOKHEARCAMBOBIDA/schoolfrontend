<template>
  <div>
    <!-- Toast / Snackbar -->
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
<!-- Teacher Detail Modal -->
<div
  class="modal fade"
  id="teacherDetailModal"
  tabindex="-1"
  aria-labelledby="teacherDetailModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="teacherDetailModalLabel">
          ព័ត៌មានបង្រៀន
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div v-if="isLoadingDetail">Loading...</div>
        <div v-else>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>ឆ្នាំសិក្សា</th>
                <th>ថ្នាក់</th>
                <th>មុខវិជ្ជា</th>
                <th>ស្ថានភាព</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ts in teacherSubjects" :key="ts.id">
                <td>{{ ts.academic_year_name }}</td>
                <td>{{ ts.class_name }}</td>
                <td>{{ ts.subject_name }}</td>
                <td>
                  <span
                    class="badge"
                    :class="ts.is_active ? 'bg-success' : 'bg-danger'"
                  >
                    {{ ts.is_active ? 'សកម្ម' : 'អសកម្ម' }}
                  </span>
                </td>
              </tr>
              <tr v-if="teacherSubjects.length === 0">
                <td colspan="4" class="text-center">មិនមានទិន្នន័យ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>


    <!-- Filter Form -->
<div class="p-2 pt-5">
        <div class="card border-1  mt-3 mb-3 p-3">
      <div class="row g-3">
        <div class="col-md-4">
          <input
            type="text"
            class="form-control"
            placeholder="ស្វែងរកឈ្មោះ"
            v-model="filters.nameKh"
          />
        </div>
        <div class="col-md-4">
          <select class="form-select" v-model="filters.roleId">
            <option value="">ជ្រើសរើសតួនាទី</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>
   <div class="col-md-4 d-flex align-items-center gap-2">
  <button class="btn btn-outline-success d-flex align-items-center gap-1" @click="fetchUsers">
    <i class="bi bi-search"></i> ស្វែងរក
  </button>
   
  <button class="btn btn-outline-danger d-flex align-items-center gap-1" @click="resetFilters">
    លុបស្វែងរក
  </button>

  <NuxtLink :to="`/user/adduser`" class="btn btn-warning d-flex align-items-center gap-1">
    <i class="bi bi-plus-circle"></i> បង្កេីតថ្មី
  </NuxtLink>
</div>

      </div>
    </div>
</div>

    <!-- Users Table -->
<div class="p-2">
        <div class="card  border-1  mt-3">
      <div class="pt-3 pb-5">
        <div class="card-body position-relative">
          <div v-if="isLoading" class="text-center py-5">
            Loading...
          </div>
          <div v-else>
            <h5 class="fw-bold mb-3">បញ្ជីអ្នកប្រើប្រាស់</h5>
            <div class="table-container">
              <table class="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                     <th>រូបភាព</th>
                    <th>ឈ្មោះ</th>
                    <th>លេខទូរស័ព្ទ</th>
                    <th>តួនាទី</th>
                    <th>ថ្នាក់បង្រៀន</th>
                    <th>ស្ថានភាព</th>
                    <th>សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                        <td>
      <img
        v-if="user.image"
        :src="`http://localhost:8080/images/${user.image}`"
        alt="User Image"
        class="rounded-circle"
        style="width: 50px; height: 50px; object-fit: cover;"
      />
      <span v-else class="text-muted">មិនមាន</span>
    </td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.role_name }}</td>
                          <td>
        <div v-if="user.role_name === 'គ្រូបង្រៀន' && user.classes && user.classes.length > 0">
          <span
            v-for="cls in user.classes"
            :key="cls.id + '-' + cls.academic_year_id"
            class="badge bg-info text-dark me-1 mb-1"
          >
            {{ cls.name }} ({{ cls.academic_year }})
          </span>
        </div>
        <span v-else class="text-muted">-</span>
      </td>
                    <td>
                      <span
                        class="badge px-3 py-2"
                        :class="user.is_active ? 'bg-success' : 'bg-danger'"
                      >
                        {{ user.is_active ? "សកម្ម" : "អសកម្ម" }}
                      </span>
                    </td>
                    <td>

                      
                    <NuxtLink
    :to="`/user/edit/${user.id}`"
    class="btn btn-sm btn-warning me-2"
  >
    <i class="bi bi-pencil-square"></i> កែប្រែ
  </NuxtLink>
                      <button
                        class="btn btn-sm me-2"
                        :class="user.is_active ? 'btn-danger' : 'btn-success'"
                        @click="toggleUserStatus(user)"
                      >
                        <i :class="user.is_active ? 'bi bi-x-circle' : 'bi bi-check-circle'"></i>
                        {{ user.is_active ? "បិទ" : "បើក" }}
                      </button>




                      
                                              <button
    class="btn btn-sm btn-info me-2"
    v-if="user.role_name === 'Teacher'"
    @click="fetchTeacherSubjects(user.id)"
  >
    <i class="bi bi-eye"></i> ព័ត៌មានបង្រៀន
                    </button>
                    </td>
                  </tr>
                  <tr v-if="users.length === 0">
                    <td colspan="6" class="text-center text-muted py-4">
                      មិនមានអ្នកប្រើប្រាស់
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

<style scoped>

.table-container thead th {
  position: sticky;
  top: 0;
  background: #1f497d;
  color: #fff;
  z-index: 2;
}

</style>

<script>
// import userController from "../controller/userController";
import userController from '~/composables/user/controller/userController';
import { UAvatar } from '#components';
export default {
  name: "UserList",
  data() {
    return {
      users: [],
      roles: [],
      isLoading: false,
      toastMessage: "",
      filters: { nameKh: "", roleId: "" },
      teacherSubjects: [],
      isLoadingDetail: false,
    };
  },
  mounted() {
    userController.loadRoles(this);
    userController.loadUsers(this);
  },
  methods: {
    fetchUsers() {
      userController.loadUsers(this);
    },
    resetFilters() {
      this.filters.nameKh = "";
      this.filters.roleId = "";
      this.fetchUsers();
    },
    toggleUserStatus(user) {
      userController.toggleUserStatus(this, user);
    },
    fetchTeacherSubjects(userId) {
      userController.loadTeacherSubjects(this, userId);
    },
  },
};
</script>

