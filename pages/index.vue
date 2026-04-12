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


    <!-- Student Detail Modal -->
<!-- Student Detail Modal -->
<div
  class="modal fade"
  id="studentDetailModal"
  tabindex="-1"
  aria-labelledby="studentDetailModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content border-0 shadow-sm rounded-4">
      <div class="modal-header bg-primary text-white rounded-top-4">
        <h5 class="modal-title" id="studentDetailModalLabel">
          📝 សេចក្ដីលម្អិតសិស្ស
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
        @input="fetchStudents"
        type="text"
        class="form-control  flat-input "
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
        @change="fetchStudents"
        class="form-select border-1 "
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
    @change="fetchStudents"
    class="form-select border-1"
    style="box-shadow: none !important;"
  >
    <option value="">ថ្នាក់</option>
    <option v-for="cls in classes" :key="cls.id" :value="cls.id">
      {{ cls.name }}
    </option>
  </select>

  <!-- Clear button -->
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
        @change="fetchStudents"
        class="form-select border-1"
        style="box-shadow: none !important;"
      >
        <option value="">ស្ថានភាព</option>
        <option :value="1">ក្រីក្រ</option>
        <option :value="0">មិនក្រីក្រ</option>
      </select>
      <button v-if="selectPoor" 
      class="btn btn-outline-danger btn-sm" 
      type="button" 
      @click="selectPoor = '';
      fetchStudents()"> ✕

      </button>
    </div>

    <!-- Disability -->
    <div class="input-group" style="max-width: 150px;">
    
      <select
        v-model="selectDisability"
        @change="fetchStudents"
        class="form-select border-1"
        style="box-shadow: none !important;"
      >
        <option value="">ពិការ</option>
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
        @change="fetchStudents"
        class="form-select border-1"
        style="box-shadow: none !important;"
      >
        <option value="">មិនផ្អាកការសិក្សា</option>
        <option :value="2">ផ្អាក</option>
       
      
      </select>
            <button 
    v-if="selectDisability" 
    class="btn btn-sm px-2" 
    type="button" 
    @click="selectDisability = ''; fetchStudents()"
  >
    ✕
  </button>
    </div>
      <div class="input-group" style="max-width: 130px;">
    
      <select
        v-model="stopsutdy"
        @change="fetchStudents"
        class="form-select border-1"
        style="box-shadow: none !important;"
      >
        <option value="">នៅរៀន</option>
        <option :value="4">ឈប់រៀន</option>
       
      
      </select>
            <button 
    v-if="selectDisability" 
    class="btn btn-sm px-2" 
    type="button" 
    @click="selectDisability = ''; fetchStudents()"
  >
    ✕
  </button>
    </div>
       <div class="input-group" style="max-width: 130px;">
    
      <select
        v-model="changeschool"
        @change="fetchStudents"
        class="form-select border-1"
        style="box-shadow: none !important;"
      >
        <option value="">មិនប្តូរសាលា</option>
        <option :value="4">ប្តូរ</option>
       
      
      </select>
            <button 
    v-if="selectDisability" 
    class="btn btn-sm px-2" 
    type="button" 
    @click="selectDisability = ''; fetchStudents()"
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
        stopsutdy= '';
        changeschool= '';
        fetchStudents();
      "
    >
      ♻️ កំណត់ឡើងវិញ
    </button>
  

    

    <!-- Gender Count -->
    <div class="ms-2">
      <span class="badge bg-primary  px-4 py-2 me-2">
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
              <th>#</th>
           
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
              <th>ដូថ្នាក់</th>
              <th>លម្អិត</th>
              <th>សកម្ម</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-if="loading">
              <td colspan="14" class="text-muted py-4">
                កំពុងទាញយកទិន្នន័យ... ⏳
              </td>
            </tr>
            <tr v-else v-for="(s, index) in students" :key="s.id">
              <td>{{ index + 1 }}</td>
             
              <td class="text-start fw-semibold">{{ s.name }}</td>
              <td class="text-start fw-semibold">{{ s.academic_name }}</td>
              <td>{{ formatDate(s.dob) }}</td>
<td>
  <span

  >
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
  <span

  >
    {{ Number(s.is_poor) === 1 ? 'ក្រីក្រ' : Number(s.is_poor) === 0 ? 'មិនក្រីក្រ' : 'មិនបញ្ជាក់' }}
  </span>
</td>

              <td>
                <span

                >
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
    <button class="btn btn-sm btn-outline-warning me-2" @click="startEdit(s)">កែប្រែ</button>
  </div>
  <div v-else>
    <select v-model="editClassID" class="form-select form-select-sm">
      <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
    </select>
    <button class="btn btn-sm btn-success me-2" @click="updatestudentclass(s.student_class_id)">រក្សាទុក</button>
    <button class="btn btn-sm btn-secondary" @click="cancelEdit">បោះបង់</button>
  </div>
</td>
<td class="text-start fw-semibold">
  <a href="#" @click.prevent="showStudentDetail(s) ">
    <button class="btn btn-outline-success px-2">មេីលលម្អិត</button>
  </a>
</td>

<td class="d-flex">
  <!-- Stop Study -->
  <button
    class="btn btn-sm"
    :class="s.is_active === 1 ? 'btn-outline-danger' : 'btn-outline-success'"
    @click="toggleStatus(s.id)"
  >
    {{ s.is_active === 1 ? 'ឈប់រៀន' : 'Activate' }}
  </button>

  <!-- Suspend Study -->
  <button
    class="btn btn-sm ms-2"
    :class="s.is_active === 1 ? 'btn-outline-danger' : 'btn-outline-success'"
    @click="Suspendstudies(s.id)"
  >
    {{ s.is_active === 1 ? 'ផ្អាកសិក្សា' : 'Activate' }}
  </button>

  <!-- Change School -->
  <button
    class="btn btn-sm ms-2"
    :class="s.is_active === 1 ? 'btn-outline-danger' : 'btn-outline-success'"
    @click="Changeschool(s.id)"
  >
    {{ s.is_active === 1 ? 'ដូរសាលា' : 'Activate' }}
  </button>
</td>

            </tr>
            <tr v-if="!loading && students.length === 0">
              <td colspan="14" class="text-muted py-4">
                មិនមានសិស្សនៅឡើយទេ 😢
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

</div>

  </div>

</div>
</template>

<style scoped>

table {
  border: 1px solid #373636; /* border around table */
  border-collapse: collapse;
}
table th,
table td {
  border: 1px solid #373636; /* border for each cell */
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
      selectedStudent: null,
      students: [],
      searchName: "",
      selectedAcademicYear: "",
      selectedClass: "",
      selectPoor:"",
      selectDisability:"",
      selectsupenstudey:"",
      stopsutdy :"",
      changeschool :"",
      academicYears: [],
      classes: [],
      toastMessage: "",
      loading: false, 
      editId: null,
      editClassID: null,
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
  },
  computed: {
   maleCount() {
    return this.students.filter(s => Number(s.Gender) === 1).length;
  },
  femaleCount() {
    return this.students.filter(s => Number(s.Gender) === 2).length;
  }
  },
    setup() {
    const { exportElementToPDF } = usePdf();
    return { exportElementToPDF };
  },

  methods: {
    
      showStudentDetail(student) {
    this.selectedStudent = student;
    const modalEl = new bootstrap.Modal(document.getElementById('studentDetailModal'));
    modalEl.show();
  },
    getToken() {
      return Cookies.get("token");
    },
      startEdit(s) {
      this.editId = s.student_class_id;
      this.editClassID = s.class_id; // preload current class
    },
    cancelEdit() {
      this.editId = null;
      this.editClassID = null;
    },
    async updatestudentclass(studentclassid) {
      try {
        await axios.put(
          `http://localhost:8080/updatestudentclass/${studentclassid}`,
          { class_id: this.editClassID },
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
async fetchStudents() {
  try {
    this.loading = true;
    this.students = [];   // 👈 clear old list immediately

    const res = await axios.get("http://localhost:8080/viewstudent", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params: {
        name: this.searchName,
        academic_year_id: this.selectedAcademicYear,
        class_id: this.selectedClass,
        is_poor: this.selectPoor ,
        is_disability: this.selectDisability,
        SuspendStudy: this.selectsupenstudey,
        stopstudy: this.stopsutdy,
        changeschool: this.changeschool
      },
    });

    this.students = res.data.students;
  } catch (err) {
    console.error(err);
    this.showError("មិនអាចទាញយកសិស្សបាន 🥵");
  } finally {
    this.loading = false;
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
    async Suspendstudies(id){
      try{
          await axios.put(`http://localhost:8080/Suspendstudies/${id}`,{},{
            headers: { Authorization: `Bearer ${this.getToken()}` },
          });
          this.showSuccess("ស្ថានភាពបានផ្លាស់ប្តូរ ✅");
        this.fetchStudents();
      }catch(e){
console.error(err);
        this.showError("មិនអាចផ្លាស់ប្តូរស្ថានភាពបាន 🥵");
      }
    },
        async Changeschool(id){
      try{
          await axios.put(`http://localhost:8080/changeschool/${id}`,{},{
            headers: { Authorization: `Bearer ${this.getToken()}` },
          });
          this.showSuccess("ស្ថានភាពបានផ្លាស់ប្តូរ ✅");
        this.fetchStudents();
      }catch(e){
console.error(err);
        this.showError("មិនអាចផ្លាស់ប្តូរស្ថានភាពបាន 🥵");
      }
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


