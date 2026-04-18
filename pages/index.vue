<template>
<div class="pt-5">
    <div class="bg-light min-vh-100 d-flex flex-column">

    <!-- Toasts -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="successToast"
        class="toast align-items-center text-bg-success border-0 shadow-sm"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">{{ toastMessage }}</div>
          <button
            type="button"
            class="btn-close btn-close-white ms-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>
      <div
        id="errorToast"
        class="toast align-items-center text-bg-danger border-0 shadow-sm"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">{{ toastMessage }}</div>
          <button
            type="button"
            class="btn-close btn-close-white ms-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>
    </div>

    <!-- Edit Student Modal -->
    <div
      class="modal fade"
      id="editStudentModal"
      tabindex="-1"
      aria-labelledby="editStudentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-sm ">
          <div class="modal-header bg-warning text-dark">
            <h5 class="modal-title" id="editStudentModalLabel">
               កែប្រែព័ត៌មានសិស្ស
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="updateStudent">
            <div class="modal-body p-3">
              <div class="row g-3">
                <!-- Student Info -->
                <div class="col-md-6">
                  <label class="form-label">ឈ្មោះ</label>
                  <input
                    v-model="editForm.name"
                    type="text"
                    class="form-control"
                    placeholder="បញ្ចូលឈ្មោះ"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">ថ្ងៃខែឆ្នាំកំណើត</label>
                  <input v-model="editForm.dob" type="date" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">ភេទ</label>
                  <select v-model.number="editForm.gender" class="form-select" required>
                    <option value="">ជ្រើសរើសភេទ</option>
                    <option :value="1">ប្រុស</option>
                    <option :value="2">ស្រី</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">ក្រីក្រ</label>
                  <select v-model.number="editForm.is_poor" class="form-select" required>
                    <option value="">ជ្រើសរើស</option>
                    <option :value="1">ក្រីក្រ</option>
                    <option :value="0">មិនក្រីក្រ</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">ពិការភាព</label>
                  <select v-model.number="editForm.is_disability" class="form-select" required>
                    <option value="">ជ្រើសរើស</option>
                    <option :value="1">ពិការ</option>
                    <option :value="0">មិនពិការ</option>
                  </select>
                </div>
                <div class="col-md-12" v-if="editForm.is_disability === 1">
                  <label class="form-label">ជ្រើសរើសប្រភេទពិការភាព</label>
                  <select v-model="editForm.disability_ids" class="form-select" multiple>
                    <option v-for="d in disabilities" :key="d.id" :value="d.id">{{ d.name }}</option>
                  </select>
                </div>

                <div class="col-md-6">
                  <label class="form-label">លេខទូរស័ព្ទ</label>
                  <input
                    v-model="editForm.phone"
                    type="text"
                    class="form-control"
                    placeholder="012345678"
                  />
                </div>

                <!-- Parent Info -->
                <div class="col-md-6">
                  <label class="form-label">ឈ្មោះឪពុក</label>
                  <input v-model="editForm.father_name" type="text" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">មុខរបរឪពុក</label>
                  <input v-model="editForm.father_occupation" type="text" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">ឈ្មោះម្ដាយ</label>
                  <input v-model="editForm.mother_name" type="text" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">មុខរបរម្ដាយ</label>
                  <input v-model="editForm.mother_occupation" type="text" class="form-control" />
                </div>

                        <!-- Address -->
                <div class="col-md-3">
                  <label class="form-label">ខេត្ត</label>
                  <select
                    v-model="editSelectedProvince"
                    @change="fetchDistrictsForEdit"
                    class="form-select"
                    required
                  >
                    <option value="">ជ្រើសរើសខេត្ត</option>
                    <option v-for="p in provinces" :key="p.id" :value="p.id">{{ p.name }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label">ស្រុក</label>
                  <select
                    v-model="editSelectedDistrict"
                    @change="fetchCommunesForEdit"
                    class="form-select"
                  
                    required
                  >
                    <option value="">ជ្រើសរើសស្រុក</option>
                    <option v-for="d in editDistricts" :key="d.id" :value="d.id">{{ d.name }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label">ឃុំ</label>
                  <select
                    v-model="editSelectedCommune"
                    @change="fetchVillagesForEdit"
                    class="form-select"
                   
                    required
                  >
                    <option value="">ជ្រើសរើសឃុំ</option>
                    <option v-for="c in editCommunes" :key="c.id" :value="c.id">{{ c.name }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label">ភូមិ</label>
                  <select
                    v-model.number="editForm.village_id"
                    class="form-select"
                    :disabled="!editSelectedCommune"
                    required
                  >
                    <option value="">ជ្រើសរើសភូមិ</option>
                    <option v-for="v in editVillages" :key="v.id" :value="v.id">{{ v.name }}</option>
                  </select>
                </div>

                <!-- Class Selection -->

              </div>
            </div>

            <div class="modal-footer border-0">
              <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">
                បោះបង់
              </button>
              <button type="submit" class="btn btn-warning rounded-pill px-4" :disabled="editLoading">
                {{ editLoading ? "កំពុងរក្សាទុក..." : "រក្សាទុក" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Student Detail Modal -->
    <div
      class="modal fade"
      id="studentDetailModal"
      tabindex="-1"
      aria-labelledby="studentDetailModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-sm ">
          <div class="modal-header bg-primary text-white ">
            <h5 class="modal-title" id="studentDetailModalLabel">
               សេចក្ដីលម្អិតសិស្ស
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <div v-if="selectedStudent" class="row g-3">
              <!-- Left Column -->
              <div class="col-md-6">
                <h6 class="text-secondary mb-2">ព័ត៌មានទូទៅ</h6>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item py-2">
                    <strong>ឈ្មោះ:</strong> {{ selectedStudent.name }}
                  </li>
                  <li class="list-group-item py-2">
                    <strong>លេខកូដសិស្ស:</strong> {{ selectedStudent.code }}
                  </li>
                  <li class="list-group-item py-2">
                    <strong>ថ្ងៃកំណើត:</strong> {{ formatDate(selectedStudent.dob) }}
                  </li>
                  <li class="list-group-item py-2">
                    <strong>ភេទ:</strong>
                    <span
                      class="badge"
                      :class="Number(selectedStudent.Gender) === 1 ? 'bg-info' : 'bg-danger'"
                    >
                      {{ Number(selectedStudent.Gender) === 1 ? 'ប្រុស' : 'ស្រី' }}
                    </span>
                  </li>
                  <li class="list-group-item py-2">
                    <strong>លេខទូរស័ព្ទ:</strong> {{ selectedStudent.phone }}
                  </li>
                  <li class="list-group-item py-2">
                    <strong>ថ្នាក់:</strong> {{ selectedStudent.class_name }}
                  </li>
                  <li class="list-group-item py-2">
                    <strong>ឆ្នាំសិក្សា:</strong> {{ selectedStudent.academic_name }}
                  </li>
                </ul>
              </div>

              <!-- Right Column -->
              <div class="col-md-6">
                <h6 class="text-secondary mb-2">ព័ត៌មានគ្រួសារ និងស្ថានភាព</h6>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item py-2">
                    <strong>ឪពុក/ម្ដាយ:</strong> {{ selectedStudent.father_name }} / {{ selectedStudent.mother_name }}
                  </li>
                  <li class="list-group-item py-2">
                    <strong>ក្រីក្រ:</strong>
                    <span
                      class="badge"
                      :class="selectedStudent.is_poor ? 'bg-warning text-dark' : 'bg-success'"
                    >
                      {{ selectedStudent.is_poor ? 'ក្រីក្រ' : 'មិនក្រីក្រ' }}
                    </span>
                  </li>
                  <li class="list-group-item py-2">
                    <strong>ពិការភាព:</strong>
                    <span v-if="selectedStudent.disabilities && selectedStudent.disabilities.length">
                      <span v-for="d in selectedStudent.disabilities" :key="d.id" class="badge bg-warning me-1 mb-1">
                        {{ d.name }}
                      </span>
                    </span>
                    <span v-else class="text-muted">មិនមាន</span>
                  </li>
                  <li class="list-group-item py-2">
                    <strong>គ្រូបន្ទប់ថ្នាក់:</strong> {{ selectedStudent.teacher_name }}
                  </li>
                  <li class="list-group-item py-2">
                    <strong>ភូមិ/ឃុំ/ស្រុក/ខេត្ត:</strong>
                    {{ selectedStudent.village_name }}, {{ selectedStudent.commune_name }},
                    {{ selectedStudent.district_name }}, {{ selectedStudent.province_name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">
              បិទ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <!-- Filters -->
    <div class="p-3">
      <div class="bg-white p-4 mb-3 card">
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <!-- Search -->
          <div class="input-group" style="max-width: 180px;">
            <input
              v-model="searchName"
              @input="currentPage =1 ; fetchStudents()"
              
              type="text"
              class="form-control flat-input"
              placeholder="ស្វែងរកឈ្មោះ"
              style="box-shadow: none !important;"
            />
            <button
              v-if="searchName"
              class="btn btn-outline text-danger"
              type="button"
              @click="searchName = ''; fetchStudents()"
            >
              ✕
            </button>
          </div>

          <!-- Academic Year -->
          <div class="input-group" style="max-width: 180px;">
            <select
              v-model="selectedAcademicYear"
              @change="currentPage =1; fetchStudents()"
              class="form-select border-1"
              style="box-shadow: none !important;"
            >
              <option value="">ឆ្នាំសិក្សា</option>
              <option v-for="year in academicYears" :key="year.id" :value="year.id">
                {{ year.year_name }}
              </option>
            </select>
            <button 
              v-if="selectedAcademicYear" 
              class="btn btn-outline-danger btn-sm" 
              type="button" 
              @click="selectedAcademicYear = ''; fetchStudents()"
            >
              ✕
            </button>
          </div>

          <!-- Class -->
          <div class="input-group" style="max-width: 150px;">
            <select
              v-model="selectedClass"
              @change="currentPage =1; fetchStudents()"
              class="form-select border-1"
              style="box-shadow: none !important;"
            >
              <option value="">ថ្នាក់</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                {{ cls.name }}
              </option>
            </select>
            <button 
              v-if="selectedClass" 
              class="btn btn-outline-danger btn-sm"
              type="button" 
              @click="selectedClass = ''; fetchStudents()"
            >
              ✕
            </button>
          </div>

          <!-- Poor Status -->
          <div class="input-group" style="max-width: 180px;">
            <select
              v-model="selectPoor"
              @change="currentPage =1; fetchStudents()"
              class="form-select border-1"
              style="box-shadow: none !important;"
            >
              <option value="">ជីវភាព</option>
              <option :value="1">ក្រីក្រ</option>
              <option :value="0">មិនក្រីក្រ</option>
            </select>
            <button v-if="selectPoor" 
              class="btn btn-outline-danger btn-sm" 
              type="button" 
              @click="selectPoor = ''; fetchStudents()"> 
              ✕
            </button>
          </div>

          <!-- Disability -->
          <div class="input-group" style="max-width: 150px;">
            <select
              v-model="selectDisability"
              @change="currentPage =1; fetchStudents()"
              class="form-select border-1"
              style="box-shadow: none !important;"
            >
              <option value="">ពិការភាព</option>
              <option :value="1">ពិការ</option>
              <option :value="0">មិនពិការ</option>
            </select>
            <button 
              v-if="selectDisability" 
              class="btn btn-outline-danger px-2" 
              type="button" 
              @click="selectDisability = ''; fetchStudents()"
            >
              ✕
            </button>
          </div>

          <div class="input-group" style="max-width: 150px;">
            <select
              v-model="selectsupenstudey"
              @change="currentPage =1; fetchStudents()"
              class="form-select border-1"
              style="box-shadow: none !important;"
            >
              <option value="">ស្ថានភាពសិស្ស</option>
              <option :value="1">កំពុងរៀន</option>
              <option :value="2">ភ្ជួរឈ្មោះ</option>
              <option :value="3">ដូរសាលា</option>
              <option :value="4">ឈប់រៀន</option>
            </select>
            <button 
              v-if="selectsupenstudey" 
              class="btn btn-sm px-2" 
              type="button" 
              @click="selectsupenstudey = ''; fetchStudents()"
            >
              ✕
            </button>
          </div>




          <router-link to="/student/student">
            <button class="btn btn-outline-success px-4">
              + ចុះឈ្មោះសិស្ស
            </button>
          </router-link>

          <!-- Reset Button -->
          <button
            class="btn btn-outline-warning ms-auto"
            @click="
              searchName = '';
              selectedAcademicYear = '';
              selectedClass = '';
              selectPoor = '';
              selectDisability = '';
              selectsupenstudey = '';
              stopsutdy = '';
              changeschool = '';
              fetchStudents();
            "
          >
            ♻️ កំណត់ឡើងវិញ
          </button>

          <!-- Gender Count -->
          <div class="ms-2">
            <span class="badge bg-primary px-4 py-2 me-2">
              {{ maleCount }} ប្រុស
            </span>
            <span class="badge bg-primary px-4 py-2 me-1">
              {{ femaleCount }} ស្រី
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="p-3 pb-5">
      <div class="flex-grow-1 overflow-auto p-3 card" id="studentTable">
        <div class="table-container">
          <table class="table table-hover align-middle mb-0 table-bordered">
            <thead class="table-primary text-center thead">
              <tr>
                <th>ល.រ</th>
                <th>ឈ្មោះ</th>
                <th>ឆ្នាំសិក្សា</th>
                <th>ថ្ងៃកំណើត</th>
                <th>ភេទ</th>
                <th>លេខទូរស័ព្ទ</th>
                <th>ភូមិ</th>
                <th>ឪពុក/ម្ដាយ</th>
                <th>គ្រូបន្ទប់ថ្នាក់</th>
                <th>ថ្នាក់</th>
                <th>ក្រីក្រ</th>
                <th>ពិការភាព</th>
                <th>ស្ថានភាព</th>
                <th>កែប្រែថ្នាក់</th>
                <th>លម្អិត</th>
                <th>កែប្រែព័ត៌មាន</th>
                <th>សកម្ម</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-if="loading">
                <td colspan="17" class="text-muted py-4">
                  កំពុងទាញយកទិន្នន័យ... ⏳
                </td>
              </tr>
              <tr v-else v-for="(s, index) in students" :key="s.id">
               <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
                <td class="text-start fw-semibold">{{ s.name }}</td>
                <td class="text-start fw-semibold">{{ s.academic_name }}</td>
                <td>{{ formatDate(s.dob) }}</td>
                <td>
                  <span>
                    {{ Number(s.Gender) === 1 ? 'ប្រុស' : Number(s.Gender) === 2 ? 'ស្រី' : 'មិនបញ្ជាក់' }}
                  </span>
                </td>
                <td>{{ s.phone }}</td>
                <td class="text-start small">
                  {{ s.village_name }}, {{ s.commune_name }},
                  {{ s.district_name }}, {{ s.province_name }}
                </td>
                <td class="text-start small">
                  {{ s.father_name }} / {{ s.mother_name }}
                </td>
                <td class="text-start">{{ s.teacher_name }}</td>
                <td>{{ s.class_name }}</td>
                <td>
                  <span>
                    {{ Number(s.is_poor) === 1 ? 'ក្រីក្រ' : Number(s.is_poor) === 0 ? 'មិនក្រីក្រ' : 'មិនបញ្ជាក់' }}
                  </span>
                </td>
                <td>
                  <span>
                    {{ Number(s.is_disability) === 1 ? 'ពិការ' : 'មិនពិការ' }}
                  </span>
                </td>
                <td>
                  <span>
                    {{ statusText[s.student_class_is_active] || 'មិនស្គាល់' }}
                  </span>
                </td>
                <td>
                    <div v-if="editId !== s.student_class_id">
    <button class="btn btn-sm btn-outline-warning me-2" @click="startEdit(s)">ដូថ្នាក់</button>
  </div>
  <div v-else>
    <select v-model="editClassID" class="form-select form-select-sm">
      <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
    </select>
     <select v-model="editAcademicID" class="form-select form-select-sm">
      <option v-for="ac in academicYears" :key="ac.id" :value="ac.id">{{ ac.year_name }}</option>
    </select>
    <button class="btn btn-sm btn-success me-2" @click="updatestudentclass(s.student_class_id)">រក្សាទុក</button>
    <button class="btn btn-sm btn-secondary" @click="cancelEdit">បោះបង់</button>
  </div>
                </td>

                <td class="text-start fw-semibold">
                  <a href="#" @click.prevent="showStudentDetail(s)">
                    <button class="btn btn-outline-success px-2">មើលលម្អិត</button>
                  </a>
                </td>
                <td>
                  <button class="btn btn-outline-warning px-2" @click="openEditModal(s)">
                     កែប្រែ
                  </button>
                </td>
                <td class="d-flex">
                  <!-- Stop Study -->
                  <button
                    class="btn btn-sm"
                    :class="s.is_active === 1 ? 'btn-outline-danger' : 'btn-outline-success'"
                    @click="toggleStatus(s.student_class_id)"
                  >
                    {{ s.is_active === 1 ? 'ឈប់រៀន' : 'Activate' }}
                  </button>

                  <!-- Suspend Study -->
                  <button
                    class="btn btn-sm ms-2"
                    :class="s.is_active === 1 ? 'btn-outline-danger' : 'btn-outline-success'"
                    @click="Suspendstudies(s.student_class_id)"
                  >
                    {{ s.is_active === 1 ? 'ផ្អាកសិក្សា' : 'Activate' }}
                  </button>

                  <!-- Change School -->
                  <button
                    class="btn btn-sm ms-2"
                    :class="s.is_active === 1 ? 'btn-outline-danger' : 'btn-outline-success'"
                    @click="Changeschool(s.student_class_id)"
                  >
                    {{ s.is_active === 1 ? 'ដូរសាលា' : 'Activate' }}
                  </button>
                  <button
                    class="btn btn-sm ms-2"
                    :class="s.is_active === 1 ? 'btn-outline-success' : 'btn-outline-success'"
                    @click="comebacktostudy(s.student_class_id)"
                  >
                    {{ s.is_active === 1 ? 'ចូលរៀនវិញ' : 'Activate' }}
                  </button>
                </td>
              </tr>
              <tr v-if="!loading && students.length === 0">
                <td colspan="17" class="text-muted py-4">
                  មិនមានសិស្សនៅឡើយទេ 😢
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between align-items-center mt-3 px-3">
  
  <button 
    class="btn btn-outline-primary"
    :disabled="currentPage === 1"
    @click="currentPage--; fetchStudents()"
  >
    ⬅ Previous
  </button>

  <span>
    Page {{ currentPage }} 
    (Total: {{ total }})
  </span>

  <button 
    class="btn btn-outline-primary"
    :disabled="currentPage * limit >= total"
    @click="currentPage++; fetchStudents()"
  >
    Next ➡
  </button>

</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
table {
  border: 1px solid #373636;
  border-collapse: collapse;
}
table th,
table td {
  border: 1px solid #373636;
}
.table-container {
  max-height: 700px;
  overflow-y: auto;
}
.table-container thead th {
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

.table-responsive {
  border-radius: 8px;
}
thead.sticky-top {
  top: 0;
  z-index: 2;
}
</style>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      currentPage: 1,
limit: 10,
total: 0,
      selectedStudent: null,
      students: [],
      searchName: "",
      selectedAcademicYear: "",
      selectedClass: "",
      selectPoor: "",
      selectDisability: "",
      selectsupenstudey: "",
      stopsutdy: "",
      changeschool: "",
      academicYears: [],
      classes: [],
      disabilities: [],
      provinces: [],
      editDistricts: [],
      editCommunes: [],
      editVillages: [],
      editSelectedProvince: "",
      editSelectedDistrict: "",
      editSelectedCommune: "",
      toastMessage: "",
      loading: false,
      editLoading: false,
      editId: null,
      editClassID: null,
      editAcademicID: null,
      editForm: {
        id: null,
        name: "",
        dob: "",
        gender: "",
        is_poor: "",
        is_disability: "",
        disability_ids: [],
        phone: "",
        father_name: "",
        father_occupation: "",
        mother_name: "",
        mother_occupation: "",
        village_id: "",
        class_id: "",
        academic_year_id: "",
      },
      statusText: {
        0: 'ឡើងថ្នាក់',
        1: 'នៅរៀន',
        2: 'ភ្ជួរឈ្មោះ',
        3: 'ដូរសាលា',
        4: 'ឈប់រៀន',
      }
    };
  },
  mounted() {
    this.fetchAcademicYears();
    this.fetchClasses();
    this.fetchStudents();
    this.fetchDisabilities();
    this.fetchProvinces();
  },
  computed: {
    maleCount() {
      return this.students.filter(s => Number(s.Gender) === 1).length;
    },
    femaleCount() {
      return this.students.filter(s => Number(s.Gender) === 2).length;
    }
  },
  methods: {
    getToken() {
      return Cookies.get("token");
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    async fetchAcademicYears() {
      try {
        const res = await axios.get("http://localhost:8080/viewacademicyear", {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.academicYears = res.data;
      } catch (err) {
        console.error(err);
        this.showError("មិនអាចទាញយកឆ្នាំសិក្សាបាន 🥵");
      }
    },
    async fetchClasses() {
      try {
        const res = await axios.get("http://localhost:8080/class", {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.classes = res.data;
      } catch (err) {
        console.error(err);
        this.showError("មិនអាចទាញយកថ្នាក់បាន 🥵");
      }
    },
    async fetchDisabilities() {
      try {
        const res = await axios.get("http://localhost:8080/disabilities", {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.disabilities = res.data.data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchProvinces() {
      try {
        const res = await axios.get("http://localhost:8080/province", {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.provinces = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchDistrictsForEdit() {
      if (!this.editSelectedProvince) {
        this.editDistricts = [];
        this.editSelectedDistrict = "";
        this.editCommunes = [];
        this.editSelectedCommune = "";
        this.editVillages = [];
        return;
      }
      try {
        const res = await axios.get(`http://localhost:8080/district/${this.editSelectedProvince}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.editDistricts = res.data;
        this.editSelectedDistrict = "";
        this.editCommunes = [];
        this.editSelectedCommune = "";
        this.editVillages = [];
      } catch (err) {
        console.error(err);
      }
    },
    async fetchCommunesForEdit() {
      if (!this.editSelectedDistrict) {
        this.editCommunes = [];
        this.editSelectedCommune = "";
        this.editVillages = [];
        return;
      }
      try {
        const res = await axios.get(`http://localhost:8080/communce/${this.editSelectedDistrict}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.editCommunes = res.data;
        this.editSelectedCommune = "";
        this.editVillages = [];
      } catch (err) {
        console.error(err);
      }
    },
    async fetchVillagesForEdit() {
      if (!this.editSelectedCommune) {
        this.editVillages = [];
        return;
      }
      try {
        const res = await axios.get(`http://localhost:8080/village/${this.editSelectedCommune}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.editVillages = res.data;
      } catch (err) {
        console.error(err);
      }
    },
async fetchStudents() {
  try {
    this.loading = true;
    this.students = [];

    const res = await axios.get("http://localhost:8080/viewstudent", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params: {
        page: this.currentPage,   // ✅ ADD
        limit: this.limit,        // ✅ ADD

        name: this.searchName,
        academic_year_id: this.selectedAcademicYear,
        class_id: this.selectedClass,
        is_poor: this.selectPoor,
        is_disability: this.selectDisability,
        SuspendStudy: this.selectsupenstudey,
        stopstudy: this.stopsutdy,
        changeschool: this.changeschool
      },
    });

    this.students = res.data.students;

    // ✅ get pagination from backend
    this.total = res.data.pagination.total;

  } catch (err) {
    console.error(err);
    this.showError("មិនអាចទាញយកសិស្សបាន 🥵");
  } finally {
    this.loading = false;
  }
},

    async comebacktostudy(id) {
      try {
        await axios.put(`http://localhost:8080/comeback/${id}`, {}, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.showSuccess("ស្ថានភាពបានផ្លាស់ប្តូរ ✅");
        this.fetchStudents();
      } catch (err) {
        console.error(err);
        this.showError("មិនអាចផ្លាស់ប្តូរស្ថានភាពបាន 🥵");
      }
    },

    async toggleStatus(id) {
      try {
        await axios.put(`http://localhost:8080/changestatusstudent/${id}`, {}, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.showSuccess("ស្ថានភាពបានផ្លាស់ប្តូរ ✅");
        this.fetchStudents();
      } catch (err) {
        console.error(err);
        this.showError("មិនអាចផ្លាស់ប្តូរស្ថានភាពបាន 🥵");
      }
    },
    async Suspendstudies(id) {
      try {
        await axios.put(`http://localhost:8080/Suspendstudies/${id}`, {}, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.showSuccess("ស្ថានភាពបានផ្លាស់ប្តូរ ✅");
        this.fetchStudents();
      } catch (err) {
        console.error(err);
        this.showError("មិនអាចផ្លាស់ប្តូរស្ថានភាពបាន 🥵");
      }
    },
    async Changeschool(id) {
      try {
        await axios.put(`http://localhost:8080/changeschool/${id}`, {}, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.showSuccess("ស្ថានភាពបានផ្លាស់ប្តូរ ✅");
        this.fetchStudents();
      } catch (err) {
        console.error(err);
        this.showError("មិនអាចផ្លាស់ប្តូរស្ថានភាពបាន 🥵");
      }
    },
    startEdit(s) {
      this.editId = s.student_class_id;
      this.editClassID = s.class_id;
      this.editAcademicID = s.academic_year_id;
    },
    cancelEdit() {
      this.editId = null;
      this.editClassID = null;
      this.editAcademicID = null;
    },
    async updatestudentclass(studentclassid) {
      try {
        await axios.put(
          `http://localhost:8080/updatestudentclass/${studentclassid}`,
          { class_id: this.editClassID,academic_year_id: this.editAcademicID },
          { headers: { Authorization: `Bearer ${this.getToken()}` } }
        );
        this.showSuccess("បានកែប្រែថ្នាក់សិស្សជោគជ័យ ✅");
        this.fetchStudents();
        this.cancelEdit();
      } catch (e) {
        console.error(e);
        this.showError("កែប្រែថ្នាក់សិស្សបរាជ័យ 🥵");
      }
    },
    showStudentDetail(student) {
      this.selectedStudent = student;
      const modalEl = new bootstrap.Modal(document.getElementById('studentDetailModal'));
      modalEl.show();
    },
openEditModal(student) {
  // Populate edit form with student data
  this.editForm = {
    id: student.id,
    name: student.name || "",
    dob: student.dob || "",
    gender: Number(student.Gender) || "",
    is_poor: student.is_poor !== undefined ? Number(student.is_poor) : "",
    is_disability: student.is_disability !== undefined ? Number(student.is_disability) : "",
    disability_ids: student.disabilities ? student.disabilities.map(d => d.id) : [],
    phone: student.phone || "",
    father_name: student.father_name || "",
    father_occupation: student.father_occupation || "",
    mother_name: student.mother_name || "",
    mother_occupation: student.mother_occupation || "",
    village_id: student.village_id || "",
    class_id: student.class_id || "",
    academic_year_id: student.academic_year_id || "",
  };

  // Set address selections based on student's current address
  this.editSelectedProvince = student.province_id || "";
  this.editSelectedDistrict = student.district_id || "";
  this.editSelectedCommune = student.commune_id || "";

  // Fetch dependent data
  if (this.editSelectedProvince) {
    this.fetchDistrictsForEdit().then(() => {
      if (this.editSelectedDistrict) {
        this.fetchCommunesForEdit().then(() => {
          if (this.editSelectedCommune) {
            this.fetchVillagesForEdit();
          }
        });
      }
    });
  }

  const modalEl = new bootstrap.Modal(document.getElementById('editStudentModal'));
  modalEl.show();
},
// Add this method to your existing component (replace the previous updateStudent method)
async updateStudent() {
  this.editLoading = true;
  try {
    // Map frontend field names to backend expected field names
    const payload = {
      id: this.editForm.id,  // Important: Include ID for update
      name: this.editForm.name,
      dob: this.editForm.dob,
      gender: this.editForm.gender,
      is_poor: this.editForm.is_poor,
      is_disability: this.editForm.is_disability,  // Note: backend uses "isdisability" not "is_disability"
      disability_id: this.editForm.disability_ids || [],  // Backend expects "disability_ids"
      phone: this.editForm.phone,
      mother_name: this.editForm.mother_name,  // Backend uses "mother_name"
      father_name: this.editForm.father_name,  // Backend uses "father_name"
      mother_occupation: this.editForm.mother_occupation,  // Backend typo: "mothe_occupation"
      father_occupation: this.editForm.father_occupation,  // Backend typo: "fother_occupation"
      village_id: this.editForm.village_id,
      class_id: this.editForm.class_id,
      academic_year_id: this.editForm.academic_year_id,
    };

    // Use the same endpoint for both create and update
    await axios.post(
      "http://localhost:8080/student",  // Same endpoint as create
      payload,
      { headers: { Authorization: `Bearer ${this.getToken()}` } }
    );

    this.showSuccess("បានកែប្រែព័ត៌មានសិស្សជោគជ័យ ✅");
    
    // Close modal
    const modalEl = bootstrap.Modal.getInstance(document.getElementById('editStudentModal'));
    if (modalEl) modalEl.hide();
    
    // Refresh student list
    this.fetchStudents();
  } catch (err) {
    console.error(err);
    const errorMsg = err.response?.data?.error || "កែប្រែព័ត៌មានសិស្សបរាជ័យ 🥵";
    this.showError(errorMsg);
  } finally {
    this.editLoading = false;
  }},

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